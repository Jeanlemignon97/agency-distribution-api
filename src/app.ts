import Fastify from "fastify";
import { healthController } from "./modules/health/health.controller.js";

export function buildApp() {
    const app = Fastify({
        logger: true,
    });

    // Enregistre les routes
    app.register(healthController);

    return app;
}