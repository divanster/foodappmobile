# webframework/Dockerfile
FROM node:14

# Set work directory
WORKDIR /app

# Install dependencies
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

# Copy project
COPY . /app/

# Expose the port for Metro Bundler
EXPOSE 8081

# Start Metro Bundler
CMD ["npm", "start"]
