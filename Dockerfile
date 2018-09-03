# Bake in Node 9 Alpine
FROM node:9-alpine
# Set up environment to production
ENV NODE_ENV production
# Create directory for app
RUN mkdir /app
WORKDIR /app
# Copy package.json into app directory on docker image
COPY package.json /app
# Install add dependencies
RUN npm install
# Copy everything else
COPY . /app
# Build react app
RUN npm run build
# Expose local postgres server port to docker
EXPOSE 4001
# Run our server
CMD ["node", "./server/server.js"]