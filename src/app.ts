import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma.js";
import { healthController } from "./modules/health/health.controller.js";
import { tripsController } from "./modules/trips/trips.controller.js";


export function buildApp() {
    const app = Fastify({
        logger: true,
    });

    // Enregistre les plugins
    app.register(prismaPlugin);

    // Enregistre les routes
    app.register(healthController);

    app.register(tripsController);

    return app;
}