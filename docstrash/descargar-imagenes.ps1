# Script para descargar imágenes de Provivir Panama

$downloads = @(
    # ALTOS DE LOS GUAYACANES - Modelo Lirio
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/09/image-9-compressed-jpg.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\altos-guayacanes\lirio-sala.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/09/image-6-compressed-980x693.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\altos-guayacanes\lirio-cocina.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/09/image-4-compressed-980x693.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\altos-guayacanes\lirio-hab-principal.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/09/image-8-compressed-980x693.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\altos-guayacanes\lirio-hab-2.avif'
    },
    
    # ALTOS DE LOS GUAYACANES - Modelo Jazmín
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Sala-Comedor-Modelo-Jazmin-2-jpg.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\altos-guayacanes\jazmin-sala.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Habitacion-Principal-modelo-Jazmin-1-jpg.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\altos-guayacanes\jazmin-hab-principal.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Cocina-Modelo-Jazmin-1-jpg.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\altos-guayacanes\jazmin-cocina.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Habitacion-2-Modelo-Jazmin-1-jpg.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\altos-guayacanes\jazmin-hab-2.avif'
    },

    # VILLAS DEL ESTE - Modelo Roble
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Sala-Modelo-roble-compressed-scaled.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\villas-este\roble-sala.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Cocina-Modelo-Roble-980x735.png'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\villas-este\roble-cocina.png'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Habitacion-Principal-Modelo-Roble-980x735.png'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\villas-este\roble-hab-principal.png'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Habitacion-2-Modelo-Roble-980x735.png'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\villas-este\roble-hab-2.png'
    },

    # VILLAS DEL ESTE - Modelo Cerezo
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Sala-Modelo-Cerezo-980x735.png'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\villas-este\cerezo-sala.png'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Cocina-Modelo-Cerezo-980x735.png'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\villas-este\cerezo-cocina.png'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Habitacion-Principal-Modelo-Cerezo-compressed-scaled.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\villas-este\cerezo-hab-principal.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Habitacion-2-Modelo-Cerezo-980x735.png'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\villas-este\cerezo-hab-2.png'
    },

    # CIUDAD DEL ESTE - Modelo Córdoba
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Comedor-Real-Modelo-Cordoba-scaled.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\ciudad-este\cordoba-comedor.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Bano-Real-Modelo-Cordoba-scaled.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\ciudad-este\cordoba-baño.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Cocina-Real-Modelo-Cordoba-scaled.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\ciudad-este\cordoba-cocina.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Sala-Real-Modelo-Cordoba-scaled.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\ciudad-este\cordoba-sala.avif'
    },

    # CIUDAD DEL ESTE - Modelo Granada
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Comedor-Galeria-Granada-jpg.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\ciudad-este\granada-comedor.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Habitacion-Principal-Galeria-Granada-jpg.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\ciudad-este\granada-hab-principal.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Sala-Galeria-Granada-jpg.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\ciudad-este\granada-sala.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/08/Habitacion-2-Galeria-Granada-jpg.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\ciudad-este\granada-hab-2.avif'
    },

    # COLINAS DEL ESTE - Modelo Andalucía
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/09/Sala-Andalucia-jpg.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\colinas-este\andalucia-sala.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/09/Habitacion-2-Andalucia-980x693.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\colinas-este\andalucia-hab-2.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2024/09/Habitacion-principal-Andalucia-jpg.avif'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\colinas-este\andalucia-hab-principal.avif'
    },
    @{
        url = 'https://provivirpanama.com/wp-content/uploads/2022/10/10_SANITARIO-ANDALUCIA-min-980x581.png'
        file = 'c:\Users\HP 15\provivir\frontend\assets\images\properties\colinas-este\andalucia-baño.png'
    }
)

# Headers para evitar bloqueos
$headers = @{
    'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

$successCount = 0
$errorCount = 0

foreach($download in $downloads) {
    try {
        Write-Host "Descargando: $($download.file.Split('\')[-1])..."
        Invoke-WebRequest -Uri $download.url -OutFile $download.file -Headers $headers -UseBasicParsing -TimeoutSec 30
        Write-Host "✅ Exitoso"
        $successCount++
    } catch {
        Write-Host "❌ Error: $($_.Exception.Message)"
        $errorCount++
    }
}

Write-Host "`n=== RESUMEN ==="
Write-Host "✅ Descargadas: $successCount"
Write-Host "❌ Errores: $errorCount"
