# syntax=docker/dockerfile:1

FROM node:16-slim
WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install

# Copy over the code
COPY app.js .
RUN mkdir public
COPY public/* ./public/

# Container opens the API on this port
EXPOSE 8080

# Start application
ENTRYPOINT [ "node", "app.js" ]
