import { type FastifyInstance, type FastifyReply } from "fastify";
import { TripsService } from "./trips.service.js";
import { type ListTripsQuery, type DeleteTripParams } from "./trips.types.js";
import { requireApiKey } from "../../middleware/require-api-key.js";
import { listTripsQuerySchema, createTripBodySchema, deleteTripParamsSchema } from "./trips.schema.js";
import { HttpError } from "../../shared/errors/http-error.js";

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

    app.post(
        '/api/v1/trips',
        {
            preHandler: [requireApiKey],
        },
        async (request, reply) => {
            const parsedBody = createTripBodySchema.safeParse(request.body);

            if (!parsedBody.success) {
                return reply.status(400).send({
                    error: 'Bad Request',
                    message: 'Invalid request body',
                    statusCode: 400,
                    details: parsedBody.error.flatten(),
                });
            }

            const tripsService = new TripsService(app.prisma);

            try {
                const createdTrip = await tripsService.createTrip(parsedBody.data);

                return reply.status(201).send({
                    message: 'Trip created successfully',
                    data: createdTrip,
                });
            } catch (error) {
                if (error instanceof HttpError) {
                    return reply.status(error.statusCode).send({
                        error: 'Request Error',
                        message: error.message,
                        statusCode: error.statusCode,
                    });
                }

                throw error;
            }
        },
    );


    /**
     * DELETE /api/v1/trips/:id
     * Supprime un voyage par son ID.
     * Cette route est protégée par une clé API.
     */
    app.delete<{ Params: DeleteTripParams }>(
        '/api/v1/trips/:id',
        {
            preHandler: [requireApiKey],
        },
        async (request, reply: FastifyReply) => {
            const parsedParams = deleteTripParamsSchema.safeParse(request.params);

            if (!parsedParams.success) {
                throw new HttpError(400, 'Invalid route parameters');
            }

            await tripsService.deleteTrip(parsedParams.data.id);

            return reply.status(204).send();
        },
    );
}