# 🚀 Agency Distribution API (Travel Tech Simulation)

> A professional backend API simulating a **travel distribution platform** (inspired by Amadeus), allowing agencies to publish trips and third-party apps to consume and book them.

---

## 🌍 Project Vision

This project simulates a **B2B travel infrastructure** where:

* Transport agencies (bus, travel operators) can **publish trips**
* External applications (comparison platforms, booking apps) can **consume the API**
* End users can **search and book trips in real-time**

💡 The goal is to demonstrate how a platform like **Amadeus** or **Skyscanner backend** could be designed for emerging markets.

---

## 🧠 Key Concepts

* API-first architecture
* API key authentication
* Modular backend (Clean Architecture inspired)
* Transactional booking system
* Anti-overbooking protection
* OpenAPI / Swagger documentation

---

## ⚙️ Tech Stack

* **Node.js + TypeScript**
* **Fastify** (high-performance backend framework)
* **Prisma ORM**
* **PostgreSQL**
* **Zod** (validation)
* **Swagger / OpenAPI**
* **Docker (optional)**

---

## 🏗️ Architecture

```
src/
  config/           # Environment configuration
  modules/
    trips/          # Trips domain
    bookings/       # Booking logic (core business)
    health/         # Health & monitoring
  plugins/
    prisma.ts       # Database connection
    docs.ts         # Swagger
    error-handler.ts
  shared/
    errors/         # HttpError
    utils/
  middleware/
    require-api-key.ts
```

---

## 🔐 Authentication

All protected routes require an API key:

```
x-api-key: YOUR_API_KEY
```

Example test key (seeded):

```
jt_test_web_partner_key
```

---

## 📚 API Documentation

Swagger UI available at:

```
http://localhost:3000/docs
```

---

## 🚀 Getting Started

### 1. Clone the project

```bash
git clone https://github.com/your-username/agency-distribution-api.git
cd agency-distribution-api
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment

Create `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/agency_db"
PORT=3000
NODE_ENV=development
```

---

### 4. Run database

```bash
npx prisma migrate dev
npx prisma db seed
```

---

### 5. Start server

```bash
npm run dev
```

---

## 🔎 Core Features

---

### 1. Get Trips

```http
GET /api/v1/trips
```

Query params:

* origin
* destination
* departureDate

---

### 2. Create Trip

```http
POST /api/v1/trips
```

Body:

```json
{
  "agencyId": "xxx",
  "origin": "Yaounde",
  "destination": "Douala",
  "departureTime": "2026-03-27T06:00:00.000Z",
  "arrivalTime": "2026-03-27T10:00:00.000Z",
  "price": 8000,
  "totalSeats": 40
}
```

---

### 3. Delete Trip

```http
DELETE /api/v1/trips/:id
```

---

### 4. Create Booking (CORE FEATURE)

```http
POST /api/v1/bookings
```

Body:

```json
{
  "tripId": "xxx",
  "customerName": "Jean Bikie",
  "customerPhone": "+237699999999",
  "seatsBooked": 2
}
```

---

## 🧠 Anti-Overbooking Strategy

This project implements **atomic seat reservation logic**:

* Seat availability is updated using a **conditional database update**
* Booking only succeeds if:

```sql
availableSeats >= requestedSeats
```

* If not → `409 Conflict`

✅ Prevents double-booking in concurrent environments
✅ Database acts as the **source of truth**

---

## 🔥 Example Scenario

| Step | Action                               |
| ---- | ------------------------------------ |
| 1    | Trip has 2 seats left                |
| 2    | User A books 2 seats → ✅ success     |
| 3    | User B tries 1 seat → ❌ 409 Conflict |

---

## 🧪 Error Handling

Centralized error system:

```json
{
  "error": "Request Error",
  "message": "Not enough seats available",
  "statusCode": 409
}
```

---

## 📈 What This Project Demonstrates

* Building a **real-world scalable API**
* Designing **B2B platforms**
* Handling **concurrency issues**
* Structuring a **clean backend architecture**
* Thinking like a **product engineer**, not just a developer

---

## 🚧 Future Improvements

* Booking status: `PENDING → CONFIRMED`
* Payment integration (Stripe / Mobile Money)
* Seat hold system (temporary reservation)
* API rate limiting
* API key scopes (read/write/admin)
* Caching (Redis)
* Webhooks for external systems

---

## 💡 Inspiration

This project is inspired by:

* Travel distribution systems (GDS)
* Platforms like Amadeus, Skyscanner
* Real-world constraints in emerging markets (manual agencies, no APIs)

---

## 👨‍💻 Author

Jean BIKIE MBIDA
Flutter Developer 

---

## ⭐ Why This Project Matters

This is not just a CRUD API.

It is a **simulation of a real business problem**:

> How do you digitize fragmented transport agencies and expose them through a scalable API?

---
