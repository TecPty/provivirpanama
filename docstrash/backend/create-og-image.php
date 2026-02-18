<?php
/**
 * Script to generate OG Image for Provivir Panama
 * Creates a 1200x630px image for social media sharing
 * 
 * Usage: php create-og-image.php
 */

// Configuration
$width = 1200;
$height = 630;
$output_path = __DIR__ . '/frontend/assets/images/og-image.jpg';

// Colors (RGB)
$bg_color = imagecolorallocate($img = imagecreatetruecolor($width, $height), 0, 119, 194); // #0077C2
$accent_color = imagecolorallocate($img, 0, 91, 150); // Darker blue
$text_color = imagecolorallocate($img, 255, 255, 255); // White
$secondary_color = imagecolorallocate($img, 220, 220, 220); // Light gray
$orange_accent = imagecolorallocate($img, 255, 107, 53); // Orange

// Fill background
imagefill($img, 0, 0, $bg_color);

// Draw decorative rectangle at top
imagefilledrectangle($img, 0, 0, $width, 150, $accent_color);

// Draw decorative line
imageline($img, 0, 150, $width, 150, $text_color, 3);

// Use built-in fonts (GD library comes with fonts)
$large_font = 5;  // GD built-in font (largest)
$medium_font = 4;
$small_font = 3;

// Draw main text
imagestring($img, $large_font, 250, 180, "Tu Nuevo Hogar esta", $text_color);
imagestring($img, $large_font, 300, 280, "Mas Cerca", $orange_accent);

// Draw subtitle
imagestring($img, $medium_font, 150, 400, "Soluciones de vivienda asequible con subsidios", $secondary_color);

// Draw footer
imagestring($img, $small_font, 400, 550, "www.provivirpanama.com", $secondary_color);

// Create directory if it doesn't exist
@mkdir(dirname($output_path), 0755, true);

// Save image
imagejpeg($img, $output_path, 85);
imagedestroy($img);

// Get file info
$file_size = filesize($output_path) / 1024;

echo "✅ OG Image created successfully:\n";
echo "   Location: $output_path\n";
echo "   Dimensions: {$width}x{$height}px\n";
echo "   File size: " . round($file_size, 1) . " KB\n";
echo "   Quality: Good for social sharing\n";
echo "\n";
echo "✅ Image is ready to use!\n";
echo "   - Facebook\n";
echo "   - Twitter/X\n";
echo "   - WhatsApp\n";
echo "   - LinkedIn\n";
echo "\n";
echo "Next: Update og:image meta tag in index.html if needed.\n";
?>
