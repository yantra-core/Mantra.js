# Use the official Node.js runtime as a base image
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in package.json
RUN npm install --include=dev

# Make port 80 available to the world outside this container
EXPOSE 80

# Run the command to execute your tests
CMD ["npm", "test"]
