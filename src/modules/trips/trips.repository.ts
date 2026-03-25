import { PrismaClient, Prisma, TripStatus } from '@prisma/client';

/**
 * Filtres de recherche pour les voyages
 */
type FindManyTripsFilters = {
    origin?: string | undefined;
    destination?: string | undefined;
    departureDate?: string | undefined;
};

/**
 * Interface représentant les données nécessaires pour créer un voyage.
 */
type CreateTripRepositoryInput = {
    agencyId: string;
    origin: string;
    destination: string;
    departureTime: Date;
    arrivalTime: Date;
    price: number;
    currency: string;
    totalSeats: number;
};

export class TripsRepository {
    constructor(private readonly prisma: PrismaClient) { }

    /**
     * Trouve plusieurs voyages selon des filtres
     * 
     * @param filters - Filtres de recherche
     * @returns Liste des voyages
     */
    async findMany(filters: FindManyTripsFilters) {
        const where: Prisma.TripWhereInput = {
            status: TripStatus.SCHEDULED,
        };

        if (filters.origin) {
            where.origin = {
                equals: filters.origin,
                mode: 'insensitive',
            };
        }

        if (filters.destination) {
            where.destination = {
                equals: filters.destination,
                mode: 'insensitive',
            };
        }

        if (filters.departureDate) {
            const startOfDay = new Date(`${filters.departureDate}T00:00:00.000Z`);
            const endOfDay = new Date(`${filters.departureDate}T23:59:59.999Z`);

            where.departureTime = {
                gte: startOfDay,
                lte: endOfDay,
            };
        }

        return this.prisma.trip.findMany({
            where,
            include: {
                agency: true,
            },
            orderBy: {
                departureTime: 'asc',
            },
        });
    }

    /**
    * Trouve une agence par son ID
    * 
    * @param agencyId - ID de l'agence
    * @returns Agence trouvée
    */
    async findAgencyById(agencyId: string) {
        return this.prisma.agency.findUnique({
            where: { id: agencyId },
        });
    }

    /**
     * Crée un nouveau voyage
     * 
     * @param data - Données du voyage à créer
     * @returns Voyage créé
     */
    async create(data: CreateTripRepositoryInput) {
        return this.prisma.trip.create({
            data: {
                agencyId: data.agencyId,
                origin: data.origin,
                destination: data.destination,
                departureTime: data.departureTime,
                arrivalTime: data.arrivalTime,
                price: data.price,
                currency: data.currency,
                totalSeats: data.totalSeats,
                availableSeats: data.totalSeats,
                status: TripStatus.SCHEDULED,
            },
            include: {
                agency: true,
            },
        });
    }

}

/**
 * On filtre uniquement les trajets SCHEDULED
 * On ne veut pas montrer :
 * les trajets annulés
 * les trajets terminés
 * On filtre par date
 * On transforme 2026-03-25 en plage :
 * début du jour : 00:00:00
 * fin du jour : 23:59:59
 * Comme ça, on récupère tous les trajets du jour.
 * include: { agency: true }
 * On récupère aussi l’agence pour pouvoir renvoyer son nom.
 */