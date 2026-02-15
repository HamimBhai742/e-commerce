# E-Commerce Backend API

A robust, production-ready E-commerce backend API built with **Express.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**. This comprehensive API provides user authentication, product management, shopping cart, order processing, payment integration (Stripe, bKash, Nagad), file uploads (Cloudinary), email notifications (SMTP), subscription management, and admin functionality.

---

## 🚀 Features

- ✅ **User Authentication & Authorization** - JWT-based authentication with secure password hashing (bcryptjs)
- ✅ **User Management** - Registration, login, profile management with role-based access control
- ✅ **Product Catalog** - Full product management with inventory, pricing, descriptions, and featured products
- ✅ **Shopping Cart** - Add/remove products, manage quantities, calculate totals
- ✅ **Order Management** - Order creation, tracking, multiple order statuses, order history
- ✅ **Payment Integration** - Stripe API + Multiple local payment methods (bKash, Nagad, Rocket, uPay)
- ✅ **File Upload** - Cloudinary integration for product images and attachments
- ✅ **Email Notifications** - SMTP integration for transactional emails and notifications
- ✅ **User Addresses** - Multiple address management with default address selection
- ✅ **Product Reviews** - User reviews and ratings system
- ✅ **Subscription Plans** - Subscription management with multiple billing periods
- ✅ **Input Validation** - Zod schema validation for all request payloads
- ✅ **Error Handling** - Comprehensive global error handling with detailed error responses
- ✅ **CORS Support** - Configured for development and production environments
- ✅ **Admin Features** - Automatic admin user seeding on first startup
- ✅ **Database ORM** - Prisma with PostgreSQL (Neon) for type-safe database operations
- ✅ **Graceful Shutdown** - Proper server cleanup and error recovery
- ✅ **Rate Limiting** - Request rate limiting to prevent abuse
- ✅ **Queue Processing** - BullMQ integration for async job processing
- ✅ **Redis Caching** - Redis integration for session management and caching

---

## 📋 Tech Stack

### Core Dependencies
- **Express.js** (v5.2.1) - Web framework
- **TypeScript** (v5.9.3) - Type safety and modern JavaScript features
- **Prisma** (v7.3.0) - Type-safe ORM with PostgreSQL adapter
- **PostgreSQL** (Neon) - Primary database
- **Zod** (v4.3.6) - Schema validation and data parsing
- **jsonwebtoken** (v9.0.3) - JWT authentication
- **bcryptjs** (v3.0.3) - Secure password hashing
- **Stripe** (v20.3.1) - Payment processing
- **Cloudinary** (v1.41.3) + `multer-storage-cloudinary` - Cloud file uploads
- **Multer** (v2.0.2) - File upload middleware
- **Nodemailer** (v8.0.1) - SMTP email service
- **ioredis** (v5.9.2) - Redis client for caching and sessions
- **BullMQ** (v5.69.2) - Job queue processing
- **rate-limiter-flexible** (v9.1.1) - Rate limiting middleware
- **slugify** (v1.6.6) - URL-friendly slug generation
- **express-session** (v1.19.0) - Session management
- **CORS** (v2.8.6) - Cross-origin resource sharing
- **EJS** (v4.0.1) - Template engine for email templates
- **pg** (v8.18.0) - PostgreSQL client

