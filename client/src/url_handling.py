import requests
import json
from flask import Flask, request

def receive_string(url):
    string_data = request.json['stringData']
    
    # Specify the URL of the Spoonacular API endpoint for Extract Recipe from Website function
    url = "https://api.spoonacular.com/recipes/extract"

    # Set the parameters for the API request, including the website URL and your API key
    params = {
        "apiKey": "e3c9cd8d2998470fbaa639d5a4dc0fa0",
        "url": url,
        }

    # Send the API request using the requests library
    response = requests.get(url, params=params)

    # Parse the response JSON data into a Python dictionary
    recipe_data = json.loads(response.text)

    # Extract the ingredients list from the recipe data
    ingredients_list = recipe_data["extendedIngredients"]

    # Extract and print the names of the ingredients as a list
    ingredient_names = [ingredient["nameClean"] for ingredient in ingredients_list]
    return (ingredient_names)

if __name__ == '__main__':
    app.run()