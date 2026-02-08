# E-Commerce Backend API

A robust, production-ready E-commerce backend API built with **Express.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**. This API provides user authentication, product management, file uploads (Cloudinary), email (SMTP), and payment integration with Stripe.

---

## 🚀 Features

- **User Authentication**: JWT-based authentication with secure password hashing (bcryptjs)
- **User Management**: User registration and login functionality
- **Role-Based Access Control**: Support for admin and user roles
- **Database ORM**: Prisma with PostgreSQL (Neon database)
- **Input Validation**: Zod schema validation for request payloads
- **Error Handling**: Comprehensive global error handling middleware
- **CORS Support**: Configured for development and production environments
- **Payment Integration**: Stripe payment processing
- **Request Logging**: Catch async errors with proper error handling
- **Admin Seeding**: Automatic admin user creation on startup
- **Graceful Shutdown**: Proper server cleanup on process termination

---

## 📋 Tech Stack

### Core Dependencies
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM for database management
- **PostgreSQL** (Neon) - Database
- **Zod** - Schema validation
- **jsonwebtoken** - JWT auth
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **Cloudinary** + `multer-storage-cloudinary` - File uploads
- **nodemailer** - SMTP email
- **cors**, **express-session** - middleware utilities

### DevDependencies
- `ts-node-dev` — development server with hot reload
- `prisma` — Prisma CLI for migrations and client generation

### Scripts

- `npm run dev` — start the dev server (`ts-node-dev --respawn --transpile-only src/server.ts`)

---

## 📁 Project Structure

```
src/
├── app.ts                          # Express app configuration
├── server.ts                       # Server entry point
├── app/
│   ├── DB/
│   │   └── connect.db.ts          # Database connection
│   ├── error/
│   │   └── custom.error.ts        # Custom error handling
│   ├── interface/
│   │   ├── login.interface.ts     # Login DTO
│   │   └── user.interface.ts      # User DTO
│   ├── lib/
│   │   └── prisma.ts              # Prisma client instance
│   ├── middleware/
│   │   ├── globalErrorHandaler.ts # Global error handler
│   │   └── validatedRequest.ts    # Request validation
│   ├── modules/
│   │   ├── admin/                 # Admin module
│   │   ├── auth/                  # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.services.ts
│   │   │   └── auth.zod.schema.ts
│   │   ├── products/              # Products module
│   │   └── user/                  # User module
│   │       ├── user.controller.ts
│   │       ├── user.routes.ts
│   │       ├── user.services.ts
│   │       └── user.zod.schema.ts
│   ├── routes/
│   │   └── index.ts               # API routes
│   └── utils/
│       ├── catchAsyncFn.ts        # Async error wrapper
│       ├── createUserToken.ts     # JWT token creation
│       ├── seedAdmin.ts           # Admin user seeding
│       └── sendResponse.ts        # Response formatting
└── config/
    └── index.ts                   # Configuration & environment variables

prisma/
├── schema.prisma                  # Database schema
└── migrations/                    # Database migration history
```

---

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(user)
  isVerified Boolean @default(false)
  isDeleted Boolean  @default(false)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  user
  admin
}
```

---

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (or Neon account)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd E-comerce
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory using `.env.example` as a template:

```env
PORT=5000
DATABASE_URL="postgresql://user:password@host/database"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASS="yourpassword"
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET="your-secret-key"
JWT_ACCESS_EXPIRES_IN="1d"
STRIPE_SECRET_KEY="your-stripe-key"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
SMTP_HOST="smtp.example.com"
SMTP_USER="your@email.com"
SMTP_PASS="smtp-password"
SMTP_PORT=465
CLIENT_URL="http://localhost:3000"
ROLE="admin"
```

### 4. Setup Database (Prisma)
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Launch Prisma Studio to view database
npx prisma studio
```

### 5. Start the Development Server
```bash
npm run dev
```

The server will start on `http://localhost:5000` (or the port specified in `.env`)

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Module (`/auth`)
- **POST** `/auth/login` - User login
  - Request: `{ email: string, password: string }`
  - Response: `{ user: User, token: string }`

### User Module (`/user`)
- **POST** `/user/register` - User registration
  - Request: `{ name: string, email: string, password: string }`
  - Response: `{ user: User, success: boolean }`

