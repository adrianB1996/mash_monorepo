import os
import requests
import json as pyjson
from models.category_models import CategoryRequest, CategoryResponse
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://ollama:11434/api/generate")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "mash-categories")

def remove_json_comments(json_str):
    """
    Remove double-slash (//) comments from a JSON string.
    This is used to sanitize LLM output before parsing as JSON.

    Args:
        json_str (str): The JSON string potentially containing comments.

    Returns:
        str: The JSON string with comments removed.
    """
    import re
    # Remove // comments
    return re.sub(r'//.*', '', json_str)

def generate_categories(req: CategoryRequest) -> CategoryResponse:
    """
    Generate MASH game categories and options for a given theme using an LLM.

    This function sends a prompt to the Ollama LLM to generate a specified number of unique MASH game categories,
    each with a specified number of unique options, for a given theme. The response is parsed and validated
    before being returned as a CategoryResponse.

    Args:
        req (CategoryRequest): The request object containing the theme, number of categories, and number of options per category.

    Returns:
        CategoryResponse: The response object containing the theme and the generated categories.

    Raises:
        RuntimeError: If the LLM response is empty, cannot be parsed, or does not match the expected structure.
    """
    # Add multiple generic examples to the prompt, not tied to any specific theme
    example = (
        '{\n'
        '  "title": "Vacation Destination",\n'
        '  "options": [\n'
        '    { "title": "Paris", "state": "waiting" },\n'
        '    { "title": "Tokyo", "state": "waiting" },\n'
        '    { "title": "Sydney", "state": "waiting" },\n'
        '    { "title": "Cairo", "state": "waiting" }\n'
        '  ]\n'
        '},\n'
        '{\n'
        '  "title": "Superpower",\n'
        '  "options": [\n'
        '    { "title": "Invisibility", "state": "waiting" },\n'
        '    { "title": "Flight", "state": "waiting" },\n'
        '    { "title": "Telepathy", "state": "waiting" },\n'
        '    { "title": "Time Travel", "state": "waiting" }\n'
        '  ]\n'
        '}'
    )
    prompt = (
        "MASH is a game where players create fun, imaginative categories and fill each with possible options. "
        f"Generate exactly {req.num_categories} unique MASH game categories for the theme: {req.theme}. "
        f"Each category must have exactly {req.num_options} unique options. Do not generate more or fewer. "
        "If you cannot think of enough options, repeat previous ones to reach the required count. "
        "Do not repeat the same category title more than once. "
        "Do not use the example categories or options in your response. Create new, unique categories and options for the given theme. "
        "Format your response as a JSON array of category objects only. Each category must have:\n"
        "- 'title': a string name for the category\n"
        "- 'options': an array of objects, each with 'title' (string) and 'state' (one of: 'waiting', 'chosen', 'discarded')\n\n"
        "Here are examples of the format I want for the theme 'Superpowers' (do not include this text or these examples in your response):\n"
        f"[\n  {example}\n]\n\n"
        "DO NOT include any markdown formatting, explanations, or additional text. Do not include any comments. Only output valid JSON."
    )
    try:
        # Send the prompt to the LLM
        response = requests.post(
            OLLAMA_URL,
            json={"model": OLLAMA_MODEL, "prompt": prompt, "stream": False},
            timeout=120
        )
        response.raise_for_status()
        data = response.json()
        raw_response = data.get("response", "[]")
        print(f"Raw LLM response: {raw_response}")  # Log the raw response for debugging

        try:
            if not raw_response:
                raise ValueError("LLM returned an empty response.")
            # Remove comments and parse JSON
            cleaned = remove_json_comments(raw_response)
            categories_list = pyjson.loads(cleaned)
            # Validate expected structure
            for category in categories_list:
                if "title" not in category or "options" not in category:
                    raise ValueError(f"Category missing required fields: {category}")
                if len(category["options"]) != req.num_options:
                    raise ValueError(f"Category '{category['title']}' does not have {req.num_options} options.")
        except pyjson.JSONDecodeError as e:
            raise RuntimeError(f"JSON parsing failed: {e}. Raw response: {raw_response}")
        except Exception as e:
            raise RuntimeError(f"Error processing categories: {e}")

        return CategoryResponse(theme=req.theme, categories=categories_list)
    except Exception as e:
        raise RuntimeError(f"Error generating categories: {e}")
