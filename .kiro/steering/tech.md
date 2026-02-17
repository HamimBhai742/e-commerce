# Tech Stack

## Runtime & Framework
- Node.js with TypeScript
- Express.js 5.x for REST API
- ts-node-dev for development with hot reload

## Database & ORM
- PostgreSQL as primary database
- Prisma ORM (v7.3.0) with custom output path: `generated/prisma`
- Prisma adapters: @prisma/adapter-neon, @prisma/adapter-pg

## Key Libraries

### Authentication & Security
- jsonwebtoken for JWT tokens
- bcryptjs for password hashing
- express-session for session management
- rate-limiter-flexible for API throttling

### Validation & Data
- Zod (v4.3.6) for schema validation and input sanitization
- http-status for standardized HTTP status codes

### Background Jobs & Caching
- BullMQ for job queues (email notifications, async tasks)
- IORedis for Redis client (caching, rate limiting, queue backend)

### Payments & Integrations
- Stripe for subscription payments
- Cloudinary for image upload and storage
- multer + multer-storage-cloudinary for file handling

### Email
- Nodemailer for sending emails
- EJS for email templates

### Utilities
- slugify for URL-friendly slugs
- cors for cross-origin requests

## Common Commands

### Development
```bash
npm run dev              # Start dev server with hot reload
```

### Database
```bash
npx prisma migrate dev   # Create and apply migration
npx prisma migrate deploy # Apply migrations (production)
npx prisma generate      # Generate Prisma client
npx prisma studio        # Open Prisma Studio GUI
```

### Prisma Client Location
Generated Prisma client is at: `generated/prisma` (not default `node_modules/.prisma`)

## Environment Variables Required
- DATABASE_URL - PostgreSQL connection string
- JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRES_IN
- SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT
- CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
- STRIPE_SECRET_KEY
- REDIS_HOST, REDIS_PORT, REDIS_PASSWORD
- ADMIN_EMAIL, ADMIN_PASS, BCRYPT_SALT_ROUNDS
