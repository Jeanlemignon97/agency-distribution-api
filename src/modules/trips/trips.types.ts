/**
 * Types définis pour le module des voyages (Trips).
 * Ces types sont utilisés pour valider les entrées et structurer les sorties de l'API.
 */

/**
 * Interface représentant les paramètres de recherche de voyages.
 * Utilisée principalement comme schéma de validation pour les requêtes GET.
 * 
 * @example
 * // Utilisation dans une requête : /trips?origin=Yaounde&destination=Douala
 */
export type ListTripsQuery = {
    /** Ville de départ (ex: "Yaounde") */
    origin?: string | undefined;
    /** Ville d'arrivée (ex: "Douala") */
    destination?: string | undefined;
    /** Date du voyage au format ISO YYYY-MM-DD */
    departureDate?: string | undefined;
};

/**
 * Interface représentant un voyage simplifié pour l'affichage en liste.
 * C'est le format de données renvoyé au client (Data Transfer Object).
 */
export type TripListItem = {
    /** Identifiant unique du voyage */
    id: string;
    /** Identifiant de l'agence de transport */
    agencyId: string;
    /** Nom de l'agence (ex: "Touristique Express") */
    agencyName: string;
    /** Ville de départ */
    origin: string;
    /** Ville d'arrivée */
    destination: string;
    /** Date et heure de départ (ISO String) */
    departureTime: string;
    /** Date et heure d'arrivée prévue (ISO String) */
    arrivalTime: string;
    /** Prix du ticket */
    price: number;
    /** Devise du prix (par défaut "XAF") */
    currency: string;
    /** Nombre de places encore disponibles dans le bus */
    availableSeats: number;
    /** Statut actuel du voyage (SCHEDULED, CANCELLED, COMPLETED) */
    status: string;
};