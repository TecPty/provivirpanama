#!/usr/bin/env python3
"""
Convertir todas las imágenes AVIF a WebP
"""

from PIL import Image
import os
from pathlib import Path

# Directorio de propiedades
properties_dir = Path("frontend/assets/images/properties")

# Contar conversiones
converted = 0
failed = 0

# Buscar todos los archivos AVIF
for avif_file in properties_dir.rglob("*.avif"):
    try:
        # Abrir imagen AVIF
        img = Image.open(avif_file)
        
        # Crear ruta del archivo WebP
        webp_file = avif_file.with_suffix(".webp")
        
        # Convertir y guardar como WebP con calidad optimizada
        img.save(webp_file, "WEBP", quality=85, method=6)
        
        print(f"✓ Convertido: {avif_file.name} → {webp_file.name}")
        converted += 1
        
    except Exception as e:
        print(f"✗ Error convirtiendo {avif_file}: {e}")
        failed += 1

print(f"\nResumen:")
print(f"Convertidas: {converted}")
print(f"Errores: {failed}")
