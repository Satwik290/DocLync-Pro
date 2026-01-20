apps/client/
├── src/
│   ├── api/
│   │   ├── axios.ts          # Axios instances with JWT interceptors
│   │   └── socket.ts         # Socket.io client singleton
│   ├── components/
│   │   ├── ui/               # Shadcn components (Button, Card, Input, Label)
│   │   ├── chat/             # ChatSidebar, ChatWindow
│   │   └── dashboard/        # SideNav
│   ├── hooks/
│   │   ├── useAuth.ts        # Login/Signup/Logout logic
│   │   ├── useChat.ts        # Socket.io message handling
│   │   └── useBooking.ts     # Appointment booking & payment
│   ├── lib/
│   │   └── utils.ts          # cn() helper for Tailwind
│   ├── pages/
│   │   ├── auth/             # Login, Register
│   │   ├── dashboard/        # DashboardPage
│   │   ├── appointments/     # AppointmentsPage
│   │   └── chat/             # ChatPage
│   ├── store/
│   │   └── useUserStore.ts   # Zustand for global state
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── App.tsx               # Router & Protected Routes
│   ├── main.tsx              # React entry point
│   └── index.css             # Tailwind styles
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── components.json
└── tsconfig.json