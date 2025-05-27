# Use Node base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN apt-get update && apt-get install -y aria2
RUN npm install

# Copy the rest of the project
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "dist/main"]
