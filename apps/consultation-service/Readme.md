apps/consultation-service/
├── src/
│   ├── controllers/         # Logic for handling requests
│   │   ├── appointment.controller.ts
│   │   └── payment.controller.ts
│   ├── middleware/          # JWT and RBAC protection (Copied/Shared)
│   │   ├── auth.middleware.ts
│   │   └── role.middleware.ts
│   ├── routes/              # API Route definitions
│   │   └── consultation.routes.ts
│   ├── services/            # Database and Business logic
│   │   ├── appointment.service.ts
│   │   └── payment.service.ts
│   ├── utils/               # Third-party integrations
│   │   ├── cloudinary.ts    # Prescription storage
│   │   ├── multer.ts        # File upload handling
│   │   └── razorpay.ts      # Payment gateway config
│   └── server.ts            # Entry point (Port 4002)
├── .env                     # Secrets (Razorpay, Cloudinary, JWT)
├── package.json
└── tsconfig.json