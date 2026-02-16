# E-Commerce Backend API

A full-featured e-commerce backend built with Node.js, Express, TypeScript, Prisma, and PostgreSQL. This API provides comprehensive functionality for managing products, orders, payments, subscriptions, and user authentication.

## Features

- **User Management**: Registration, authentication, profile management with role-based access control
- **Product Management**: CRUD operations, inventory tracking, ratings, and reviews
- **Shopping Cart**: Add/remove items, quantity management, real-time pricing
- **Order Processing**: Complete order lifecycle from creation to delivery
- **Payment Integration**: 
  - Multiple payment methods (Bkash, Nagad, Rocket, Upay)
  - Stripe integration for subscriptions
  - Payment status tracking
- **Address Management**: Multiple shipping addresses with default selection
- **Subscription Plans**: Recurring billing with Stripe
- **Promo Codes**: Discount management and usage tracking
- **Email Notifications**: Automated emails using BullMQ and Nodemailer
- **Image Upload**: Cloudinary integration for product images
- **Rate Limiting**: Redis-based request throttling
- **Security**: JWT authentication, bcrypt password hashing, input validation with Zod

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis (IORedis)
- **Queue**: BullMQ for background jobs
- **Payment**: Stripe
- **File Upload**: Cloudinary
- **Email**: Nodemailer with EJS templates
- **Validation**: Zod
- **Authentication**: JWT + bcrypt

## Project Structure

```
src/
├── app/
│   ├── bullMQ/           # Background job processing
│   │   ├── queues/       # Job queues (email, etc.)
│   │   └── workers/      # Job workers
│   ├── DB/               # Database connection
│   ├── error/            # Custom error handlers
│   ├── interface/        # TypeScript interfaces
│   ├── lib/              # Third-party integrations
│   │   ├── cloudinary.ts
│   │   ├── prisma.ts
│   │   ├── stripe.ts
│   │   └── redis/
│   ├── middleware/       # Express middleware
│   │   ├── checkAuth.ts
│   │   ├── dailyLimit.ts
│   │   ├── globalErrorHandaler.ts
│   │   └── validatedRequest.ts
│   ├── modules/          # Feature modules
│   │   ├── address/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── cart/
│   │   ├── order/
│   │   ├── payment/
│   │   ├── products/
│   │   ├── stripe/
│   │   └── user/
│   ├── routes/           # API routes
│   └── utils/            # Utility functions
├── config/               # Configuration
├── app.ts               # Express app setup
└── server.ts            # Server entry point
```

## Database Schema

The application uses the following main models:

- **User**: User accounts with roles (user/admin)
- **Product**: Product catalog with inventory
- **Cart**: Shopping cart items
- **Order**: Order management
- **Payment**: Payment tracking
- **OnlinePayment**: Mobile payment details
- **Address**: Shipping addresses
- **Review**: Product reviews
- **SubscriptionPlan**: Subscription offerings
- **UserSubscription**: User subscription records
- **PromoCode**: Discount codes
- **UsedPromo**: Promo code usage tracking

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Redis server
- Cloudinary account
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:

```env
PORT=5000

# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Admin Credentials
ADMIN_EMAIL="admin@example.com"
ADMIN_PASS="your-secure-password"
BCRYPT_SALT_ROUNDS=12
ROLE="admin"

# JWT
JWT_ACCESS_SECRET="your-jwt-secret"
JWT_ACCESS_EXPIRES_IN="1d"

# SMTP Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_PORT="465"

# Client URL
CLIENT_URL="http://localhost:5000/api/v1/auth"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"

# Redis
REDIS_HOST="your-redis-host"
REDIS_PORT=6379
REDIS_PASSWORD="your-redis-password"
```

4. Run database migrations:
```bash
npx prisma migrate deploy
```

5. Generate Prisma client:
```bash
npx prisma generate
```

### Running the Application

Development mode:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

Base URL: `http://localhost:5000/api/v1`

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/verify-otp` - Verify OTP
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password

### Users
- `GET /users/profile` - Get user profile
- `PATCH /users/profile` - Update profile
- `GET /users` - Get all users (admin)

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (admin)
- `PATCH /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

### Cart
- `GET /cart` - Get user cart
- `POST /cart` - Add item to cart
- `PATCH /cart/:id` - Update cart item
- `DELETE /cart/:id` - Remove from cart

### Orders
- `GET /orders` - Get user orders
- `GET /orders/:id` - Get order details
- `POST /orders` - Create order
- `PATCH /orders/:id` - Update order status (admin)

### Payments
- `POST /payments` - Process payment
- `GET /payments/:id` - Get payment details

### Address
- `GET /address` - Get user addresses
- `POST /address` - Add new address
- `PATCH /address/:id` - Update address
- `DELETE /address/:id` - Delete address

### Subscriptions
- `GET /subscriptions/plans` - Get subscription plans
- `POST /subscriptions/subscribe` - Subscribe to plan
- `POST /subscriptions/cancel` - Cancel subscription

### Admin
- `GET /admin/dashboard` - Admin dashboard stats
- `GET /admin/users` - Manage users
- `PATCH /admin/users/:id/status` - Update user status

## Features in Detail

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (User/Admin)
- OTP verification for email
- Password reset functionality
- Secure password hashing with bcrypt

### Payment Processing
- Multiple mobile payment methods (Bkash, Nagad, Rocket, Upay)
- Stripe integration for subscriptions
- Payment status tracking
- Transaction history

### Order Management
- Order lifecycle: Payment Pending → Processing → Confirmed → Shipped → Delivered
- Order cancellation and refunds
- Shipping fee calculation
- Order history tracking

### Background Jobs
- Email notifications using BullMQ
- Asynchronous job processing
- Job failure handling and retries

### Rate Limiting
- Redis-based rate limiting
- Daily request limits per user
- Protection against abuse

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation using Zod schemas
- CORS configuration
- Environment variable protection
- SQL injection prevention (Prisma ORM)

## Error Handling

- Global error handler middleware
- Custom error classes
- Async error catching
- Detailed error responses in development
- User-friendly error messages in production

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email mdhamim5088@gmail.com or open an issue in the repository.
