# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Prisma's query engine needs OpenSSL, which isn't included in node:20-alpine by default
RUN apk add --no-cache openssl

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