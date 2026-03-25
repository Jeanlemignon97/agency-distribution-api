import type { FastifyInstance } from 'fastify';
import { requireApiKey } from '../../middleware/require-api-key.js';
import { HttpError } from '../../shared/errors/http-error.js';
import { createBookingBodySchema } from './bookings.schema.js';
import { BookingsService } from './bookings.service.js';

export async function bookingsController(app: FastifyInstance) {
    app.post(
        '/api/v1/bookings',
        {
            preHandler: [requireApiKey],
        },
        async (request, reply) => {
            const parsedBody = createBookingBodySchema.safeParse(request.body);

            if (!parsedBody.success) {
                return reply.status(400).send({
                    error: 'Bad Request',
                    message: 'Invalid request body',
                    statusCode: 400,
                    details: parsedBody.error.flatten(),
                });
            }

            const bookingsService = new BookingsService(app.prisma);

            try {
                const createdBooking = await bookingsService.createBooking(parsedBody.data);

                return reply.status(201).send({
                    message: 'Booking created successfully',
                    data: createdBooking,
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
}