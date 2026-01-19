apps/chat-service/
├── src/
│   ├── config/              # Infrastructure
│   │   ├── redis.ts         # Redis Pub/Sub setup
│   │   └── socket.ts        # Socket.io Server initialization
│   ├── constants/           # Typo-prevention
│   │   └── events.ts        # CHAT_MESSAGE, JOIN_ROOM, etc.
│   ├── handlers/            # The "Controllers" for Sockets
│   │   ├── index.ts         # Main connection aggregator
│   │   └── message.handler.ts # Chat logic
│   ├── middleware/          # Security
│   │   └── auth.socket.ts   # JWT validation for handshakes
│   ├── services/            # Business Logic & Persistence
│   │   └── chat.service.ts  # Database calls via Prisma
│   └── server.ts            # Entry point (Port 4003)
├── .env
├── package.json
└── tsconfig.json