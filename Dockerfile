FROM node:14-alpine

WORKDIR /nup

COPY package.json package-lock.json /nup
RUN npm install --production

COPY setup.js /nup
COPY env /nup/env

CMD ["node", "setup.js"]
