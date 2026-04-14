FROM node:22-alpine

WORKDIR /application

# Copie les fichiers de config
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma

# Installation des dépendances
RUN apk add --no-cache netcat-openbsd && npm install

# Génération prisma
RUN npx prisma generate

# Copie le reste du code
COPY src ./src

# Construction TypeScript → JavaScript
RUN npm run build

# Port exposé
EXPOSE 3000

# # Copie le script de démarrage (Désactivé pour test)
# COPY entrypoint.sh /application/entrypoint.sh
# RUN chmod +x /application/entrypoint.sh

# # Commande de démarrage
# ENTRYPOINT ["/application/entrypoint.sh"]

# Commande de test direct
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && npm start"]