FROM node:16.13.1
WORKDIR /frontend

COPY package*.json ./
RUN npm install


COPY . .


RUN npm run build

EXPOSE 4007

CMD ["npm", "start"]
