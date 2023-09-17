
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Expose port 3000 instead of port 80
EXPOSE 2376

# Change the CMD command to fix the error
CMD ["node", "index.js"]
