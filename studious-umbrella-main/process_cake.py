from PIL import Image  # type: ignore[import-not-found]
from collections import Counter

img = Image.open('photo.jpg').convert('RGB')
width, height = img.size
pixels = list(img.getdata())

counter = Counter(pixels)
# Use the most common color as the background candidate.
bg_color = counter.most_common(1)[0][0]

new = Image.new('RGBA', img.size, (0, 0, 0, 0))
for y in range(height):
    for x in range(width):
        r, g, b = img.getpixel((x, y))
        if abs(r - bg_color[0]) + abs(g - bg_color[1]) + abs(b - bg_color[2]) < 55:
            new.putpixel((x, y), (0, 0, 0, 0))
        else:
            new.putpixel((x, y), (r, g, b, 255))

new.save('cake-photo.png')
print('saved cake-photo.png') 
