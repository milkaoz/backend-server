 # Create image based on the official Node 6 image from the dockerhub
FROM node:alpine

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

#Argumentos
ARG ARG_MONGO_ADDR=localhost
ARG ARG_MONGO_PORT=27017


#Variables de ambiente
ENV MONGO_ADDR=${ARG_MONGO_ADDR}
ENV MONGO_PORT=${ARG_MONGO_PORT}

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["node", "app.js"]