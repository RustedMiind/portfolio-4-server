# Use the official Node.js image as the base image
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Generate the Prisma client
RUN npx prisma generate

# Build the NestJS application
RUN npm run build

# Copy entrypoint script
COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Expose the application port
EXPOSE 3101

# Run entrypoint script (migrations + app start)
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]