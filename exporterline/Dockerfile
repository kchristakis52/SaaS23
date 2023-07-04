#to be aggreed
FROM ubuntu:latest

RUN apt-get update && apt-get install -y nodejs npm

ENV OPENSSL_CONF=/dev/null

WORKDIR /asa

COPY package.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]