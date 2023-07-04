FROM node:15.12.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "node", "." ]