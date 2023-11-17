# Use a Debian-based Node.js image as the base image
FROM node:16.16.0-buster-slim

# Set working directory
WORKDIR /app

# Set environment variables
ARG APP_SECRET
ENV APP_SECRET=${APP_SECRET}
ENV NODE_ENV=production

# Install the necessary build dependencies for git ( required if npm package points to a git repo )
RUN apt-get update && \
    apt-get install -y \
    git

# Copy application files
COPY . .

# Install Node.js dependencies
# run mono repo install
RUN npm install;

# Specify the command to run your application
CMD ["sh", "boot.sh"]
