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
 * 
 * l’entrée est ce que le client envoie
 * la sortie est ce que ton API renvoie
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
    id: string;
    agencyId: string;
    agencyName: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    currency: string;
    availableSeats: number;
    status: string;
};

/**
 * Interface représentant les données nécessaires pour créer un voyage.
 */
export type CreateTripInput = {
    agencyId: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    currency?: string;
    totalSeats: number;
};

/**
 * Interface représentant un voyage créé.
 * C'est le format de données renvoyé au client après la création d'un voyage.
 */
export type CreatedTrip = {
    id: string;
    agencyId: string;
    agencyName: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    currency: string;
    totalSeats: number;
    availableSeats: number;
    status: string;
};