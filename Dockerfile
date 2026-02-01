# 1. On part d'une image Node.js officielle et légère
FROM node:18-alpine

# 2. On définit le dossier de travail dans le conteneur
WORKDIR /app

# 3. On copie les fichiers de configuration des dépendances
COPY package*.json ./

# 4. On installe les outils nécessaires (Express, SQLite3)
RUN npm install

# 5. On copie tout le reste de ton code (index.html, server.js, etc.)
COPY . .

# 6. On expose le port 3000 (celui utilisé par ton serveur)
EXPOSE 3000

# 7. La commande pour démarrer ton application
CMD ["npm", "start"]