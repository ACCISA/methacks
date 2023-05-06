import pytesseract
from PIL import Image
import numpy as np
import requests
import json
from flask import Flask, request

app = Flask(__name__)


@app.route('/api/send_image', methods=['POST'])
def get_clean_ingredient_names(recipe):
    """
    Takes a recipe string and an API key for Spoonacular, and returns a list of
    the clean names of the ingredients in the recipe.
    """
    url = "https://api.spoonacular.com/recipes/extract"
    params = {
        "apiKey": "e3c9cd8d2998470fbaa639d5a4dc0fa0",
        "forceExtraction": True,
        "url": recipe
    }
    response = requests.get(url, params=params)
    data = response.json()
    ingredients = data["extendedIngredients"]
    clean_ingredient_names = [ingredient["nameClean"]
                              for ingredient in ingredients]
    return clean_ingredient_names


def get_recipe(image):
    filename = 'image1.jpg'
    img1 = np.array(Image.open(filename))
    recipe = pytesseract.image_to_string(img1)
    return (clean_ingredient_names())


if __name__ == '__main__':
    app.run()
