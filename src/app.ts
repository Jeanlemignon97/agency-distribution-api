import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma.js";
import { healthController } from "./modules/health/health.controller.js";
import { tripsController } from "./modules/trips/trips.controller.js";
import { bookingsController } from "./modules/bookings/bookings.controller.js";
import docsPlugin from "./plugins/docs.js";
import errorHandlerPlugin from "./plugins/error-handler.js";

export function buildApp() {
    const app = Fastify({
        logger: true,
    });

    // Enregistre les plugins
    app.register(prismaPlugin);
    app.register(docsPlugin);
    app.register(errorHandlerPlugin);

    // Enregistre les routes
    app.register(healthController);
    app.register(tripsController);
    app.register(bookingsController);



    return app;
}