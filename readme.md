# 🏠 RentNest Backend API

A modern, scalable REST API for a comprehensive property rental management platform built with **TypeScript**, **Node.js**, and **Express.js**.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Express](https://img.shields.io/badge/Express-5+-black)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Project Overview

RentNest Backend is a fully-featured property rental API that enables users to list properties, submit rental requests, process payments, and leave reviews. It includes comprehensive admin management, user authentication, and payment integration with **Stripe** and **SSLCommerz**.

**Live API**: [https://rentnest-api.vercel.app](https://rentnest-api.vercel.app)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js (v18+) |
| **Language** | TypeScript |
| **Framework** | Express.js |
| **Database** | PostgreSQL + Prisma ORM |
| **Validation** | Zod |
| **Authentication** | JWT (JSON Web Tokens) |
| **HTTP Status** | http-status |
| **Build Tool** | tsup |
| **Deployment** | Vercel |
| **Payment** | Stripe & SSLCommerz |

---

## ✨ Features

### 🔐 Authentication
- ✅ User registration with email validation
- ✅ JWT-based login system
- ✅ User profile management
- ✅ Role-based access control (Tenant, Landlord, Admin)

### 🏘️ Property Management
- ✅ Browse all properties with advanced filtering (location, price, type)
- ✅ View detailed property information
- ✅ Property categories management
- ✅ Landlord property CRUD operations
- ✅ Property availability tracking
- ✅ Amenities management

### 🔄 Rental Management
- ✅ Submit rental requests
- ✅ Track rental request status
- ✅ Landlord approval/rejection system
- ✅ Rental history tracking

### 💳 Payment Processing
- ✅ Create payment intents
- ✅ Multiple payment method support (Stripe, SSLCommerz)
- ✅ Payment confirmation & verification
- ✅ Payment history tracking
- ✅ Webhook integration

### ⭐ Reviews & Ratings
- ✅ Post reviews after completed rentals
- ✅ Rating system for properties

### 👨‍💼 Admin Dashboard
- ✅ User management (view, ban/unban users)
- ✅ Property oversight
- ✅ Rental request monitoring
- ✅ Payment management

---

## 📋 API Endpoints

### Authentication
```
POST   /api/auth/register     Register new user
POST   /api/auth/login        Login user
GET    /api/auth/me           Get user profile
```

### Properties (Public)
```
GET    /api/properties        Get all properties with filters
GET    /api/properties/:id    Get property details
GET    /api/categories        Get all property categories
```

### Landlord Management
```
POST   /api/landlord/properties            Create property listing
PUT    /api/landlord/properties/:id        Update property listing
DELETE /api/landlord/properties/:id        Remove property listing
GET    /api/landlord/properties/availability/:id  Check availability
GET    /api/landlord/requests              Get rental requests
PATCH  /api/landlord/requests/:id          Approve/reject requests
```

### Rental Requests
```
POST   /api/rentals           Submit rental request
GET    /api/rentals           Get user's rental requests
GET    /api/rentals/:id       Get rental request details
```

### Payments
```
POST   /api/payments/create   Create payment intent
POST   /api/payments/confirm  Confirm payment
GET    /api/payments          Get payment history
GET    /api/payments/:id      Get payment details
```

### Reviews
```
POST   /api/reviews           Create review (after completed rental)
```

### Admin
```
GET    /api/admin/users       Get all users
PATCH  /api/admin/users/:id   Update user status
GET    /api/admin/properties  Get all properties
GET    /api/admin/rentals     Get all rental requests
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** package manager
- **PostgreSQL** database
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/rentnest-backend.git
cd rentnest-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/rentnest

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# SSLCommerz
SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASSWORD=your_store_password

# Server
PORT=3000
NODE_ENV=development
```

4. **Setup Prisma**
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

5. **Start the development server**
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

---

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` folder using **tsup**.

### Test Production Build Locally
```bash
npm run start
```

### Deploy to Vercel
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

The project includes `vercel.json` configuration for seamless Vercel deployment.

---

## 📁 Project Structure

```
src/
├── app.ts                 # Express app setup
├── server.ts              # Server entry point
├── config/                # Configuration files
├── errorHelper/           # Error handling utilities
├── lib/                   # Library functions (Prisma client)
├── middlewares/           # Express middlewares
│   ├── auth.ts           # Authentication middleware
│   ├── globalErrorHandler.ts
│   ├── validateRequest.ts
│   └── notFound.ts
├── modules/              # Feature modules
│   ├── admin/
│   ├── auth/
│   ├── categories/
│   ├── landlord/
│   ├── payments/
│   ├── properties/
│   ├── rentals/
│   └── reviews/
├── router/               # Route definitions
├── types/                # TypeScript types
└── utils/                # Utility functions

prisma/
├── schema/               # Prisma schema files (modular)
└── migrations/           # Database migrations
```

---

## 🔒 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/rentnest` |
| `JWT_SECRET` | Secret key for JWT signing | `super_secret_key_123` |
| `JWT_EXPIRES_IN` | JWT expiration time | `7d` |
| `STRIPE_SECRET_KEY` | Stripe API secret key | `sk_test_...` |
| `SSLCOMMERZ_STORE_ID` | SSLCommerz store ID | `test_store_id` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` \| `production` |

---

## 📚 Documentation

- **API Docs**: [Postman Collection](https://documenter.getpostman.com/view/xxx)
- **Database Schema**: See `/prisma/schema/`
- **Error Handling**: See `/src/errorHelper/`

---

## 🧪 Testing

```bash
# Run tests (if configured)
npm run test
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👨‍💻 Author

**Your Name** - [GitHub Profile](https://github.com/your-username)

---

## 📞 Support

For support, email `admin@gmail.com` or open an issue on GitHub.

---

## 🗓️ Deadline

**Project Deadline**: July 09, 2026, 11:59 PM

---

<div align="center">

Made with ❤️ for RentNest

⭐ If you find this helpful, please consider giving it a star!

</div>
