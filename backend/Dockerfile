FROM node:18.13.0-alpine

WORKDIR /backend

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm build

CMD  ["npm", "run", "start:dev"]
