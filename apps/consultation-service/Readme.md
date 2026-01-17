apps/consultation-service/
├── src/
│   ├── config/              # External API Initializations
│   │   ├── cloudinary.ts    # Cloudinary setup
│   │   ├── stripe.ts        # Stripe setup
│   │   └── db.ts            # Prisma client export
│   ├── controllers/         # Request handling
│   │   ├── appointment.controller.ts  # Booking logic
│   │   ├── prescription.controller.ts # File logic
│   │   └── webhook.controller.ts      # Stripe signature verification
│   ├── middleware/          # Security
│   │   ├── auth.middleware.ts
│   │   └── role.middleware.ts
│   ├── routes/              
│   │   └── consultation.routes.ts     # Combined API routes
│   ├── services/            # Business Logic & DB Queries
│   │   ├── appointment.service.ts
│   │   ├── prescription.service.ts
│   │   └── stripe.service.ts          # Stripe helper methods
│   ├── utils/               # Helpers
│   │   └── multer.ts        # File upload config
│   └── server.ts            # Main entry point (Port 4002)
├── .env
├── package.json
└── tsconfig.json