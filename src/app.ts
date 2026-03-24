import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma.js";
import { healthController } from "./modules/health/health.controller.js";


export function buildApp() {
    const app = Fastify({
        logger: true,
    });

    // Enregistre les plugins
    app.register(prismaPlugin);

    // Enregistre les routes
    app.register(healthController);

    return app;
}