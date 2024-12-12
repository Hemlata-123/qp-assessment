# Use Node.js as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the port your app runs on (default for Node.js apps is 3000)
EXPOSE 3000

# Define the default command to run your app
CMD ["npm", "start"]
