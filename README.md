# Order Management System

![Order Dashboard Screenshot](/public/cyberorder.png)

A modern order management system built with Next.js, tRPC, Prisma, PostgreSQL, and Redis. This application allows users to view, filter fulfillment orders with  caching and performance optimizations..

## Features

- **Modern Frontend**: Built with Next.js App Router, Tailwind CSS, and shadcn UI components
- **Type-Safe API**: End-to-end type safety with tRPC and Zod validation
- **Database & ORM**: PostgreSQL database with Prisma ORM
- **Performance Optimizations**:
  - Redis caching for queries
  - Debounced search inputs
  - Pagination for order listings
- **Containerization**: Docker and Docker Compose setup for easy deployment
- **CI Pipeline**: Automated testing and building with GitHub Actions

## Getting Started

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Rayyan-Shk/cyber-orders.git
   cd cyver-orders
   ```

2. Copy the environment example file:
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your database and Redis connection details:
   ```
   # Database
   DATABASE_URL="postgresql://postgres:password@localhost:5432/orderdb"
   
   # Redis
   REDIS_URL="redis://localhost:6379"
   ```

### Installation & Setup

#### Option 1: Using Docker

Start all services (Next.js app, PostgreSQL, and Redis) with a single command:

```bash
docker compose up -d
```

This will:
- Build and start the Next.js application
- Set up PostgreSQL and Redis containers
- Run Prisma migrations automatically

The application will be available at http://localhost:3000

#### Option 2: Manual Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

3. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Start the production server:
   ```bash
   npm start
   ```

## API Routes

The application uses tRPC for type-safe API routes:

- `getOrders`: Fetch orders with filtering and pagination
- `createOrder`: Create new orders with validated input
- `getOrderStats`: Get order statistics and counts by status

## Project Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── package.json
├── prisma
│   └── schema.prisma
├── .github
│   └── workflows
│       └── ci.yml
├── src
│   ├── server
│   │   ├── db
│   │   │   └── client.ts
│   │   └── trpc
│   │       ├── trpc.ts
│   │       └── router
│   │           ├── order.ts 
│   │           └── _app.
│   └── utils   └── router.ts 
│       └── trpc.ts
└── app
    ├── layout.tsx
    ├── ClientProviders.tsx
    ├── orders
    │   ├── page.tsx
    │   └── OrdersTable.tsx
    └── api
        └── trpc
            └── route.ts

```
