#!/bin/sh

# Attendre que PostgreSQL soit prêt (max 30 secondes)
echo "Waiting for database..."
i=1
while [ $i -le 30 ]; do
  nc -z db 5432 && echo "Database is ready!" && break
  echo "Attempt $i: Database not ready yet (try $i)..."
  i=$((i+1))
  sleep 1
done

# Exécuter les migrations Prisma
echo "Running migrations..."
npx prisma migrate deploy

# Démarrer l'API
echo "Starting API..."
npm start
