import pytesseract
from PIL import Image
import numpy as np


# filename = 'image1.jpg'
filename = 'image3.png'

img1 = np.array(Image.open(filename))

text = pytesseract.image_to_string(img1)

print(text)