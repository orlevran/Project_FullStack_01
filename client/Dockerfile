# Use official Node.js image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json & package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
# This allows Docker to cache the npm install step if package.json hasn't changed
RUN npm install

# Copy the rest of the client project files (everything in client/)
COPY . .

# Expose port used by React app
EXPOSE 3000

# Start the React development server
# This will run `npm start` which is defined in package.json
CMD ["npm", "start"]