#!/usr/bin/env pwsh
# Daily System Check - Provivir Panama
# Verifica que todos los sistemas estén operacionales

Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  DAILY SYSTEM CHECK - Provivir Panama (28 Enero 2026)" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Colors
$successColor = "Green"
$errorColor = "Red"
$warningColor = "Yellow"
$infoColor = "Cyan"

# Counter
$passed = 0
$failed = 0

# Test function
function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Url,
        [string]$Type = "GET"
    )
    
    try {
        $response = Invoke-WebRequest -Uri $Url -Method $Type -UseBasicParsing -TimeoutSec 5
        if ($response.StatusCode -eq 200) {
            Write-Host "  ✅ $Name" -ForegroundColor $successColor
            $script:passed++
            return $true
        } else {
            Write-Host "  ❌ $Name (Status: $($response.StatusCode))" -ForegroundColor $errorColor
            $script:failed++
            return $false
        }
    } catch {
        Write-Host "  ❌ $Name (Error: $($_.Exception.Message))" -ForegroundColor $errorColor
        $script:failed++
        return $false
    }
}

# 1. Services Check
Write-Host "📡 SERVICIOS LOCALES" -ForegroundColor $infoColor
$apache = Get-Process httpd -ErrorAction SilentlyContinue
$mysql = Get-Process mysqld -ErrorAction SilentlyContinue

if ($apache) {
    Write-Host "  ✅ Apache: Corriendo (PID: $($apache.Id))" -ForegroundColor $successColor
    $passed++
} else {
    Write-Host "  ❌ Apache: NO está corriendo" -ForegroundColor $errorColor
    $failed++
}

if ($mysql) {
    Write-Host "  ✅ MySQL: Corriendo (PID: $($mysql.Id))" -ForegroundColor $successColor
    $passed++
} else {
    Write-Host "  ❌ MySQL: NO está corriendo" -ForegroundColor $errorColor
    $failed++
}

Write-Host ""

# 2. Local Endpoints
Write-Host "🌐 ENDPOINTS LOCALES" -ForegroundColor $infoColor
Test-Endpoint "Landing Page" "http://localhost/provivirpanama/"
Test-Endpoint "CMS Login" "http://localhost/provivirpanama/cms/login.php"
Test-Endpoint "Social Posts API" "http://localhost/provivirpanama/api/social-posts"
Write-Host ""

# 3. Database Check
Write-Host "💾 BASE DE DATOS" -ForegroundColor $infoColor
try {
    $connectionString = "Server=localhost;User Id=root;Password=;"
    $connection = New-Object MySql.Data.MySqlClient.MySqlConnection($connectionString)
    $connection.Open()
    
    $command = $connection.CreateCommand()
    $command.CommandText = "SELECT COUNT(*) as count FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = 'provivir_db'"
    $reader = $command.ExecuteReader()
    $reader.Read() | Out-Null
    $dbExists = $reader.GetInt32(0)
    $reader.Close()
    
    if ($dbExists -gt 0) {
        Write-Host "  ✅ Base de datos 'provivir_db': Existe" -ForegroundColor $successColor
        
        # Check tables
        $command = $connection.CreateCommand()
        $command.CommandText = "SELECT COUNT(*) as count FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'provivir_db'"
        $reader = $command.ExecuteReader()
        $reader.Read() | Out-Null
        $tableCount = $reader.GetInt32(0)
        $reader.Close()
        
        Write-Host "  ✅ Tablas en BD: $tableCount" -ForegroundColor $successColor
        $passed += 2
    } else {
        Write-Host "  ❌ Base de datos 'provivir_db': NO existe" -ForegroundColor $errorColor
        $failed++
    }
    
    $connection.Close()
} catch {
    Write-Host "  ⚠️  No se pudo conectar a MySQL: $($_.Exception.Message)" -ForegroundColor $warningColor
    Write-Host "     (Instalación de driver MySQL puede ser necesaria)" -ForegroundColor $warningColor
}

Write-Host ""

# 4. File Structure
Write-Host "📁 ESTRUCTURA DE ARCHIVOS" -ForegroundColor $infoColor
$files = @(
    @{ Path = "C:\xampp\htdocs\provivirpanama\cms\login.php"; Name = "CMS Login" },
    @{ Path = "C:\xampp\htdocs\provivirpanama\cms\dashboard.php"; Name = "CMS Dashboard" },
    @{ Path = "C:\xampp\htdocs\provivirpanama\frontend\index.html"; Name = "Frontend Index" },
    @{ Path = "C:\xampp\htdocs\provivirpanama\api-router.php"; Name = "API Router" }
)

foreach ($file in $files) {
    if (Test-Path $file.Path) {
        Write-Host "  ✅ $($file.Name)" -ForegroundColor $successColor
        $passed++
    } else {
        Write-Host "  ❌ $($file.Name): NO ENCONTRADO" -ForegroundColor $errorColor
        $failed++
    }
}

Write-Host ""

# 5. Git Status
Write-Host "📦 GIT REPOSITORY" -ForegroundColor $infoColor
try {
    $gitStatus = & git -C "C:\xampp\htdocs\provivirpanama" status --short 2>$null
    if ($LASTEXITCODE -eq 0) {
        $commitCount = & git -C "C:\xampp\htdocs\provivirpanama" rev-list --count HEAD 2>$null
        Write-Host "  ✅ Git: Inicializado" -ForegroundColor $successColor
        Write-Host "  ✅ Commits totales: $commitCount" -ForegroundColor $successColor
        if ([string]::IsNullOrWhiteSpace($gitStatus)) {
            Write-Host "  ✅ Working tree: Limpio" -ForegroundColor $successColor
        } else {
            Write-Host "  ⚠️  Working tree: Tiene cambios" -ForegroundColor $warningColor
        }
        $passed += 2
    }
} catch {
    Write-Host "  ⚠️  Git check skipped" -ForegroundColor $warningColor
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  RESUMEN: ✅ $passed Checks Pasados | ❌ $failed Checks Fallidos" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

if ($failed -eq 0) {
    Write-Host "  🎉 TODOS LOS SISTEMAS OPERACIONALES" -ForegroundColor $successColor
} else {
    Write-Host "  ⚠️  REVISAR ERRORES ARRIBA" -ForegroundColor $warningColor
}

Write-Host ""
Write-Host "📋 ACCESO RÁPIDO:" -ForegroundColor $infoColor
Write-Host "  • CMS:     http://localhost/provivirpanama/cms/login.php" -ForegroundColor Cyan
Write-Host "  • Sitio:   http://localhost/provivirpanama/" -ForegroundColor Cyan
Write-Host "  • API:     http://localhost/provivirpanama/api/social-posts" -ForegroundColor Cyan
Write-Host ""
