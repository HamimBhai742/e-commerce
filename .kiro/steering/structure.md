# Project Structure

## Root Directory Layout

```
├── src/                    # Source code
├── prisma/                 # Database schema and migrations
├── generated/              # Generated Prisma client
├── node_modules/           # Dependencies
├── .kiro/                  # Kiro configuration
├── .env                    # Environment variables
└── package.json            # Project dependencies
```

## Source Code Organization (`src/`)

```
src/
├── app/
│   ├── bullMQ/            # Background job processing
│   │   ├── queues/        # Job queue definitions (mailQueues.ts)
│   │   ├── workers/       # Job worker implementations
│   │   └── init.ts        # BullMQ initialization
│   ├── DB/                # Database connection setup
│   ├── error/             # Custom error classes
│   ├── interface/         # TypeScript interfaces
│   ├── lib/               # Third-party service integrations
│   │   ├── cloudinary.ts  # Cloudinary config
│   │   ├── prisma.ts      # Prisma client instance
│   │   ├── stripe.ts      # Stripe config
│   │   └── redis/         # Redis client setup
│   ├── middleware/        # Express middleware
│   │   ├── checkAuth.ts   # JWT authentication
│   │   ├── dailyLimit.ts  # Rate limiting
│   │   ├── globalErrorHandaler.ts
│   │   └── validatedRequest.ts  # Zod validation
│   ├── modules/           # Feature modules (see below)
│   ├── routes/            # Route aggregation
│   └── utils/             # Utility functions
├── config/                # App configuration
├── app.ts                 # Express app setup
└── server.ts              # Server entry point
```

## Module Structure Pattern

Each feature module follows this consistent structure:

```
modules/{feature}/
├── {feature}.controller.ts    # Request handlers
├── {feature}.services.ts      # Business logic
├── {feature}.routes.ts        # Route definitions
└── {feature}.zod.schema.ts    # Zod validation schemas
```

### Available Modules
- `address/` - Shipping address management
- `admin/` - Admin operations
- `auth/` - Authentication (login, register, OTP, password reset)
- `cart/` - Shopping cart
- `order/` - Order processing
- `payment/` - Payment handling
- `products/` - Product catalog
- `stripe/` - Stripe subscription integration
- `user/` - User profile management

## Code Organization Conventions

### Controllers
- Use `catchAsyncFn` wrapper for async error handling
- Call service layer for business logic
- Return responses using `sendResponse` utility
- Export as object: `export const {feature}Controller = { method1, method2 }`

### Services
- Contain all business logic and database operations
- Import Prisma client from `../../lib/prisma`
- Return data directly (no response formatting)
- Export as object: `export const {feature}Service = { method1, method2 }`

### Routes
- Define Express router with endpoints
- Apply middleware (checkAuth, validatedRequest)
- Import and use controller methods
- Export default router

### Validation Schemas
- Use Zod for input validation
- Export schemas for use in `validatedRequest` middleware
- Define separate schemas for create/update operations when needed

## Middleware Usage Pattern

```typescript
router.post(
  '/endpoint',
  checkAuth('admin'),                    // Auth + role check
  validatedRequest(featureSchema),       // Zod validation
  featureController.method               // Controller
);
```

## Utility Functions Location

Common utilities in `src/app/utils/`:
- `catchAsyncFn.ts` - Async error wrapper
- `sendResponse.ts` - Standardized API responses
- `generateUniqueSlug.ts` - Slug generation
- `generateSku.ts` - SKU generation
- `verifyToken.ts` - JWT verification

## Database Schema Location

- Schema definition: `prisma/schema.prisma`
- Migrations: `prisma/migrations/`
- Generated client: `generated/prisma/` (custom location)

## Import Path Conventions

- Prisma client: `import { prisma } from '../../lib/prisma'`
- Generated types: `import { ModelName } from '../../../../generated/prisma/models'`
- Utilities: `import { util } from '../../utils/utilName'`
- Middleware: `import middleware from '../../middleware/middlewareName'`

## API Route Structure

Base URL: `/api/v1`

Routes are organized by feature:
- `/api/v1/auth/*` - Authentication
- `/api/v1/users/*` - User management
- `/api/v1/products/*` - Products
- `/api/v1/cart/*` - Shopping cart
- `/api/v1/orders/*` - Orders
- `/api/v1/payments/*` - Payments
- `/api/v1/address/*` - Addresses
- `/api/v1/subscriptions/*` - Subscriptions
- `/api/v1/admin/*` - Admin operations
