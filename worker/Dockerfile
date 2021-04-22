FROM node:alpine
WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY ./keys.js ./keys.js
COPY ./index.js ./index.js
CMD ["npm", "run", "start"]
