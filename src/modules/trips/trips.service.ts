import { PrismaClient } from '@prisma/client';
import { TripsRepository } from './trips.repository.js';
import type { ListTripsQuery, TripListItem } from './trips.types.js';

/**
 * Service pour la gestion des voyages
 */
export class TripsService {
    private readonly tripsRepository: TripsRepository;

    constructor(prisma: PrismaClient) {
        this.tripsRepository = new TripsRepository(prisma);
    }

    /**
     * Liste les voyages selon des filtres
     * 
     * @param query - Filtres de recherche
     * @returns Liste des voyages
     */
    async listTrips(query: ListTripsQuery): Promise<TripListItem[]> {
        const trips = await this.tripsRepository.findMany(query);

        return trips.map((trip) => ({
            id: trip.id,
            agencyId: trip.agencyId,
            agencyName: trip.agency.name,
            origin: trip.origin,
            destination: trip.destination,
            departureTime: trip.departureTime.toISOString(),
            arrivalTime: trip.arrivalTime.toISOString(),
            price: trip.price,
            currency: trip.currency,
            availableSeats: trip.availableSeats,
            status: trip.status,
        }));
    }
}