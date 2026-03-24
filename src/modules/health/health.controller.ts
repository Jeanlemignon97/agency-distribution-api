import { type FastifyInstance } from "fastify";

export async function healthController(app: FastifyInstance) {
    app.get("/health", async () => {
        return {
            status: "ok",
            message: "Welcome to the Agency Distribution API"
        };
    });

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
}
