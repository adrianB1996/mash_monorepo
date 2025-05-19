# Dockerfile for Ollama (model will be downloaded at runtime)
FROM ollama/ollama:latest

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*


# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy Modelfile into the image
COPY Modelfile /Modelfile

# Expose Ollama's default port
EXPOSE 11434

# Use entrypoint script to start Ollama, pull model, then run Ollama
ENTRYPOINT ["/entrypoint.sh"]
