import { type FastifyInstance } from "fastify";

export async function healthController(app: FastifyInstance) {
    app.get("/health", async () => {
        return {
            status: "ok",
            message: "Welcome to the Agency Distribution API"
        };
    });

    app.get("/api/v1/health", async () => {
        return {
            status: "ok",
            message: "Agency Distribution API v1 is running"
        };
    });
}
