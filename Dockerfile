# Use the official Node.js image as the base image
FROM node:alpine

# Set the working directory inside the container for the API
WORKDIR /app/api

# Copy the API package.json and package-lock.json
COPY api/package*.json ./

# Install API dependencies
RUN npm install

# Copy the API source code
COPY api/ .

# Set the working directory inside the container for the React app
WORKDIR /app/app

# Copy the React app package.json and package-lock.json
COPY app/package*.json ./

# Install React app dependencies
RUN npm install

# Copy the React source code
COPY app/ .

# Build the React app
RUN npm run build

# Copy the React build files into the /static directory
RUN cp -r build /static

# Remove the source files only for the React app
RUN rm -rf /app/app

# Set the working directory back to /app
WORKDIR /app

# Expose the port that the Express.js server will run on
EXPOSE 3030

# Define environment variables, if necessary
ENV PORT=3030

# Set the entry point for the container to start the Express.js server
CMD ["node", "api/index.js"]
