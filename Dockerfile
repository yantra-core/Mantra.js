# Use a Debian-based Node.js image as the base image
FROM node:20.9.0-buster-slim

# Set working directory
WORKDIR /app

# Set environment variables
ARG APP_SECRET
ENV APP_SECRET=${APP_SECRET}
ENV NODE_ENV=production

# Install the necessary build dependencies for git (required if npm package points to a git repo)
RUN apt-get update && \
    apt-get install -y \
    git

# Copy mantra-game directory to /app/mantra-game
COPY mantra-game /app/mantra-game

# Copy mantra-server directory (current path is now the root of the project)
COPY mantra-server /app/mantra-server

# Install dependencies for mantra-game
WORKDIR /app/mantra-game
RUN npm install

# Install dependencies for websocket server plugin
WORKDIR /app/mantra-game/plugins/server
RUN npm install

# Install dependencies for client plugin ( probably not needed )
WORKDIR /app/mantra-game/plugins/client
RUN npm install

# Install dependencies for matter.js plugin
WORKDIR /app/mantra-game/plugins/physics-matter
RUN npm install

# Install dependencies for mantra-server actual
WORKDIR /app/mantra-server
RUN npm install

# Set work directory back to /app
WORKDIR /app

# Set a production port environment variable
ENV PRODUCTION_PORT=8888

# Specify the command to run your application
CMD ["node", "./mantra-server/server.js"]
