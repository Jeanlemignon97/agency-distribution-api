/**
 * Déclaration des types pour Fastify
 * Permet d'ajouter des propriétés personnalisées à l'instance Fastify
 */

import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
    }

    interface FastifyRequest {
        apiKey?: ApiKey;
    }
}   