### DevDependencies
- **ts-node-dev** (v2.0.0) - Development server with hot reload
- **@types/* packages** - TypeScript type definitions for all dependencies

### Scripts
```json
{
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
}
```

---

## 📁 Project Structure

```
e-commerce/
├── src/
│   ├── app.ts                          # Express app configuration
│   ├── server.ts                       # Server entry point
│   ├── config/
│   │   └── index.ts                    # Configuration & environment variables
│   └── app/
│       ├── DB/
│       │   └── connect.db.ts           # Database connection setup
│       ├── error/
│       │   └── custom.error.ts         # Custom error handling classes
│       ├── interface/
│       │   ├── login.interface.ts      # Login DTO
│       │   └── user.interface.ts       # User DTO
│       ├── lib/
│       │   └── prisma.ts               # Prisma client instance
│       ├── middleware/
│       │   ├── globalErrorHandaler.ts  # Global error handler
│       │   └── validatedRequest.ts     # Request validation middleware
│       ├── bullMQ/                     # Job queue configuration
│       ├── modules/
│       │   ├── address/                # User addresses module
│       │   │   ├── address.controller.ts
│       │   │   ├── address.routes.ts
│       │   │   └── address.services.ts
│       │   ├── admin/                  # Admin module
│       │   ├── auth/                   # Authentication module
│       │   │   ├── auth.controller.ts
│       │   │   ├── auth.routes.ts
│       │   │   ├── auth.services.ts
│       │   │   └── auth.zod.schema.ts
│       │   ├── cart/                   # Shopping cart module
│       │   │   ├── cart.controller.ts
│       │   │   ├── cart.routes.ts
│       │   │   └── cart.services.ts
│       │   ├── order/                  # Order management module
│       │   │   ├── order.controller.ts
│       │   │   ├── order.routes.ts
│       │   │   └── order.services.ts
│       │   ├── payment/                # Payment processing module
│       │   │   ├── payment.controller.ts
│       │   │   ├── payment.routes.ts
│       │   │   └── payment.services.ts
│       │   ├── products/               # Product management module
│       │   │   ├── products.controller.ts
│       │   │   ├── products.routes.ts
│       │   │   └── products.services.ts
│       │   ├── stripe/                 # Stripe integration module
│       │   │   ├── stripe.controller.ts
│       │   │   ├── stripe.routes.ts
│       │   │   └── stripe.services.ts
│       │   └── user/                   # User management module
│       │       ├── user.controller.ts
│       │       ├── user.routes.ts
│       │       ├── user.services.ts
│       │       └── user.zod.schema.ts
│       ├── routes/
│       │   └── index.ts                # API routes aggregator
│       └── utils/
│           ├── catchAsyncFn.ts         # Async error wrapper
│           ├── createUserToken.ts      # JWT token creation utility
│           ├── seedAdmin.ts            # Admin user seeding utility
│           └── sendResponse.ts         # Standard response formatting
├── prisma/
│   ├── schema.prisma                   # Database schema (249 lines)
│   └── migrations/                     # Database migration history
├── generated/
│   └── prisma/                         # Generated Prisma Client
├── package.json                        # Dependencies and scripts
├── tsconfig.json                       # TypeScript configuration
├── prisma.config.ts                    # Prisma CLI configuration
├── .env                                # Environment variables (not in repo)
├── E-commerce.postman_collection.json  # Postman API collection
└── README.md                           # This file
```

---

## 🗄️ Database Schema

### Core Models

#### **User Model**
```prisma
model User {
  id                String    @id @default(uuid())
  name              String
  email             String    @unique
  password          String
  role              Role      @default(user)
  status            UserStatus @default(ACTIVE)
  isVerified        Boolean   @default(false)
  isDeleted         Boolean   @default(false)
  otp               String?
  otpExpiresAt      DateTime?
  
  // Relations
  reviews           Review[]
  carts             Cart[]
  addresses         Address[]
  orders            Order[]
  payments          Payment[]
  subscriptions     UserSubscription[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@map("users")
}

enum UserStatus {
  ACTIVE
  INACTIVE
  BLOCKED
  DELETED
}

enum Role {
  user
  admin
}
```

#### **Product Model**
```prisma
model Product {
  id                String    @id @default(uuid())
  name              String
  slug              String    @unique
  description       String
  shortDescription  String?
  price             Float
  discountPrice     Float?
  sku               String    @unique
  stock             Int
  isInStock         Boolean   @default(true)
  status            String    @default("active")
  thumbnail         String
  weight            Float?
  material          String?
  rating            Float     @default(0)
  reviewCount       Int       @default(0)
  isFeatured        Boolean   @default(false)
  
  // Relations
  carts             Cart[]
  reviews           Review[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@map("products")
}
```

#### **Cart Model**
```prisma
model Cart {
  id                String    @id @default(uuid())
  productId         String
  userId            String
  quantity          Float     @default(1)
  amount            Float
  
  // Relations
  product           Product   @relation(fields: [productId], references: [id])
  user              User      @relation(fields: [userId], references: [id])
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@unique([productId, userId])
  @@map("carts")
}
```

#### **Order Model**
```prisma
model Order {
  id                String    @id @default(uuid())
  order_number      String    @unique
  total_amount      Float
  status            OrderStatus @default(PAYMENT_PENDING)
  items             String[]
  
  // Relations
  userId            String
  user              User      @relation(fields: [userId], references: [id])
  paymentId         String    @unique
  payment           Payment   @relation(fields: [paymentId], references: [id])
  addressId         String
  address           Address   @relation(fields: [addressId], references: [id])
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@map("orders")
}

enum OrderStatus {
  PROCESSING
  PAYMENT_PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
  FAILED
}
```

#### **Payment Model**
```prisma
model Payment {
  id                String    @id @default(uuid())
  status            PaymentStatus @default(PENDING)
  sub_total         Float
  
  // Relations
  userId            String
  user              User      @relation(fields: [userId], references: [id])
  onlinePayId       String?   @unique
  onlinePay         OnlinePayment? @relation(fields: [onlinePayId], references: [id])
  orders            Order[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@map("payments")
}

enum PaymentStatus {
  PENDING
  CASH
  PAID
  FAILED
  CANCELLED
  REFUNDED
}
```

#### **Address Model**
```prisma
model Address {
  id                String    @id @default(uuid())
  aptNumber         String
  aptName           String
  street            String
  sub_district      String
  district          String
  postalCode        String
  phone             String    @unique
  address           String?
  isDefault         Boolean   @default(false)
  
  // Relations
  userId            String
  user              User      @relation(fields: [userId], references: [id])
  orders            Order[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@map("address")
}
```

#### **Review Model**
```prisma
model Review {
  id                String    @id @default(uuid())
  review            String
  
  // Relations
  userId            String
  user              User      @relation(fields: [userId], references: [id])
  productId         String
  product           Product   @relation(fields: [productId], references: [id])
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@unique([productId, userId])
  @@map("reviews")
}
```

#### **Subscription Models**
```prisma
model SubscriptionPlan {
  id                String    @id @default(uuid())
  name              String
  price             Float
  currency          String
  billingPeriod     String
  features          String[]
  productId         String
  pricingId         String
  
  // Relations
  userSubscriptions UserSubscription[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@map("subscription_plans")
}

model UserSubscription {
  id                String    @id @default(uuid())
  status            SubscriptionStatus @default(INACTIVE)
  transactionId     String?
  paymentMethod     String?
  startDate         DateTime?
  endDate           DateTime?
  cancelAt          DateTime?
  
  // Relations
  userId            String
  user              User      @relation(fields: [userId], references: [id])
  planId            String
  plan              SubscriptionPlan @relation(fields: [planId], references: [id])
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@unique([userId, planId], name: "userId_planId_unique")
  @@map("user_subscriptions")
}

enum SubscriptionStatus {
  PENDING
  ACTIVE
  INACTIVE
  CANCELLED
  EXPIRED
}
```

#### **Online Payment Model**
```prisma
model OnlinePayment {
  id                String    @id @default(uuid())
  payment_method    Payment_Method
  amount            Float
  phone             String
  transactionId     String    @unique
  
  // Relations
  payments          Payment[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@map("online_payments")
}

enum Payment_Method {
  BKASH
  NAGAD
  ROCKET
  UPAY
}
```

---

## 🔧 Setup & Installation

### Prerequisites
- **Node.js** v18+ and **npm** or **yarn**
- **PostgreSQL** database (Neon recommended for cloud)
- **Redis** instance (for caching and sessions)
- **Cloudinary** account (for file uploads)
- **Stripe** account (for payment processing)
- **SMTP** email service credentials

### 1. Clone the Repository
```bash
git clone <repository-url>
cd e-commerce
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# JWT
JWT_ACCESS_SECRET="your-jwt-secret-key-min-32-chars-long"
JWT_ACCESS_EXPIRES_IN="1d"

# Admin Seeding
ADMIN_EMAIL="admin@example.com"
ADMIN_PASS="SecurePassword123!"
BCRYPT_SALT_ROUNDS=12
ROLE="admin"

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-specific-password"
SMTP_PORT=465
CLIENT_URL="http://localhost:3000"

# Cloud Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Payment (Stripe)
STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxxx"

# Redis
REDIS_HOST="redis-server.example.com"
REDIS_PORT=6379
REDIS_PASSWORD="optional-password"
```

### 4. Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) View and manage database visually
npx prisma studio
```

### 5. Start Development Server
```bash
npm run dev
```

Server will start on `http://localhost:5000`

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Module (`/auth`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/login` | User login | ❌ |
| POST | `/auth/logout` | User logout | ✅ |
| POST | `/auth/refresh` | Refresh access token | ✅ |
| POST | `/auth/verify-email` | Verify email with OTP | ❌ |
| POST | `/auth/resend-otp` | Resend OTP to email | ❌ |

### User Module (`/user`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/user/register` | User registration | ❌ |
| GET | `/user/profile` | Get user profile | ✅ |
| PATCH | `/user/profile` | Update user profile | ✅ |
| DELETE | `/user/account` | Delete user account | ✅ |
| POST | `/user/change-password` | Change password | ✅ |
| POST | `/user/forgot-password` | Request password reset | ❌ |
| POST | `/user/reset-password` | Reset password with token | ❌ |

### Products Module (`/products`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/products` | List all products (paginated) | ❌ |
| GET | `/products/:id` | Get product details | ❌ |
| GET | `/products/featured` | Get featured products | ❌ |
| GET | `/products/search?q=term` | Search products | ❌ |
| POST | `/products` | Create new product | ✅ (Admin) |
| PATCH | `/products/:id` | Update product | ✅ (Admin) |
| DELETE | `/products/:id` | Delete product | ✅ (Admin) |

### Cart Module (`/cart`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/cart` | Get user cart | ✅ |
| POST | `/cart` | Add product to cart | ✅ |
| PATCH | `/cart/:cartId` | Update cart item quantity | ✅ |
| DELETE | `/cart/:cartId` | Remove item from cart | ✅ |
| DELETE | `/cart` | Clear entire cart | ✅ |

### Order Module (`/order`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/order` | Create new order | ✅ |
| GET | `/order` | Get user orders | ✅ |
| GET | `/order/:orderId` | Get order details | ✅ |
| PATCH | `/order/:orderId/status` | Update order status | ✅ (Admin) |
| GET | `/order/admin/all` | Get all orders | ✅ (Admin) |

### Payment Module (`/payment`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/payment/initiate` | Initiate payment | ✅ |
| POST | `/payment/confirm` | Confirm payment | ✅ |
| GET | `/payment/history` | Get payment history | ✅ |
| POST | `/payment/refund/:paymentId` | Request refund | ✅ (Admin) |

### Stripe Module (`/stripe`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/stripe/checkout` | Create Stripe checkout session | ✅ |
| POST | `/stripe/webhook` | Handle Stripe webhooks | ❌ |
| GET | `/stripe/session/:sessionId` | Get session details | ✅ |

### Address Module (`/address`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/address` | Get user addresses | ✅ |
| POST | `/address` | Add new address | ✅ |
| PATCH | `/address/:addressId` | Update address | ✅ |
| DELETE | `/address/:addressId` | Delete address | ✅ |
| PATCH | `/address/:addressId/default` | Set as default address | ✅ |

### Admin Module (`/admin`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/admin/dashboard` | Dashboard statistics | ✅ (Admin) |
| GET | `/admin/users` | List all users | ✅ (Admin) |
| GET | `/admin/orders` | List all orders | ✅ (Admin) |
| GET | `/admin/payments` | List all payments | ✅ (Admin) |
| PATCH | `/admin/users/:userId` | Update user status | ✅ (Admin) |

---

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for stateless authentication:

### Authentication Flow

```
1. User Registration (/user/register)
   ↓ Validate input with Zod
   ↓ Hash password with bcryptjs (salt rounds: 12)
   ↓ Generate OTP for email verification
   ↓ Send OTP via SMTP
   ↓ Return success response

2. Email Verification (/auth/verify-email)
   ↓ Validate OTP
   ↓ Mark user as verified
   ↓ Return verification status

3. User Login (/auth/login)
   ↓ Validate credentials
   ↓ Generate JWT token (expires: 1 day)
   ↓ Set secure HTTP-only cookie (optional)
   ↓ Return token and user data

4. Protected Requests
   ↓ Include: Authorization: Bearer <token>
   ↓ Middleware verifies token
   ↓ Extract user from token claim
   ↓ Proceed to route handler
```

### Headers Required
```http
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

### Token Claims
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "role": "user",
  "status": "ACTIVE",
  "iat": 1234567890,
  "exp": 1234654290
}
```

### Password Security
- Passwords hashed using **bcryptjs** with 12 salt rounds
- No plain text passwords stored in database
- Secure password reset flow with token validation
- OTP-based verification for sensitive operations

---

## 📝 Request/Response Format

### Success Response
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": {
    // Response payload
  }
}
```

### Error Response
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errorSource": [
    {
      "path": "email",
      "message": "Invalid email format"
    },
    {
      "path": "password",
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

### HTTP Status Codes
| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET/PATCH request |
| 201 | Created | Successful POST request |
| 400 | Bad Request | Validation errors, malformed request |
| 401 | Unauthorized | Missing/invalid authentication token |
| 403 | Forbidden | User lacks required permissions |
| 404 | Not Found | Resource does not exist |
| 409 | Conflict | Duplicate entry (e.g., email already exists) |
| 422 | Unprocessable Entity | Semantic validation failure |
| 500 | Server Error | Internal server error |

---

## 🛡️ Error Handling

### Error Types & Handling

1. **Validation Errors (Zod)**
   - HTTP 400
   - Field-specific error messages
   - Detailed path information

2. **Database Errors (Prisma)**
   - P2002: Unique constraint violation → 409 Conflict
   - P2025: Record not found → 404 Not Found
   - P2003: Foreign key constraint → 400 Bad Request
   - Generic errors → 500 Internal Server Error

3. **Async Errors**
   - Wrapped with `catchAsyncFn` utility
   - Forwarded to global error handler
   - Proper error logging

4. **Authentication Errors**
   - Invalid token → 401 Unauthorized
   - Expired token → 401 Unauthorized
   - Missing authorization header → 401 Unauthorized

5. **Authorization Errors**
   - Insufficient permissions → 403 Forbidden
   - Admin-only routes → 403 Forbidden

6. **Unhandled Exceptions**
   - Process logs error
   - Server gracefully shuts down
   - Exit code: 1

---

## 📊 Environment Configuration

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `PORT` | number | 5000 | Server listening port |
| `NODE_ENV` | string | development | Environment (development/production/test) |
| `DATABASE_URL` | string | - | PostgreSQL connection string |
| `JWT_ACCESS_SECRET` | string | - | Secret key for JWT signing (min 32 chars) |
| `JWT_ACCESS_EXPIRES_IN` | string | 1d | Token expiration (e.g., "1d", "7d", "24h") |
| `ADMIN_EMAIL` | string | - | Default admin account email |
| `ADMIN_PASS` | string | - | Default admin account password |
| `BCRYPT_SALT_ROUNDS` | number | 12 | Password hash salt rounds (10-14 recommended) |
| `ROLE` | string | admin | Default role for seeded admin user |
| `SMTP_HOST` | string | - | SMTP server host |
| `SMTP_USER` | string | - | SMTP authentication username |
| `SMTP_PASS` | string | - | SMTP authentication password |
| `SMTP_PORT` | number | 465 | SMTP server port (465 for SSL, 587 for TLS) |
| `CLIENT_URL` | string | - | Frontend/client application URL |
| `CLOUDINARY_CLOUD_NAME` | string | - | Cloudinary cloud identifier |
| `CLOUDINARY_API_KEY` | string | - | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | string | - | Cloudinary API secret |
| `STRIPE_SECRET_KEY` | string | - | Stripe secret API key |
| `REDIS_HOST` | string | localhost | Redis server hostname |
| `REDIS_PORT` | number | 6379 | Redis server port |
| `REDIS_PASSWORD` | string | - | Redis password (if required) |

---

## 🧪 Development Tips

### Hot Reload Development
The development server uses **ts-node-dev** with `--respawn` flag for automatic hot reload on file changes:
```bash
npm run dev
```

### Type Safety
- Entire project written in TypeScript with strict mode enabled
- All external dependencies have type definitions
- Maintain type safety when adding new code
- Use `@types/*` packages for third-party libraries

### Database Migrations
After modifying `schema.prisma`:
```bash
# Create new migration
npx prisma migrate dev --name AddUserFieldName

# Rollback last migration (dev only)
npx prisma migrate resolve --rolled-back <migration-name>

# Reset database (dev only - removes all data!)
npx prisma migrate reset
```

### Prisma Studio
Visualize and manage database records in a web UI:
```bash
npx prisma studio
# Opens at http://localhost:5555
```

### Testing Endpoints
- Use Postman collection: `E-commerce.postman_collection.json`
- Import into Postman and set environment variables
- Test all endpoints with sample data

### Debug Mode
```bash
# Enable Node.js debugging
node --inspect=9229 dist/server.js
```

### Code Organization Best Practices
- **Modules**: Feature-based structure (auth, products, cart, etc.)
- **Controllers**: Handle HTTP request/response logic
- **Services**: Business logic and database queries
- **Routes**: Define API endpoints
- **Schemas**: Zod validation schemas
- **Utilities**: Reusable helper functions
- **Middleware**: Cross-cutting concerns (auth, validation, logging)

---

## 🚀 Deployment

### Build for Production
```bash
# Compile TypeScript
npx tsc

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate deploy
```

### Environment Setup (Production)
Ensure all required variables are set:
```env
NODE_ENV=production
PORT=8080
DATABASE_URL=<production-db-url>
JWT_ACCESS_SECRET=<strong-secret-key>
# ... all other required variables
```

### Server Startup
```bash
node dist/server.js
```

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx tsc
RUN npx prisma generate
EXPOSE 5000
CMD ["node", "dist/server.js"]
```

### Deployment Platforms
- **Vercel/Netlify**: Only for serverless APIs
- **Heroku**: Git push deployment
- **AWS EC2/ECS**: Full control, scalable
- **Railway/Render**: Modern platform-as-a-service
- **DigitalOcean App Platform**: Simple deployment
- **Self-hosted VPS**: Maximum control

### Performance Optimization
```bash
# Enable compression
npm install compression

# Use environment variable for NODE_ENV
export NODE_ENV=production

# Monitor with process manager
npm install -g pm2
pm2 start dist/server.js
```

---

## 📦 CORS Configuration

### Allowed Origins (Development)
```javascript
origin: [
  "http://localhost:3000",   // Client app
  "http://localhost:3001",   // Admin panel
]
```

### Production CORS Update
```typescript
// src/app.ts
cors({
  origin: [
    "https://yourdomain.com",
    "https://admin.yourdomain.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
})
```

---

## 🎯 Features Deep Dive

### Email Integration
- SMTP configuration with Gmail/custom providers
- Nodemailer for email sending
- EJS templates for HTML emails
- OTP generation and verification
- Password reset emails
- Order confirmation notifications

### File Upload
- Cloudinary cloud storage integration
- Multiple storage options
- Image optimization and transformation
- Automatic deletion on file update
- CDN delivery for fast loads

### Payment Processing
- **Stripe**: International credit/debit cards
- **Local Methods**: bKash, Nagad, Rocket, uPay
- Payment status tracking
- Refund handling
- Transaction history

### Job Queue
- BullMQ for async job processing
- Email sending jobs
- Notification queues
- Report generation
- Webhook processing

### Redis Caching
- Session management
- Rate limiting storage
- Cache frequently accessed data
- Pub/Sub for real-time features

---

## 🤝 Contributing

### Development Workflow
1. Create feature branch: `git checkout -b feature/your-feature-name`
2. Make changes following project structure
3. Test your changes locally: `npm run dev`
4. Commit with clear message: `git commit -m "Add your feature"`
5. Push to branch: `git push origin feature/your-feature-name`
6. Create Pull Request with description

### Code Standards
- Use TypeScript with strict mode
- Follow existing code structure
- Add JSDoc comments for functions
- Write descriptive commit messages
- Test endpoints with Postman before submitting

### Before Submitting PR
- Ensure no TypeScript errors: `npx tsc --noEmit`
- Format code: `prettier --write .`
- Update README if adding new features
- Test all related endpoints

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author & Contact

**Md Hamim**  
Email: mdhamim5088@gmail.com  
GitHub: [Your GitHub Profile]

---

## 🆘 Support & Issues

For issues, bug reports, or feature requests:
1. Check existing issues first
2. Provide detailed problem description
3. Include error messages and stack traces
4. Share steps to reproduce the issue
5. Open issue in the repository

---

## 📚 API Documentation

For detailed API documentation and interactive testing:
- **Postman Collection**: `E-commerce.postman_collection.json`
- **Swagger/OpenAPI**: (Coming soon)
- **API Reference**: (Coming soon)

---

## 🎯 Roadmap & Future Enhancements

### Current Status
- [x] User authentication & authorization
- [x] Product management
- [x] Shopping cart
- [x] Order management
- [x] Payment integration (Stripe)
- [x] File uploads
- [x] Email notifications

### Planned Features
- [ ] Email verification endpoints
- [ ] Password reset functionality  
- [ ] Refresh token implementation
- [ ] Product filtering & advanced search
- [ ] Product reviews & ratings
- [ ] Wishlist functionality
- [ ] Subscription management
- [ ] Admin dashboard APIs
- [ ] Comprehensive API documentation (Swagger/OpenAPI)
- [ ] Unit and integration tests (Jest)
- [ ] API rate limiting improvements
- [ ] Caching strategy optimization
- [ ] Multi-language support (i18n)
- [ ] Analytics & reporting
- [ ] Mobile app API considerations
- [ ] GraphQL implementation (alternative)

### Security Improvements Planned
- [ ] Two-factor authentication (2FA)
- [ ] OAuth2/Social login (Google, GitHub, Facebook)
- [ ] API key management
- [ ] Webhook signing and verification
- [ ] Audit logging
- [ ] DDoS protection

---

## 📊 Statistics

- **Total Models**: 10
- **Total Enums**: 5
- **API Endpoints**: 50+
- **TypeScript Version**: 5.9.3
- **Node Version**: 18+
- **Database**: PostgreSQL (Neon)
- **Lines of Code**: ~1000+ (excluding node_modules)

---

**Last Updated**: February 15, 2026  
**Project Status**: Active Development  
**Version**: 1.0.0
