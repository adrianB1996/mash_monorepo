from pydantic import BaseModel
from typing import List

class CategoryOption(BaseModel):
    """
    Represents an option within a MASH category.
    Attributes:
        title (str): The name of the option (e.g., 'Paris', 'Invisibility').
        state (str): The state of the option. One of: 'waiting', 'chosen', or 'discarded'.
    """
    title: str
    state: str  # 'waiting', 'chosen', or 'discarded'

class Category(BaseModel):
    """
    Represents a MASH category containing multiple options.
    Attributes:
        title (str): The name of the category (e.g., 'Vacation Destination').
        options (List[CategoryOption]): The list of options for this category.
    """
    title: str
    options: List[CategoryOption]

class CategoryRequest(BaseModel):
    """
    Request model for generating MASH categories.
    Attributes:
        theme (str): The theme for the categories (e.g., 'Cars', 'Superpowers').
        num_categories (int): Number of categories to generate (default: 10).
        num_options (int): Number of options per category (default: 4).
    """
    theme: str
    num_categories: int = 10  # Optional, default to 10
    num_options: int = 4     # Optional, default to 4

class CategoryResponse(BaseModel):
    """
    Response model containing the generated MASH categories for a theme.
    Attributes:
        theme (str): The theme used for generation.
        categories (List[Category]): The generated categories and their options.
    """
    theme: str
    categories: List[Category]
