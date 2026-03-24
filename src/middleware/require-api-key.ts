/**
 * Middleware pour vérifier la présence et la validité de la clé API
 * 
 * @param request - Requête Fastify
 * @param reply - Réponse Fastify
 */

import { type FastifyRequest, type FastifyReply } from "fastify";
import { ApiKeysRepository } from "../modules/api-keys/api-keys.repository.js";

export async function requireApiKey(request: FastifyRequest, reply: FastifyReply) {
    const apiKeyHeader = request.headers['x-api-key'] as string;

    if (!apiKeyHeader) {
        reply.code(401).send({ error: 'Unauthorized', message: 'API key is required', statusCode: 401 });
        return;
    }

    const apiKeyRepository = new ApiKeysRepository(request.server.prisma);
    const apiKey = await apiKeyRepository.findActiveByKey(apiKeyHeader);

    if (!apiKey) {
        reply.code(401).send({ error: 'Unauthorized', message: 'Invalid or inactive API key', statusCode: 401 });
        return;
    }

    await apiKeyRepository.updateLastUsedAt(apiKey.id);

    request.apiKey = apiKey;
}




