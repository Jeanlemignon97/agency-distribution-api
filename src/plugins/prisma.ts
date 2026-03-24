/**
 * Plugin pour enregistrer Prisma dans l'instance Fastify
 * Permet d'accéder à la base de données via fastify.prisma
 */

import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";
import { type FastifyInstance } from "fastify";

async function prismaPlugin(app: FastifyInstance) {
    const prisma = new PrismaClient();

    await prisma.$connect();

    app.decorate('prisma', prisma);

    app.addHook('onClose', async (instance) => {
        await instance.prisma.$disconnect();
    });
}

export default fp(prismaPlugin, {
    name: 'prisma-plugin',
});