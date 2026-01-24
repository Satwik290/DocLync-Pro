# 🏥 DocLync Pro

<div align="center">

![DocLync Pro Logo](https://img.shields.io/badge/DocLync-Pro-0066FF?style=for-the-badge&logo=hospitalcross&logoColor=white)

**A Modern Microservices-Based Healthcare Platform**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Socket.io](https://img.shields.io/badge/Socket.io-black?style=flat-square&logo=socket.io&badgeColor=010101)](https://socket.io/)

[Features](#-features) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [Documentation](#-documentation) • [Deployment](#-deployment)

---

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**DocLync Pro** is a production-ready, microservices-based healthcare platform that enables seamless doctor-patient interactions. Built with modern technologies and best practices, it provides secure authentication, real-time chat, appointment scheduling, payment processing, and prescription management.

### Why DocLync Pro?

- 🏗️ **Microservices Architecture** - Scalable and maintainable service separation
- 🔐 **Enterprise Security** - JWT authentication with HttpOnly cookies
- 💬 **Real-Time Communication** - Socket.io powered instant messaging
- 💳 **Payment Integration** - Stripe payment processing
- 📁 **Cloud Storage** - Cloudinary for medical documents
- 🎨 **Modern UI** - Beautiful, responsive React interface with Tailwind CSS

---

## ✨ Features

### 🔐 Authentication & Authorization
- ✅ Secure user registration and login
- ✅ Role-based access control (Patient, Doctor, Admin)
- ✅ JWT token management with refresh tokens
- ✅ Password hashing with Bcrypt
- ✅ Session management with HttpOnly cookies

### 💬 Real-Time Chat
- ✅ Instant messaging between doctors and patients
- ✅ Typing indicators
- ✅ Message history persistence
- ✅ Redis-backed Socket.io for horizontal scaling
- ✅ Prescription sharing in chat

### 📅 Appointment Management
- ✅ Browse available doctors by specialization
- ✅ Book appointments with preferred time slots
- ✅ View appointment history
- ✅ Status tracking (Pending, Paid, Completed)
- ✅ Integrated payment flow

### 💳 Payment Processing
- ✅ Stripe integration for secure payments
- ✅ Payment intent creation
- ✅ Payment verification
- ✅ Transaction history

### 📄 Prescription System
- ✅ Doctors can upload prescriptions
- ✅ Cloudinary storage for documents
- ✅ Patient access to prescriptions
- ✅ Diagnosis tracking

### 🎨 Modern UI/UX
- ✅ Responsive design for all devices
- ✅ Dark mode support
- ✅ Beautiful Shadcn/UI components
- ✅ Smooth animations and transitions
- ✅ Intuitive navigation

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) | UI Framework | 18.3.1 |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) | Type Safety | 5.9.3 |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) | Build Tool | 6.0.7 |
| ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) | Styling | 3.4.17 |
| ![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat) | State Management | 4.4.7 |
| ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat&logo=socket.io) | Real-time | 4.8.3 |

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) | Runtime | 20.x |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) | Web Framework | 5.2.1 |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white) | Database | 14+ |
| ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white) | ORM | Latest |
| ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white) | Cache/Pub-Sub | 6+ |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) | Authentication | - |

### Cloud & DevOps
| Technology | Purpose |
|------------|---------|
| ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white) | Media Storage |
| ![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=flat&logo=stripe&logoColor=white) | Payments |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) | Frontend Hosting |
| ![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=flat&logo=railway&logoColor=white) | Backend Hosting |

---

## 🏗 Architecture

DocLync Pro follows a **microservices architecture** with three independent backend services and a React frontend, all sharing common packages for consistency.

```mermaid
graph TB
    Client[React Client<br/>Port 5173] --> Auth[Auth Service<br/>Port 4001]
    Client --> Consult[Consultation Service<br/>Port 4002]
    Client --> Chat[Chat Service<br/>Port 4003]
    
    Auth --> DB[(PostgreSQL<br/>Database)]
    Consult --> DB
    Chat --> DB
    
    Chat --> Redis[(Redis<br/>Pub/Sub)]
    Consult --> Stripe[Stripe API]
    Consult --> Cloud[Cloudinary]
    
    Auth -.-> Common[Common Package<br/>Shared Logic]
    Consult -.-> Common
    Chat -.-> Common
    
    Auth -.-> DBPkg[Database Package<br/>Prisma Schema]
    Consult -.-> DBPkg
    Chat -.-> DBPkg
    
    style Client fill:#61DAFB
    style Auth fill:#10B981
    style Consult fill:#F59E0B
    style Chat fill:#8B5CF6
    style DB fill:#4169E1
    style Redis fill:#DC382D
    style Stripe fill:#008CDD
    style Cloud fill:#3448C5
    style Common fill:#94A3B8
    style DBPkg fill:#2D3748
```

