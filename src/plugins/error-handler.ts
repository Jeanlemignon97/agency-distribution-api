/**
 * Plugin pour la gestion des erreurs
 */

import fp from 'fastify-plugin';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { HttpError } from '../shared/errors/http-error.js';

async function errorHandlerPlugin(app: FastifyInstance) {
    app.setErrorHandler(
        (error: Error, request: FastifyRequest, reply: FastifyReply) => {
            request.log.error(error);

            if (error instanceof HttpError) {
                return reply.status(error.statusCode).send({
                    error: 'Request Error',
                    message: error.message,
                    statusCode: error.statusCode,
                });
            }

            return reply.status(500).send({
                error: 'Internal Server Error',
                message: 'Something went wrong',
                statusCode: 500,
            });
        },
    );
}

export default fp(errorHandlerPlugin, {
    name: 'error-handler-plugin',
});