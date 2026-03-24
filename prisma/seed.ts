import { PrismaClient, BookingStatus, TripStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    await prisma.booking.deleteMany();
    await prisma.trip.deleteMany();
    await prisma.apiKey.deleteMany();
    await prisma.agency.deleteMany();

    const touristiqueExpress = await prisma.agency.create({
        data: {
            name: 'Touristique Express',
            slug: 'touristique-express',
            email: 'contact@touristique-express.com',
            phone: '+237690000001',
            isActive: true,
        },
    });

    const bucaVoyages = await prisma.agency.create({
        data: {
            name: 'Buca Voyages',
            slug: 'buca-voyages',
            email: 'contact@bucavoyages.com',
            phone: '+237690000002',
            isActive: true,
        },
    });

    const cerisesExpress = await prisma.agency.create({
        data: {
            name: 'Cerises Express',
            slug: 'cerises-express',
            email: 'contact@cerises-express.com',
            phone: '+237690000003',
            isActive: true,
        },
    });

    const trip1 = await prisma.trip.create({
        data: {
            agencyId: touristiqueExpress.id,
            origin: 'Yaounde',
            destination: 'Douala',
            departureTime: new Date('2026-03-25T07:00:00.000Z'),
            arrivalTime: new Date('2026-03-25T11:00:00.000Z'),
            price: 8000,
            currency: 'XAF',
            totalSeats: 50,
            availableSeats: 50,
            status: TripStatus.SCHEDULED,
        },
    });

    const trip2 = await prisma.trip.create({
        data: {
            agencyId: bucaVoyages.id,
            origin: 'Yaounde',
            destination: 'Douala',
            departureTime: new Date('2026-03-25T09:00:00.000Z'),
            arrivalTime: new Date('2026-03-25T13:30:00.000Z'),
            price: 8500,
            currency: 'XAF',
            totalSeats: 45,
            availableSeats: 45,
            status: TripStatus.SCHEDULED,
        },
    });

    const trip3 = await prisma.trip.create({
        data: {
            agencyId: cerisesExpress.id,
            origin: 'Douala',
            destination: 'Yaounde',
            departureTime: new Date('2026-03-25T15:00:00.000Z'),
            arrivalTime: new Date('2026-03-25T19:30:00.000Z'),
            price: 8000,
            currency: 'XAF',
            totalSeats: 40,
            availableSeats: 40,
            status: TripStatus.SCHEDULED,
        },
    });

    const trip4 = await prisma.trip.create({
        data: {
            agencyId: touristiqueExpress.id,
            origin: 'Yaounde',
            destination: 'Bafoussam',
            departureTime: new Date('2026-03-26T06:30:00.000Z'),
            arrivalTime: new Date('2026-03-26T11:30:00.000Z'),
            price: 9000,
            currency: 'XAF',
            totalSeats: 30,
            availableSeats: 30,
            status: TripStatus.SCHEDULED,
        },
    });

    await prisma.apiKey.createMany({
        data: [
            {
                name: 'Web Comparison Partner',
                key: 'jt_test_web_partner_key',
                isActive: true,
            },
            {
                name: 'Mobile Travel App Partner',
                key: 'jt_test_mobile_partner_key',
                isActive: true,
            },
        ],
    });

    await prisma.booking.create({
        data: {
            tripId: trip1.id,
            customerName: 'Jean Demo',
            customerPhone: '+237699999999',
            seatsBooked: 1,
            status: BookingStatus.CONFIRMED,
        },
    });

    await prisma.trip.update({
        where: { id: trip1.id },
        data: {
            availableSeats: 49,
        },
    });

    await prisma.booking.create({
        data: {
            tripId: trip2.id,
            customerName: 'Alice Test',
            customerPhone: '+237688888888',
            seatsBooked: 2,
            status: BookingStatus.PENDING,
        },
    });

    await prisma.trip.update({
        where: { id: trip2.id },
        data: {
            availableSeats: 43,
        },
    });

    console.log('✅ Seed completed successfully.');
    console.log('Created agencies:', {
        touristiqueExpress: touristiqueExpress.name,
        bucaVoyages: bucaVoyages.name,
        cerisesExpress: cerisesExpress.name,
    });
    console.log('Created trips:', [trip1.id, trip2.id, trip3.id, trip4.id]);
    console.log('Created API keys:', [
        'jt_test_web_partner_key',
        'jt_test_mobile_partner_key',
    ]);
}

main()
    .catch((error) => {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });