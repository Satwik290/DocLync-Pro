apps/client/
├── public/                # Static assets (Logos, Favicons)
├── src/
│   ├── api/               # Communication Layer
│   │   ├── axios.ts       # Central Axios instance with JWT interceptors
│   │   └── socket.ts      # Socket.io client singleton
│   ├── components/        # UI Components
│   │   ├── ui/            # Shadcn/UI raw components (Button, Card, Input)
│   │   ├── chat/          # Chat-specific UI (Sidebar, Window, Bubble)
│   │   ├── appointments/  # Booking cards and Status badges
│   │   ├── dashboard/     # Layout-specific pieces (SideNav, TopBar)
│   │   └── shared/        # Reusable custom components (Modals, Loaders)
│   ├── hooks/             # Business Logic (Custom Hooks)
│   │   ├── useAuth.ts     # Login/Logout & User session state
│   │   ├── useChat.ts     # Socket listeners & message emitting
│   │   └── useBooking.ts  # Fetching slots & managing Stripe flow
│   ├── lib/               # Utility configurations
│   │   └── utils.ts       # Shadcn's "cn" helper (Tailwind merge)
│   ├── pages/             # Route-level View components
│   │   ├── auth/          # Login.tsx, Register.tsx
│   │   ├── dashboard/     # Overview.tsx, Profile.tsx
│   │   └── chat/          # ChatPage.tsx (The main messaging view)
│   ├── store/             # Global State Management
│   │   └── useUserStore.ts# Zustand store for user/token persistence
│   ├── types/             # Frontend-specific TypeScript types
│   ├── App.tsx            # Routes & Provider wrapping
│   └── main.tsx           # Entry point
├── tailwind.config.js     # Tailwind & Shadcn theme configuration
├── components.json        # Shadcn/UI configuration file
├── tsconfig.json
└── vite.config.ts