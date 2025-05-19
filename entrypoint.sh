#!/bin/sh
# Start Ollama in the background
ollama serve &
OLLAMA_PID=$!

# Wait for Ollama to be ready
until curl -s http://localhost:11434/ > /dev/null; do
  echo "Waiting for Ollama to start..."
  sleep 1
done

echo "Ollama is up. Creating custom model..."
ollama create mash-categories -f /Modelfile || echo "Model may already exist."

echo "Model ready. Continuing to run Ollama in foreground."
wait $OLLAMA_PID
