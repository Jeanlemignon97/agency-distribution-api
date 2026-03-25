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