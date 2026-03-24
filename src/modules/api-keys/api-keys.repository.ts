import { PrismaClient, type ApiKey } from "@prisma/client";

export class ApiKeysRepository {
    constructor(private readonly prisma: PrismaClient) { }

    /**
     * Trouve une clé API active par sa valeur
     * 
     * @param key - Valeur de la clé API
     * @returns Clé API active ou null si non trouvée
     */
    async findActiveByKey(key: string): Promise<ApiKey | null> {
        return this.prisma.apiKey.findFirst({
            where: {
                key,
                isActive: true,
            },
        });
    }

    /**
     * Met à jour la date d'utilisation de la clé API
     * 
     * @param id - ID de la clé API
     */
    async updateLastUsedAt(id: string): Promise<void> {
        await this.prisma.apiKey.update({
            where: {
                id,
            },
            data: {
                lastUsedAt: new Date(),
            },
        });
    }
}

