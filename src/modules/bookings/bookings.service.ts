import { PrismaClient } from '@prisma/client';
import { HttpError } from '../../shared/errors/http-error.js';
import { BookingsRepository } from './bookings.repository.js';
import type { CreateBookingInput, CreatedBooking } from './bookings.types.js';

export class BookingsService {
    private readonly bookingsRepository: BookingsRepository;

    constructor(prisma: PrismaClient) {
        this.bookingsRepository = new BookingsRepository(prisma);
    }

    async createBooking(input: CreateBookingInput): Promise<CreatedBooking> {
        try {
            const result = await this.bookingsRepository.createBookingWithSeatUpdate({
                tripId: input.tripId,
                customerName: input.customerName,
                customerPhone: input.customerPhone,
                seatsBooked: input.seatsBooked ?? 1,
            });

            return {
                id: result.booking.id,
                tripId: result.booking.tripId,
                customerName: result.booking.customerName,
                customerPhone: result.booking.customerPhone,
                seatsBooked: result.booking.seatsBooked,
                status: result.booking.status,
                createdAt: result.booking.createdAt.toISOString(),
                remainingSeats: result.updatedTrip.availableSeats,
            };
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'TRIP_NOT_FOUND') {
                    throw new HttpError(404, 'Trip not found');
                }

                if (error.message === 'TRIP_NOT_BOOKABLE') {
                    throw new HttpError(400, 'Trip is not bookable');
                }

                if (error.message === 'INSUFFICIENT_SEATS') {
                    throw new HttpError(409, 'Not enough seats available');
                }
            }

            throw error;
        }
    }
}