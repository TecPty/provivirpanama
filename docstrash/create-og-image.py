#!/usr/bin/env python3
"""
Script para generar OG Image para Provivir Panama
Crea una imagen 1200x630px con branding de Provivir
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_og_image():
    """Generar OG image para redes sociales"""
    
    # Configuración 
    width = 1200
    height = 630
    bg_color = (0, 119, 194)  # #0077C2 - Azul Provivir
    accent_color = (0, 91, 150)  # Azul más oscuro
    text_color = (255, 255, 255)  # Blanco
    secondary_text = (220, 220, 220)  # Gris claro
    
    # Crear imagen
    img = Image.new('RGB', (width, height), color=bg_color)
    draw = ImageDraw.Draw(img)
    
    # Intentar usar fuentes del sistema, si falla usar default
    try:
        title_font = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", 72)
        subtitle_font = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", 32)
        footer_font = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", 24)
    except:
        # Si no encuentra las fuentes, usa default
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        footer_font = ImageFont.load_default()
    
    # Dibujar rectángulo decorativo superior
    draw.rectangle([(0, 0), (width, 150)], fill=accent_color)
    
    # Dibujar línea decorativa
    draw.line([(0, 150), (width, 150)], fill=text_color, width=3)
    
    # Agregar texto principal
    main_text = "Tu Nuevo Hogar está"
    main_text2 = "Más Cerca"
    
    # Calcular posiciones para centrar
    bbox1 = draw.textbbox((0, 0), main_text, font=title_font)
    text_width1 = bbox1[2] - bbox1[0]
    x1 = (width - text_width1) // 2
    
    bbox2 = draw.textbbox((0, 0), main_text2, font=title_font)
    text_width2 = bbox2[2] - bbox2[0]
    x2 = (width - text_width2) // 2
    
    # Dibujar título
    draw.text((x1, 170), main_text, fill=text_color, font=title_font)
    draw.text((x2, 270), main_text2, fill=(255, 107, 53), font=title_font)  # Naranja accent
    
    # Agregar subtítulo
    subtitle = "Soluciones de vivienda asequible con subsidios"
    bbox_sub = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    text_width_sub = bbox_sub[2] - bbox_sub[0]
    x_sub = (width - text_width_sub) // 2
    draw.text((x_sub, 400), subtitle, fill=secondary_text, font=subtitle_font)
    
    # Agregar URL en pie de página
    footer_text = "www.provivirpanama.com"
    bbox_footer = draw.textbbox((0, 0), footer_text, font=footer_font)
    text_width_footer = bbox_footer[2] - bbox_footer[0]
    x_footer = (width - text_width_footer) // 2
    draw.text((x_footer, 530), footer_text, fill=secondary_text, font=footer_font)
    
    # Guardar imagen
    output_path = "c:\\Users\\HP 15\\provivir\\frontend\\assets\\images\\og-image.jpg"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, quality=85, optimize=True)
    
    print(f"✅ OG Image creada exitosamente:")
    print(f"   Ubicación: {output_path}")
    print(f"   Dimensiones: {width}x{height}px")
    print(f"   Tamaño: {os.path.getsize(output_path) / 1024:.1f} KB")

if __name__ == "__main__":
    create_og_image()
