import { type FastifyInstance } from "fastify";
import { requireApiKey } from "../../middleware/require-api-key.js";

/**
 * Health controller
 * 
 * @param app - Instance Fastify
 */
export async function healthController(app: FastifyInstance) {
    // Health check without database connection
    app.get("/health", async () => {
        return {
            status: "ok",
            message: "Welcome to the Agency Distribution API"
        };
    });

    // Health check with database connection
    app.get("/api/v1/health", async () => {
        const agencyCount = await app.prisma.agency.count();
        const tripCount = await app.prisma.trip.count();
        const bookingCount = await app.prisma.booking.count();
        const apiKeyCount = await app.prisma.apiKey.count();

        return {
            status: "ok",
            message: "Agency Distribution API v1 is running",
            data: {
                agencyCount,
                tripCount,
                bookingCount,
                apiKeyCount
            }
        };
    });

    app.get("/api/v1/protected/ping", { preHandler: [requireApiKey] }, async (request) => {
        return {
            status: "ok",
            message: "Protected route accessed successfully",
            data: {
                apiConsumer: request.apiKey?.name ?? null,
                apiKey: request.apiKey?.id ?? null
            }
        };
    });
}
