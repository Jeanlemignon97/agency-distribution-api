
/**
 * Interface représentant les données nécessaires pour créer une réservation.
 */
export type CreateBookingInput = {
    tripId: string;
    customerName: string;
    customerPhone: string;
    seatsBooked?: number;
};

/**
 * Interface représentant les données nécessaires pour créer une réservation.
 */
export type CreatedBooking = {
    id: string;
    tripId: string;
    customerName: string;
    customerPhone: string;
    seatsBooked: number;
    status: string;
    createdAt: string;
    remainingSeats: number;
};