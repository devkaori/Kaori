FROM node:latest

# Installation de FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm run add-dev 499447456678019072

COPY . .

CMD ["npm", "start"]
