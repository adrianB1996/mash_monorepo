import logging
from fastapi import FastAPI, HTTPException
from models.category_models import CategoryRequest, CategoryResponse
from services.category_service import generate_categories

# Configure logging for the backend to write to a file as well as console
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
    handlers=[
        logging.FileHandler("/logs/mash_backend.log", encoding="utf-8"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("MASHBackend")

app = FastAPI(
    title="MASH Category Service",
    description="Suggests MASH categories based on a theme using Ollama.",
    version="1.0.0",
    root_path="/api"
)

@app.post(
    "/categories",
    response_model=CategoryResponse,
    summary="Get MASH categories for a theme",
    description="""
    Generate MASH game categories and options for a given theme using a local Ollama LLM.

    - **theme**: The theme for the MASH categories (e.g., 'Cars', 'Superpowers').
    - **num_categories**: The number of categories to generate (default: 10).
    - **num_options**: The number of options per category (default: 4).

    Returns a JSON object with the theme and a list of generated categories, each containing a title and a list of options.
    """
)
def get_categories(req: CategoryRequest):
    """
    Generate MASH categories for a given theme using a local Ollama LLM.

    - **Request body:**
        - theme: str - The theme for the categories.
        - num_categories: int - Number of categories to generate.
        - num_options: int - Number of options per category.
    - **Returns:**
        - CategoryResponse: The generated categories and options for the theme.
    - **Raises:**
        - HTTPException 500: If category generation fails or the LLM response is invalid.
    """
    try:
        logger.info(f"[REQUEST] /categories | theme='{req.theme}', num_categories={req.num_categories}, num_options={req.num_options}")
        result = generate_categories(req)
        logger.info(f"[SUCCESS] /categories | theme='{req.theme}' | Generated {len(result.categories)} categories.")
        return result
    except Exception as e:
        logger.error(f"[ERROR] /categories | theme='{req.theme}' | {type(e).__name__}: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
