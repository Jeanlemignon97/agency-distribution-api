/**
 * Plugin pour la documentation Swagger
 * 
 */

import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';

async function docsPlugin(app: FastifyInstance) {
    await app.register(swagger, {
        openapi: {
            openapi: '3.0.3',
            info: {
                title: 'Agency Distribution API',
                description:
                    'B2B travel distribution API simulation for agencies and ticket comparison apps.',
                version: '1.0.0',
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Local development server',
                },
            ],
            components: {
                securitySchemes: {
                    ApiKeyAuth: {
                        type: 'apiKey',
                        in: 'header',
                        name: 'x-api-key',
                    },
                },
            },
        },
    });

    await app.register(swaggerUi, {
        routePrefix: '/docs',
    });
}

export default fp(docsPlugin, {
    name: 'docs-plugin',
});