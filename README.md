# Agency Distribution API

Simulation d'une API B2B de distribution de trajets, pensée pour des agences de voyage digitalisées et des partenaires tiers souhaitant consommer les données via clé API.

## Contexte

Ce projet simule une API permettant à plusieurs applications de :

- récupérer des trajets d'agences
- créer des trajets
- réserver des sièges
- consommer l'API via une clé API

L'objectif est de reproduire une logique proche d'un fournisseur de distribution de billets.

## Stack technique

- Node.js
- TypeScript
- Fastify
- Prisma
- PostgreSQL

## Lancement du projet

```bash
npm install
npm run dev