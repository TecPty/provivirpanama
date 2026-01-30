@echo off
REM Daily System Check - Provivir Panama

echo.
echo ===============================================
echo  DAILY SYSTEM CHECK - Provivir Panama
echo  28 Enero 2026
echo ===============================================
echo.

echo Checking Local Services...
tasklist | findstr /I "httpd" >nul
if %ERRORLEVEL% equ 0 (
    echo [OK] Apache is running
) else (
    echo [ERROR] Apache is NOT running
)

tasklist | findstr /I "mysqld" >nul
if %ERRORLEVEL% equ 0 (
    echo [OK] MySQL is running
) else (
    echo [ERROR] MySQL is NOT running
)

echo.
echo Checking Endpoints...
powershell -Command "try { $r = Invoke-WebRequest 'http://localhost/provivirpanama/' -UseBasicParsing -TimeoutSec 5; Write-Host '[OK] Landing page (200)' } catch { Write-Host '[ERROR] Landing page failed' }"

powershell -Command "try { $r = Invoke-WebRequest 'http://localhost/provivirpanama/cms/login.php' -UseBasicParsing -TimeoutSec 5; Write-Host '[OK] CMS Login (200)' } catch { Write-Host '[ERROR] CMS Login failed' }"

powershell -Command "try { $r = Invoke-WebRequest 'http://localhost/provivirpanama/api/social-posts' -UseBasicParsing -TimeoutSec 5; Write-Host '[OK] API Social Posts (200)' } catch { Write-Host '[ERROR] API Social Posts failed' }"

echo.
echo Quick Access:
echo   - CMS:   http://localhost/provivirpanama/cms/login.php
echo   - Site:  http://localhost/provivirpanama/
echo   - API:   http://localhost/provivirpanama/api/social-posts
echo.
echo ===============================================
echo.
pause
