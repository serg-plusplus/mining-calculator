# Pull node image
FROM node:alpine

# Prepare app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install --no-progress --no-cache --frozen-lockfile --production

# Bundle app source
COPY src ./src/
COPY public ./public/
RUN yarn build
RUN rm -rf src public
WORKDIR build
VOLUME /usr/src/app/build/public

# Install 'pm2' global
RUN yarn global add pm2

# Start up web server
CMD ["pm2-docker", "start", "server.js"]
