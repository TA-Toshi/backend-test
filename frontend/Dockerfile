FROM node:18.13.0-alpine

WORKDIR /frontend

EXPOSE 8080

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run" , "serve"]
 

