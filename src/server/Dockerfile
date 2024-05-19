FROM node:18-alpine

RUN npm install -g ts-node knex

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

EXPOSE 4000
