import {
    BookingStatus,
    Prisma,
    PrismaClient,
    TripStatus,
} from '@prisma/client';

type CreateBookingRepositoryInput = {
    tripId: string;
    customerName: string;
    customerPhone: string;
    seatsBooked: number;
};

export class BookingsRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async createBookingWithSeatUpdate(data: CreateBookingRepositoryInput) {
        return this.prisma.$transaction(async (tx) => { // Transaction Parce que ces deux opérations doivent vivre ensemble :
            // créer la réservation
            // décrémenter le stock
            // Si l’une échoue, l’autre ne doit pas rester seule.
            const trip = await tx.trip.findUnique({
                where: { id: data.tripId },
            });

            if (!trip) {
                throw new Error('TRIP_NOT_FOUND');
            }

            if (trip.status !== TripStatus.SCHEDULED) {
                throw new Error('TRIP_NOT_BOOKABLE');
            }

            if (trip.availableSeats < data.seatsBooked) {
                throw new Error('INSUFFICIENT_SEATS');
            }

            const booking = await tx.booking.create({
                data: {
                    tripId: data.tripId,
                    customerName: data.customerName,
                    customerPhone: data.customerPhone,
                    seatsBooked: data.seatsBooked,
                    status: BookingStatus.CONFIRMED,
                },
            });

            const updatedTrip = await tx.trip.update({
                where: { id: data.tripId },
                data: {
                    availableSeats: {
                        decrement: data.seatsBooked, // Décrémente le nombre de places disponibles
                    },
                },
            });

            return {
                booking,
                updatedTrip,
            };
        });
    }
}