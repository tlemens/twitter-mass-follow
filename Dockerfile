FROM node:10.16

RUN apt-get update

RUN apt-get install -y python-pip

RUN npm install --global gulp-cli

WORKDIR /twitter-mass-follow

COPY package*.json ./

RUN npm install

COPY . .