### Service Breakdown

#### 🔐 Auth Service (Port 4001)
- User registration and login
- JWT token generation and validation
- Doctor profile management
- Role-based access control

#### 🏥 Consultation Service (Port 4002)
- Appointment booking and management
- Payment processing (Stripe)
- Prescription upload (Cloudinary)
- Doctor search and filtering

#### 💬 Chat Service (Port 4003)
- Real-time messaging (Socket.io)
- Redis adapter for scaling
- Chat history persistence
- Typing indicators

#### 🎨 Client (Port 5173)
- React SPA with TypeScript
- Zustand for state management
- Tailwind CSS + Shadcn/UI
- Real-time updates via Socket.io

---

## 📂 Project Structure

```
DocLync-Pro/
├── 📱 apps/                          # Microservices
│   ├── 🔐 auth-service/             # Port 4001
│   │   ├── src/
│   │   │   ├── controllers/         # Request handlers
│   │   │   ├── services/            # Business logic
│   │   │   ├── middleware/          # Auth & RBAC
│   │   │   ├── routes/              # API endpoints
│   │   │   └── server.ts            # Entry point
│   │   └── package.json
│   │
│   ├── 🏥 consultation-service/     # Port 4002
│   │   ├── src/
│   │   │   ├── config/              # Stripe, Cloudinary
│   │   │   ├── controllers/         # Appointments, Prescriptions
│   │   │   ├── services/            # Payment logic
│   │   │   └── server.ts
│   │   └── package.json
│   │
│   ├── 💬 chat-service/             # Port 4003
│   │   ├── src/
│   │   │   ├── config/              # Socket.io, Redis
│   │   │   ├── handlers/            # Message handlers
│   │   │   ├── services/            # Chat persistence
│   │   │   └── server.ts
│   │   └── package.json
│   │
│   └── 🎨 client/                   # Port 5173
│       ├── src/
│       │   ├── api/                 # Axios & Socket.io
│       │   ├── components/          # UI Components
│       │   ├── hooks/               # Custom hooks
│       │   ├── pages/               # Route pages
│       │   ├── store/               # Zustand store
│       │   └── types/               # TypeScript types
│       └── package.json
│
├── 📦 packages/                      # Shared Code
│   ├── database/                    # Prisma Schema
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── src/index.ts
│   │
│   └── common/                      # Shared Logic
│       └── src/
│           ├── zod/                 # Validation schemas
│           ├── types/               # Shared interfaces
│           └── middleware/          # Auth middleware
│
├── turbo.json                       # Turborepo config
├── package.json                     # Root dependencies
└── README.md                        # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- ![Node.js](https://img.shields.io/badge/Node.js-20.x+-339933?style=flat&logo=node.js&logoColor=white)
- ![npm](https://img.shields.io/badge/npm-10.x+-CB3837?style=flat&logo=npm&logoColor=white) or ![yarn](https://img.shields.io/badge/yarn-1.x+-2C8EBB?style=flat&logo=yarn&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?style=flat&logo=postgresql&logoColor=white)
- ![Redis](https://img.shields.io/badge/Redis-6+-DC382D?style=flat&logo=redis&logoColor=white)

### Installation

1️⃣ **Clone the repository**

```bash
git clone https://github.com/yourusername/doclync-pro.git
cd doclync-pro
```

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Set up environment variables**

Create `.env` files in each service:

**`apps/auth-service/.env`**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/doclync"
JWT_SECRET="your-super-secret-jwt-key"
PORT=4001
```

**`apps/consultation-service/.env`**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/doclync"
JWT_SECRET="your-super-secret-jwt-key"
STRIPE_SECRET_KEY="sk_test_..."
CLOUDINARY_CLOUD="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
PORT=4002
```

**`apps/chat-service/.env`**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/doclync"
JWT_SECRET="your-super-secret-jwt-key"
REDIS_HOST="127.0.0.1"
REDIS_PORT=6379
PORT=4003
```

**`apps/client/.env`**
```env
VITE_AUTH_API_URL=http://localhost:4001/api/auth
VITE_CONSULTATION_API_URL=http://localhost:4002/api/consultation
VITE_CHAT_API_URL=http://localhost:4003/api/chat
VITE_SOCKET_URL=http://localhost:4003
```

4️⃣ **Set up the database**

```bash
cd packages/database
npx prisma migrate dev
npx prisma generate
```

5️⃣ **Start all services**

```bash
# From root directory
npm run dev
```

This will start:
- ✅ Auth Service on `http://localhost:4001`
- ✅ Consultation Service on `http://localhost:4002`
- ✅ Chat Service on `http://localhost:4003`
- ✅ Frontend on `http://localhost:5173`

---

## 🔧 Environment Setup

