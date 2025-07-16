# Use official Node.js image
FROM node:latest

# Set the working directory inside the container
# This is where your application code will live inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the port your service runs on (change if needed)
EXPOSE 5000

# Run the backend service
# This will run `node index.js` which is defined in package.json
# Make sure index.js is the entry point of your Node.js application
CMD ["node", "index.js"]