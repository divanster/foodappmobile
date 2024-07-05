# Dockerfile for React Native App with Android environment

# Use the official Node.js image
FROM node:14

# Install essential tools
RUN apt-get update && \
    apt-get install -y openjdk-11-jdk curl unzip && \
    apt-get clean

# Install Android SDK
RUN curl -o sdk-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-6609375_latest.zip && \
    mkdir -p /usr/local/android-sdk && \
    unzip sdk-tools.zip -d /usr/local/android-sdk && \
    rm sdk-tools.zip

# Set environment variables
ENV ANDROID_SDK_ROOT /usr/local/android-sdk
ENV PATH ${PATH}:${ANDROID_SDK_ROOT}/tools/bin:${ANDROID_SDK_ROOT}/platform-tools

# Accept licenses
RUN yes | sdkmanager --licenses

# Install SDK packages
RUN sdkmanager "platform-tools" "platforms;android-29" "build-tools;29.0.3"

# Set work directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port
EXPOSE 8081

# Start the Metro Bundler
CMD ["npm", "start"]
