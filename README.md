# Echo Moon - AI Conversation Platform

A moonlit romance-themed web application that lets you create AI characters representing people from your past and have meaningful conversations with them.

## Features

- **Landing Page**: Beautiful moonlit theme with product introduction
- **Authentication**: Email, Google, and Apple login support
- **Character Creation**: 14 detailed fields to create authentic AI characters
- **Chat Interface**: Real-time messaging with typing indicators
- **Subscription System**: Free tier (1 character, 2 messages/day) and Pro tier (unlimited)
- **AI-Powered**: DeepSeek API integration for natural responses

## Tech Stack

### Frontend
- Vue 3 + TypeScript
- Tailwind CSS
- Pinia (State Management)
- Vue Router

### Backend
- Node.js + Express
- TypeScript
- MongoDB Atlas
- DeepSeek API

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- DeepSeek API key

### Frontend Setup

```bash
cd echomoon-web
npm install
npm run dev
```

Visit http://localhost:5173

### Backend Setup

```bash
cd echomoon-api
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and DeepSeek API key
npm run dev
```

API runs on http://localhost:3000

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_atlas_connection_string
DEEPSEEK_API_KEY=your_deepseek_api_key
JWT_SECRET=your_jwt_secret
PORT=3000
FRONTEND_URL=http://localhost:5173
```

## Deployment

### Frontend
Deploy to Vercel:
```bash
cd echomoon-web
npx vercel
```

### Backend
Deploy to Railway/Render:
1. Connect your GitHub repository
2. Set environment variables
3. Deploy

## License

MIT
