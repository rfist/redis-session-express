FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm build
EXPOSE 4000
CMD ["npm", "start"]
