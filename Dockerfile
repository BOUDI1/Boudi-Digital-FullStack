# Utilise une image Node.js stable et légère
FROM node:18-alpine

# Définit le dossier de travail dans le conteneur
WORKDIR /app

# Copie d'abord les fichiers de dépendances pour optimiser le cache
COPY package*.json ./

# Installe les dépendances listées dans package.json
RUN npm install

# Copie tout le reste de ton code source dans le conteneur
COPY . .

# Indique que le conteneur écoute sur le port 3000
EXPOSE 3000

# Commande pour démarrer ton serveur Node.js
CMD ["npm", "start"]