# Dockerfile for playmash Vue 3 app with pnpm
FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the app
COPY . .

# Build the app
RUN pnpm build

# Expose port (Vite default is 5173, change if needed)
EXPOSE 5173

# Start the app in development mode
CMD ["pnpm", "dev", "--host"]
