# Product Overview

This is a full-featured e-commerce backend API built for managing an online store. The system handles the complete e-commerce lifecycle including user management, product catalog, shopping cart, order processing, payments, and subscriptions.

## Core Features

- User authentication with role-based access (user/admin)
- Product management with inventory tracking, ratings, and reviews
- Shopping cart with real-time pricing
- Order lifecycle management (payment → processing → shipping → delivery)
- Multiple payment methods (Bkash, Nagad, Rocket, Upay) plus Stripe for subscriptions
- Address management with shipping fee calculation
- Promo code system with usage tracking
- Subscription plans with recurring billing
- Background job processing for email notifications
- Image upload via Cloudinary
- Rate limiting for API protection

## Key Business Logic

- Orders progress through states: PAYMENT_PENDING → PROCESSING → CONFIRMED → SHIPPED → DELIVERED
- Users can have multiple addresses with one marked as default
- Products have SKU generation, slug generation, and stock tracking
- Promo codes are tracked per user to prevent reuse
- Subscriptions are managed through Stripe with status tracking
- Email notifications are queued and processed asynchronously via BullMQ
