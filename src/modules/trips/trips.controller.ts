import { type FastifyInstance, type FastifyReply } from "fastify";
import { TripsService } from "./trips.service.js";
import { type ListTripsQuery } from "./trips.types.js";
import { requireApiKey } from "../../middleware/require-api-key.js";
import { listTripsQuerySchema } from "./trips.schema.js";

/**
 * Contrôleur pour la gestion des voyages (Trips).
 * 
 * @param app - Instance de l'application Fastify
 */
export async function tripsController(app: FastifyInstance) {
    const tripsService = new TripsService(app.prisma);

    /**
     * GET /api/v1/trips
     * Liste les voyages disponibles selon des critères de recherche.
     * Cette route est protégée par une clé API.
     */
    app.get<{ Querystring: ListTripsQuery }>(
        "/api/v1/trips",
        {
            preHandler: [requireApiKey]
        },
        async (request, reply: FastifyReply) => {
            const parsedQuery = listTripsQuerySchema.safeParse(request.query);

            if (!parsedQuery.success) {
                return reply.status(400).send({
                    error: 'Bad Request',
                    message: 'Invalid query parameters',
                    statusCode: 400,
                    details: parsedQuery.error.flatten(),
                });
            }

            // On appelle le service pour récupérer les voyages
            const trips = await tripsService.listTrips(parsedQuery.data);

            return {
                data: trips,
                meta: {
                    apiConsumer: request.apiKey?.name ?? null,
                    filters: parsedQuery.data,
                    total: trips.length,
                },
            };
        }
    );
}