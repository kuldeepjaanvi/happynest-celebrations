#!/usr/bin/env python3
"""
Create placeholder images for HappyNest Celebrations products
"""
from PIL import Image, ImageDraw, ImageFont
import os

# Create assets directory if it doesn't exist
os.makedirs('assets', exist_ok=True)

# Image dimensions
WIDTH = 800
HEIGHT = 600

# Color schemes for different categories
CAKE_COLORS = [
    ('#8B4513', '#FFD700', 'Plum Cake'),  # Brown, Gold
    ('#3C2413', '#D2691E', 'Chocolate'),  # Dark Brown, Chocolate
    ('#DC143C', '#FFB6C1', 'Red Velvet'),  # Crimson, Pink
    ('#FFF8DC', '#FFE4B5', 'Vanilla'),    # Beige, Moccasin
    ('#2F1B14', '#8B0000', 'Black Forest'), # Dark, Dark Red
    ('#D2691E', '#FFA500', 'Fruit Cake'),  # Chocolate, Orange
]

DECOR_COLORS = [
    ('#FF69B4', '#FFB6C1', 'Birthday'),   # Hot Pink, Pink
    ('#FF1493', '#FFB6C1', 'Anniversary'), # Deep Pink, Pink
    ('#87CEEB', '#FFB6C1', 'Baby Shower'), # Sky Blue, Pink
    ('#FFD700', '#FFE4B5', 'Wedding'),    # Gold, Moccasin
    ('#4169E1', '#87CEEB', 'Graduation'), # Royal Blue, Sky Blue
    ('#FF6347', '#FFD700', 'Festival'),   # Tomato, Gold
]

GIFT_COLORS = [
    ('#FF69B4', '#FFB6C1', 'Flowers'),    # Hot Pink, Pink
    ('#8B4513', '#FFD700', 'Chocolate'),  # Brown, Gold
    ('#FF6347', '#FFD700', 'Hamper'),     # Tomato, Gold
    ('#FFB6C1', '#FF69B4', 'Teddy'),      # Pink, Hot Pink
    ('#C0C0C0', '#FFFFFF', 'Frame'),      # Silver, White
    ('#FFA500', '#FFD700', 'Candles'),    # Orange, Gold
]

def create_placeholder_image(filename, bg_color, accent_color, text, category):
    """Create a placeholder image with text"""
    # Create image
    img = Image.new('RGB', (WIDTH, HEIGHT), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a nice font, fallback to default
    try:
        # Try to use system font
        font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
    except:
        try:
            font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
            font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
        except:
            font_large = ImageFont.load_default()
            font_small = ImageFont.load_default()
    
    # Draw decorative shapes
    if category == 'cake':
        # Draw cake shape
        draw.ellipse([200, 200, 600, 500], fill=accent_color, outline='#000', width=3)
        draw.rectangle([250, 300, 550, 450], fill=bg_color, outline='#000', width=2)
    elif category == 'decor':
        # Draw balloons
        for i in range(3):
            x = 200 + i * 200
            draw.ellipse([x-30, 200, x+30, 300], fill=accent_color, outline='#000', width=2)
            draw.line([x, 300, x, 400], fill='#000', width=2)
    elif category == 'gift':
        # Draw gift box
        draw.rectangle([250, 200, 550, 400], fill=accent_color, outline='#000', width=3)
        draw.line([400, 200, 400, 400], fill='#000', width=2)
        draw.line([250, 300, 550, 300], fill='#000', width=2)
    
    # Draw text
    text_bbox = draw.textbbox((0, 0), text, font=font_large)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    text_x = (WIDTH - text_width) // 2
    text_y = HEIGHT - 100
    
    # Draw text with shadow
    draw.text((text_x + 2, text_y + 2), text, fill='#000000', font=font_large)
    draw.text((text_x, text_y), text, fill='#FFFFFF', font=font_large)
    
    # Draw category label
    category_text = f"{category.upper()}"
    cat_bbox = draw.textbbox((0, 0), category_text, font=font_small)
    cat_width = cat_bbox[2] - cat_bbox[0]
    cat_x = (WIDTH - cat_width) // 2
    draw.text((cat_x, 50), category_text, fill='#FFFFFF', font=font_small)
    
    # Save image
    img.save(f'assets/{filename}', 'JPEG', quality=85)
    print(f"Created: assets/{filename}")

# Create cake images
cake_files = [
    'plum_cake.jpg', 'chocolate_truffle.jpg', 'red_velvet.jpg',
    'vanilla_sponge.jpg', 'black_forest.jpg', 'fruit_cake.jpg'
]
for i, (filename, colors) in enumerate(zip(cake_files, CAKE_COLORS)):
    create_placeholder_image(filename, colors[0], colors[1], colors[2], 'cake')

# Create decoration images
decor_files = [
    'birthday_decor.jpg', 'anniversary_decor.jpg', 'baby_shower.jpg',
    'wedding_decor.jpg', 'graduation_decor.jpg', 'festival_decor.jpg'
]
for i, (filename, colors) in enumerate(zip(decor_files, DECOR_COLORS)):
    create_placeholder_image(filename, colors[0], colors[1], colors[2], 'decor')

# Create gift images
gift_files = [
    'flower_bouquet.jpg', 'chocolate_box.jpg', 'gift_hamper.jpg',
    'teddy_balloons.jpg', 'photo_frame.jpg', 'candle_set.jpg'
]
for i, (filename, colors) in enumerate(zip(gift_files, GIFT_COLORS)):
    create_placeholder_image(filename, colors[0], colors[1], colors[2], 'gift')

print("\n✅ All placeholder images created successfully!")