---

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication:

1. User registers via `/user/register`
2. User logs in via `/auth/login` to receive JWT token
3. Include token in `Authorization: Bearer <token>` header for protected routes
4. Token expires in 1 day (configurable via `JWT_ACCESS_EXPIRES_IN`)

### Password Security
- Passwords are hashed using **bcryptjs** with 12 salt rounds
- Never store plain text passwords in the database

---

## 📝 Request/Response Format

### Success Response
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errorSource": [
    {
      "path": "field_name",
      "message": "Specific error details"
    }
  ]
}
```

### HTTP Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request (Validation errors)
- `401` - Unauthorized
- `409` - Conflict (Duplicate value)
- `500` - Internal Server Error

---

## 🛡️ Error Handling

The application has comprehensive error handling:

1. **Zod Validation Errors** - Returns 400 with field-specific error messages
2. **Prisma Database Errors** - Handles P2002 (unique constraint) and other DB errors
3. **Async Errors** - Caught by `catchAsyncFn` wrapper function
4. **Unhandled Exceptions** - Logged and server gracefully shuts down
5. **Not Found Routes** - Returns 404 with informative message

---

## 📊 Environment Configuration

| Variable | Type | Description |
|----------|------|-------------|
| `PORT` | number | Server port (default: 5000) |
| `DATABASE_URL` | string | PostgreSQL connection string |
| `ADMIN_EMAIL` | string | Default admin email (seeding)
| `ADMIN_PASS` | string | Default admin password (seeding)
| `BCRYPT_SALT_ROUNDS` | number | Password hashing rounds (default: 12)
| `JWT_ACCESS_SECRET` | string | Secret key for JWT signing
| `JWT_ACCESS_EXPIRES_IN` | string | Token expiration (e.g., "1d", "7d")
| `STRIPE_SECRET_KEY` | string | Stripe API key for payments
| `CLOUDINARY_CLOUD_NAME` | string | Cloudinary cloud name for uploads
| `CLOUDINARY_API_KEY` | string | Cloudinary API key
| `CLOUDINARY_API_SECRET` | string | Cloudinary API secret
| `SMTP_HOST` | string | SMTP host for outgoing email
| `SMTP_USER` | string | SMTP username
| `SMTP_PASS` | string | SMTP password
| `SMTP_PORT` | number | SMTP port (465 for SSL)
| `CLIENT_URL` | string | Frontend URL for OAuth/redirects
| `ROLE` | string | Default role used by seeder (e.g. `admin`)

---

## 🧪 Development Tips

### Hot Reload
The development server uses `ts-node-dev` with `--respawn` flag for automatic hot reload on file changes.

### Type Safety
The entire project is written in TypeScript with strict type checking. Ensure all new code maintains type safety.

### Database Migrations
After modifying `schema.prisma`:
```bash
npx prisma migrate dev --name <migration_name>
```

### Prisma Studio
Visualize and manage database records:
```bash
npx prisma studio
```

---

## 🚀 Deployment

### Build for Production
```bash
npx tsc
```

### Environment Variables
Ensure all required environment variables are set in production:
- `NODE_ENV=production`
- Database credentials
- JWT secrets
- Stripe keys

### Server Startup
```bash
node dist/server.js
```

---

## 📦 CORS Configuration

By default, the API accepts requests from:
- `http://localhost:3000` (Client)
- `http://localhost:3001` (Admin Panel)

Update the `src/app.ts` file to add more origins in production.

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/feature-name`
4. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Md Hamim**  
Email: mdhamim5088@gmail.com

---

## 🆘 Support

For issues, bug reports, or feature requests, please open an issue in the repository.

---

## 🎯 Future Enhancements

- [ ] Email verification for user registration
- [ ] Password reset functionality
- [ ] Refresh token implementation
- [ ] Order management system
- [ ] Product review and ratings
- [ ] Wishlist functionality
- [ ] Shopping cart management
- [ ] Admin dashboard API endpoints
- [ ] Comprehensive API documentation (Swagger/OpenAPI)
- [ ] Unit and integration tests
- [ ] Rate limiting
- [ ] API caching strategy

---

**Last Updated**: February 7, 2026
