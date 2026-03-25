import { z } from 'zod';

/**
 * Schéma de validation pour la création d'une réservation.
 * max(10) ?
 * on évite qu’un client réserve 500 places par erreur
 */
export const createBookingBodySchema = z.object({
    tripId: z.string().trim().min(1),
    customerName: z.string().trim().min(2),
    customerPhone: z.string().trim().min(6),
    seatsBooked: z.number().int().positive().max(10).default(1),
});