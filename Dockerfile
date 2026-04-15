# --- ETAPE 1 : BUILD ---
FROM node:22-alpine AS builder
WORKDIR /application

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma

# On installe TOUT (y compris les devDependencies pour compiler)
RUN npm install
RUN npx prisma generate

COPY src ./src
RUN npm run build

# --- ETAPE 2 : RUN ---
FROM node:22-alpine AS runner
WORKDIR /application
ENV NODE_ENV=production

# On récupère seulement le nécessaire de l'étape précédente
COPY --from=builder /application/dist ./dist
COPY --from=builder /application/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /application/package*.json ./
COPY --from=builder /application/prisma ./prisma

# On installe de nouveau les dépendances, mais UNIQUEMENT celles de production
# Et on nettoie le cache npm pour gagner de la place
RUN apk add --no-cache netcat-openbsd && \
    npm install --omit=dev && \
    npm cache clean --force

EXPOSE 3000

# Commande de démarrage
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && npm start"]
