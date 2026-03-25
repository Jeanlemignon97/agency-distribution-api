/**
 * Schémas de validation pour le module des voyages (Trips).
 * On va valider la query avec zod
 */
import { z } from 'zod';

export const listTripsQuerySchema = z.object({
    origin: z.string().trim().min(1).optional(), // on utilise trim pour enlever les espaces et min(1) pour que le champ ne soit pas vide
    destination: z.string().trim().min(1).optional(), // on utilise trim pour enlever les espaces et min(1) pour que le champ ne soit pas vide
    departureDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'departureDate must be in YYYY-MM-DD format') // on utilise regex pour valider le format de la date
        .optional(), // on utilise optional pour que le champ soit optionnel
});

/**
 * Schéma de validation pour la création d'un voyage
 * 
 * z.string().datetime() Ça force un format ISO valide.
 * .refine(...) Ça ajoute une règle métier : 
 * l’arrivée doit être après le départ 
 */
export const createTripBodySchema = z
    .object({
        agencyId: z.string().trim().min(1),
        origin: z.string().trim().min(1),
        destination: z.string().trim().min(1),
        departureTime: z.string().datetime(),
        arrivalTime: z.string().datetime(),
        price: z.number().int().positive(),
        currency: z.string().trim().min(1).default('XAF'),
        totalSeats: z.number().int().positive(),
    })
    .refine(
        (data) => new Date(data.arrivalTime).getTime() > new Date(data.departureTime).getTime(),
        {
            message: 'arrivalTime must be after departureTime',
            path: ['arrivalTime'],
        },
    );

/**
 * Schéma de validation pour la suppression d'un voyage
 */
export const deleteTripParamsSchema = z.object({
    id: z.string().trim().min(1, 'Trip id is required'),
});