<details>
<summary><b>🗄️ PostgreSQL Setup</b></summary>

### Install PostgreSQL

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download from [postgresql.org](https://www.postgresql.org/download/windows/)

### Create Database
```bash
psql -U postgres
CREATE DATABASE doclync;
\q
```
</details>

<details>
<summary><b>🔴 Redis Setup</b></summary>

**macOS:**
```bash
brew install redis
brew services start redis
```

**Ubuntu/Debian:**
```bash
sudo apt install redis-server
sudo systemctl start redis
```

**Windows:**
Use [Windows Subsystem for Linux](https://redis.io/docs/getting-started/installation/install-redis-on-windows/)

**Test Redis:**
```bash
redis-cli ping
# Should return: PONG
```
</details>

<details>
<summary><b>☁️ External Services Setup</b></summary>

### Stripe
1. Create account at [stripe.com](https://stripe.com)
2. Get test API keys from Dashboard
3. Add to `.env`: `STRIPE_SECRET_KEY=sk_test_...`

### Cloudinary
1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get credentials from Dashboard
3. Add to `.env`:
   ```
   CLOUDINARY_CLOUD=your-cloud-name
   CLOUDINARY_API_KEY=your-key
   CLOUDINARY_API_SECRET=your-secret
   ```
</details>

---

## 📚 API Documentation

### 🔐 Authentication Endpoints

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "Dr. John Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "role": "DOCTOR"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}
```

#### Get Current User
```http
GET /api/auth/me
Cookie: token=<jwt_token>
```

### 🏥 Consultation Endpoints

#### Book Appointment
```http
POST /api/consultation/book
Cookie: token=<jwt_token>
Content-Type: application/json

{
  "doctorId": "doctor-uuid",
  "date": "2026-02-01T10:00:00Z"
}
```

#### Get My Appointments
```http
GET /api/consultation/my-appointments
Cookie: token=<jwt_token>
```

#### Upload Prescription (Doctor Only)
```http
POST /api/consultation/upload-prescription
Cookie: token=<jwt_token>
Content-Type: multipart/form-data

{
  "appointmentId": "appointment-uuid",
  "diagnosis": "Common cold",
  "prescription": <file>
}
```

### 💬 Chat Endpoints

#### Get Chat List
```http
GET /api/chat/list
Cookie: token=<jwt_token>
```

### 🔌 Socket.io Events

**Client → Server:**
- `join_room` - Join appointment chat room
- `send_message` - Send a message
- `typing` - Send typing status

**Server → Client:**
- `chat_history` - Receive message history
- `receive_message` - Receive new message
- `user_typing` - Someone is typing

---

## 🚢 Deployment

### Frontend (Vercel)

1️⃣ **Push to GitHub**
```bash
git push origin main
```

2️⃣ **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your repository
- Set Root Directory: `apps/client`
- Set Framework Preset: `Vite`

3️⃣ **Add Environment Variables**
```
VITE_AUTH_API_URL=https://your-backend.railway.app/api/auth
VITE_CONSULTATION_API_URL=https://your-backend.railway.app/api/consultation
VITE_CHAT_API_URL=https://your-backend.railway.app/api/chat
VITE_SOCKET_URL=https://your-backend.railway.app
```

### Backend (Railway/Render)

1️⃣ **Create Services**
- Create 3 separate services for each backend service
- Or use a single service with multiple ports

2️⃣ **Set Environment Variables**
```
DATABASE_URL=<postgres-connection-string>
JWT_SECRET=<your-secret>
STRIPE_SECRET_KEY=<stripe-key>
CLOUDINARY_CLOUD=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
REDIS_HOST=<redis-host>
REDIS_PORT=6379
```

3️⃣ **Deploy**
```bash
# Railway
railway up

# Or Render
# Connect GitHub and configure build commands
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Prisma](https://www.prisma.io/) for the amazing ORM
- [Socket.io](https://socket.io/) for real-time capabilities
- [Shadcn/UI](https://ui.shadcn.com/) for beautiful components
- [Stripe](https://stripe.com/) for payment processing
- [Cloudinary](https://cloudinary.com/) for media management

---

## 📧 Contact

**Project Maintainer:** Your Name

- 🌐 Website: [your-website.com](https://your-website.com)
- 📧 Email: your.email@example.com
- 💼 LinkedIn: [your-profile](https://linkedin.com/in/your-profile)
- 🐙 GitHub: [@yourusername](https://github.com/yourusername)

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

**Made with ❤️ by the DocLync Pro Team**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/doclync-pro?style=social)](https://github.com/yourusername/doclync-pro)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/doclync-pro?style=social)](https://github.com/yourusername/doclync-pro)
[![GitHub watchers](https://img.shields.io/github/watchers/yourusername/doclync-pro?style=social)](https://github.com/yourusername/doclync-pro)

</div>