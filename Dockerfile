# Dockerfile
FROM node:14.13.0-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/

RUN apk add python3
RUN apk add build-base
RUN npm install node-gyp

RUN npm install
RUN npm run build

EXPOSE 4000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=4000

CMD [ "npm", "start" ]
