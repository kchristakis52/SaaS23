#to be aggreed
FROM node:14

WORKDIR /asap

COPY package.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]
