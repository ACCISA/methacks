from flask import Flask, request, jsonify, make_response, render_template, session
from datetime import datetime, timedelta
import requests
from functools import wraps
import uuid
from werkzeug.utils import secure_filename
import numpy as np
import io
import pytesseract
from PIL import Image
from flask_cors import CORS
import numpy as np
import requests
import json
from flask import Flask, request
import requests
import json
from flask import Flask, request

app = Flask(__name__)
CORS(app)


@app.route("/image", methods=['POST'])
def get_ingredients_from_image():

    print("Getting the ingredients from the image upload")

    if request.method == 'POST':
        image = request.files.get('image')
        if (image):

            img1 = np.array(Image.open(image))
            recipe = pytesseract.image_to_string(img1)

            print(recipe)

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
    return "Virgule"


@app.route("/text",methods=['POST','GET'])
def teast():
    return "ye"

@app.route("/url", methods=['POST'])
def get_ingredients_from_URL():

    print("Getting the ingredients from the URL")
    # if request.method == 'POST':
    #     url_recipe = request.form.get('snap')
    #     print(url_recipe)

    if request.method == 'POST':

        url = "https://api.spoonacular.com/recipes/extract"
        # url_recipe = request.files.get('snap')
        json = request.json
        print(json)
        url_recipe = json['snap']
        print(request.files)
        print(url_recipe, "asd")
        params = {
            "apiKey": "e3c9cd8d2998470fbaa639d5a4dc0fa0",
            "url": url_recipe,
        }

        response = requests.get(url_recipe, params=params)
        recipe_data = json.loads(response.text)
        ingredients_list = recipe_data["extendedIngredients"]
        ingredient_names = [ingredient["nameClean"]
                            for ingredient in ingredients_list]
        return (ingredient_names)
    return 'Virgule'


if __name__ == "__main__":
    app.run(debug=True,port=4040)