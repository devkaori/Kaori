# Utiliser une image de Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier le package.json et le package-lock.json (le cas échéant)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Compiler le code TypeScript
RUN npm run build

# Exposer le port nécessaire par votre application
EXPOSE 3000

# Commande pour exécuter l'application
CMD ["npm", "start"]
