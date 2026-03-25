import { PrismaClient } from '@prisma/client';
import { TripsRepository } from './trips.repository.js';
import type { ListTripsQuery, TripListItem, CreateTripInput, CreatedTrip } from './trips.types.js';
import { HttpError } from '../../shared/errors/http-error.js';

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

    /**
     * Crée un nouveau voyage
     * 
     * @param input - Données du voyage à créer
     * @returns Voyage créé
     */
    async createTrip(input: CreateTripInput): Promise<CreatedTrip> {
        const agency = await this.tripsRepository.findAgencyById(input.agencyId);

        if (!agency) {
            throw new HttpError(404, 'Agency not found');
        }

        if (!agency.isActive) {
            throw new HttpError(400, 'Agency is inactive');
        }

        const createdTrip = await this.tripsRepository.create({
            agencyId: input.agencyId,
            origin: input.origin,
            destination: input.destination,
            departureTime: new Date(input.departureTime),
            arrivalTime: new Date(input.arrivalTime),
            price: input.price,
            currency: input.currency ?? 'XAF',
            totalSeats: input.totalSeats,
        });

        return {
            id: createdTrip.id,
            agencyId: createdTrip.agencyId,
            agencyName: createdTrip.agency.name,
            origin: createdTrip.origin,
            destination: createdTrip.destination,
            departureTime: createdTrip.departureTime.toISOString(),
            arrivalTime: createdTrip.arrivalTime.toISOString(),
            price: createdTrip.price,
            currency: createdTrip.currency,
            totalSeats: createdTrip.totalSeats,
            availableSeats: createdTrip.availableSeats,
            status: createdTrip.status,
        };
    }
}