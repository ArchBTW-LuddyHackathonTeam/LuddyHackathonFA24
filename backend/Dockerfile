# Use the official Node.js 16 LTS image
FROM node:16-alpine

# Install bash
RUN apk add --no-cache bash

# Create and set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Add the wait-for-it.sh script
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Command to run your application
CMD ["/wait-for-it.sh", "db:5432", "--", "npm", "start"]