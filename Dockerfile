# 1. Image de base : on utilise Node.js version 18 sur Alpine (très léger)
FROM node:18-alpine

# 2. Dossier de travail : où le code sera stocké dans le conteneur
WORKDIR /app

# 3. Copie des fichiers de dépendances uniquement (optimise le cache)
COPY package*.json ./

# 4. Installation des dépendances (Express, SQLite3, etc.)
RUN npm install

# 5. Copie de tout le reste de ton projet (HTML, CSS, JS, etc.)
COPY . .

# 6. Exposition du port 3000 (le port par défaut de ton server.js)
EXPOSE 3000

# 7. Commande de lancement de l'application
CMD ["npm", "start"]