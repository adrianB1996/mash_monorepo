# PlayMash Full Stack Service

This repository provides a complete, containerized MASH (Mansion, Apartment, Shack, House) game experience, powered by AI. It includes:

- **PlayMash Frontend**: A modern web UI for playing MASH, built with Vue.js.
- **MASH Backend**: A FastAPI service that generates creative MASH categories and options using a local Ollama LLM.
- **Ollama Model Server**: Runs your chosen LLM (e.g., TinyLlama, Llama 2) for category generation.
- **Docker Compose**: Orchestrates all services for easy local or cloud deployment.
- **Modelfile**: Defines the system prompt and parameters for your Ollama model.
- **entrypoint.sh**: Used to customize container startup, such as waiting for dependencies or running migrations.

---

## Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/) installed (required for the recommended setup)
- (Optional) Python 3.11+ if you want to run the backend without Docker
- (Optional) [Ollama](https://ollama.com/) installed locally if you want to run the model server outside Docker

---

## How It Works

1. **User interacts with the PlayMash frontend** (e.g., chooses a theme).
2. **Frontend sends a request to the backend** (`/categories` endpoint) with the theme and desired number of categories/options.
3. **Backend constructs a prompt and queries the Ollama LLM** to generate creative, on-theme categories and options.
4. **Backend returns the generated categories/options** to the frontend for gameplay.

---

## Quick Start (Recommended: Docker Compose)

If you are happy to run the full stack with default settings, you can simply run:
```powershell
docker-compose up --build
```
This will start all services (Ollama, backend, and frontend) with the default configuration.

1. **Configure your `.env` file:**
   - Edit `MASH_backend/.env` to set `OLLAMA_URL` and `OLLAMA_MODEL` to match your Ollama model setup.
   - Example:
     ```
     OLLAMA_URL=http://ollama:11434/api/generate
     OLLAMA_MODEL=mash-categories
     ```
   - If you change the model or system prompt, also update the `Modelfile` and restart the Ollama container.

2. **Start all services:**
   ```powershell
   docker compose up --build
   ```
   This will start:
   - Ollama (AI model server, using your `Modelfile`)
   - MASH backend (FastAPI)
   - PlayMash frontend

3. **Access the services:**
   - PlayMash frontend: [http://localhost:5173](http://localhost:5173)
   - FastAPI docs: [http://localhost:8000/docs](http://localhost:8000/docs)

4. **Stopping services:**
   ```powershell
   docker compose down
   ```

---

## Running Backend Only (Advanced)

If you want to run just the backend (not recommended for most users):

1. Ensure [Ollama](https://ollama.com/) is running locally with your desired model.
2. Edit `MASH_backend/.env` to match your Ollama setup.
3. Install dependencies:
   ```powershell
   pip install -r MASH_backend/requirements.txt
   ```
4. Start the backend:
   ```powershell
   cd MASH_backend
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

---

## Running in a Low-Traffic Production Environment

To deploy PlayMash for a small team or low-traffic production use (e.g., a classroom, club, or internal event):

1. **Set up a server** (cloud VM, on-prem, or a small Azure VM) with Docker and Docker Compose installed.
2. **Clone this repository** to your server:
   ```powershell
   git clone <your-repo-url>
   cd gelt_interview
   ```
3. **Edit your `.env` file** in `MASH_backend/` to set the correct Ollama model and URL if needed.
4. **Build and start all services** in detached mode:
   ```powershell
   docker compose up --build -d
   ```
5. **Access the app:**
   - Frontend: `http://<your-server-ip>:5173`
   - API docs: `http://<your-server-ip>:8000/docs`

**Notes for production:**
- For low-traffic use, the default Docker Compose setup is sufficient. All services run in containers and restart automatically if they fail.
- For HTTPS, use a reverse proxy (like Nginx or Caddy) in front of the frontend and backend.
- For persistent Ollama model data, Docker volumes are already configured.
- Logs are output to the console by default; for long-term retention, configure Docker logging drivers or redirect logs to files.
- To update, pull the latest code and re-run `docker compose up --build -d`.

---

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

---

## Customizing the AI Model

- The backend uses the `.env` file to determine which Ollama model to use.
- Change `OLLAMA_MODEL` in `MASH_backend/.env` to match the model you want (e.g., `tinyllama`, `llama2`, etc.).
- The `Modelfile` in the repo controls the system prompt and parameters for your Ollama model. Edit this file to change how the model responds (e.g., temperature, instructions).
- Make sure the model is loaded and running in Ollama before starting the backend.

---

## entrypoint.sh

- The `entrypoint.sh` script is used by some containers to customize startup (e.g., waiting for Ollama to be ready, running migrations, etc.).
- You can edit this script to add custom startup logic for your deployment.

---

## Development & Production Notes

- Edit the FastAPI app in `MASH_backend/main.py` and business logic in `MASH_backend/services/category_service.py`.
- Models are defined in `MASH_backend/models/category_models.py`.
- For production, use a process manager (e.g., Gunicorn with Uvicorn workers) and set up logging/monitoring as needed.
- The backend and frontend are designed to work together; using the full repo and Docker Compose is strongly recommended for best results.

---

## Using the AI Category Generator (Frontend)

To use the LLM-powered category generator in the PlayMash frontend:

1. Open the PlayMash app in your browser: [http://localhost:5173](http://localhost:5173)
2. On the main game screen, locate the **category preset dropdown** (labeled "Select a default").
3. In the dropdown, select **"Use category generator"**.
4. A form will appear below the dropdown. Fill in:
   - **Theme**: The topic for your categories (e.g., "Fantasy", "Superpowers").
   - **Number of categories**: How many categories to generate (e.g., 4).
   - **Options per category**: How many options per category (e.g., 4).
5. Click **"Generate Categories"**. The app will contact the backend and populate the game with AI-generated categories and options.

If you see an error, check that all services are running and your `.env` is configured correctly.

---

## Log Storage

- The backend writes logs to both the console and a persistent log file at `/logs/mash_backend.log` inside the backend container.
- On your host, you can access the logs via the Docker volume `mash_backend_logs`.
- To view the logs, run:
  ```powershell
  docker-compose exec mash_backend type /logs/mash_backend.log
  ```
  Or copy the log file out of the container:
  ```powershell
  docker-compose cp mash_backend:/logs/mash_backend.log .
  ```
- Logs include all requests, responses, and errors for observability and troubleshooting.

---

For more, see the documentation for FastAPI, Ollama, and Docker.
