# MASH_backend

AI engine for generating MASH game categories and options using FastAPI and a local Ollama LLM.

## Overview

This service provides a REST API for generating creative MASH categories and options based on a user-supplied theme. It is designed to be run as a standalone FastAPI backend, powered by an Ollama LLM model (such as TinyLlama or Llama 2).

## Features
- **POST `/categories`**: Generate MASH categories and options for any theme.
- **OpenAPI/Swagger docs**: Interactive API documentation at `/docs`.
- **Docker-ready**: Easily run the backend in a containerized environment.

## ⚠️ Recommended Usage
It is strongly advised to use the entire repository (including the PlayMash frontend, backend, and Ollama model setup) for a seamless experience. The backend is designed to work in concert with the frontend and the Ollama model server, and the provided Docker Compose setup ensures all services are networked correctly.

## Configuration: .env File
The backend uses a `.env` file for configuration. You **must** set the following variables to match your Ollama model setup:

```
OLLAMA_URL=http://ollama:11434/api/generate
OLLAMA_MODEL=mash-categories
```
- **OLLAMA_URL**: The URL where your Ollama model server is running. Change this if your model is running on a different host or port.
- **OLLAMA_MODEL**: The name of the model you want to use (e.g., `mash-categories`, `tinyllama`, `llama2`, etc.). Make sure this matches the model you have loaded in Ollama.

If you use Docker Compose, the `.env` file is automatically included in the backend container. If running standalone, ensure your `.env` is present in the `MASH_backend/` directory.

## Running the Backend (Standalone)

### 1. Prerequisites
- Python 3.11+
- [Ollama](https://ollama.com/) running locally with your desired model (e.g., TinyLlama, Llama 2, etc.)
- (Optional) Docker, if you want to run the backend in a container

### 2. Install Dependencies
```powershell
pip install -r requirements.txt
```

### 3. Start Ollama
Make sure Ollama is running and your model is available. For example:
```powershell
ollama run tinyllama
```

### 4. Run the FastAPI Backend
```powershell
uvicorn main:app --host 0.0.0.0 --port 8000
```

- The API will be available at [http://localhost:8000](http://localhost:8000)
- Swagger docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### 5. Example API Usage
#### Request
```json
POST /categories
{
  "theme": "space",
  "num_categories": 4,
  "num_options": 4
}
```
#### Response
```json
{
  "theme": "space",
  "categories": [
    {
      "title": "Planet",
      "options": [
        {"title": "Mars", "state": "waiting"},
        {"title": "Venus", "state": "waiting"},
        {"title": "Jupiter", "state": "waiting"},
        {"title": "Saturn", "state": "waiting"}
      ]
    },
    ...
  ]
}
```

## API Reference

### POST `/categories`
Generate MASH categories and options for a given theme.

- **Request Body:**
  - `theme` (str): The theme for the categories (e.g., "Cars", "Superpowers").
  - `num_categories` (int, optional): Number of categories to generate (default: 10).
  - `num_options` (int, optional): Number of options per category (default: 4).
- **Response:**
  - `theme` (str): The theme used for generation.
  - `categories` (list): List of generated categories, each with a `title` and a list of `options` (each option has a `title` and a `state`).

See `/docs` for full interactive documentation.

## Development

- Edit the FastAPI app in `main.py` and business logic in `services/category_service.py`.
- Models are defined in `models/category_models.py`.
- To run tests or develop interactively, use the provided Dockerfile or your local Python environment.

## Production Notes
- Ensure Ollama is running and accessible to the backend.
- For production, use a process manager (e.g., Gunicorn with Uvicorn workers) and set up logging/monitoring as needed.

---

For more, see the FastAPI and Ollama documentation.
