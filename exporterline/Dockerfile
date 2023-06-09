#to be aggreed
FROM node:14

WORKDIR /asap

COPY package.json ./

RUN npm install && sh fix-phantomjs.sh

COPY . .

CMD ["node", "index.js"]
