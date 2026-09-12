# 🚀 AggieCollab: Real-Time Collaborative Code Editor

AggieCollab is a full-stack, real-time collaborative code editor built for seamless pair programming and live document sharing. It features instant synchronization across multiple clients with sub-100ms latency.

## 🌐 Live Demo
- **Frontend**: [https://aggiecollab-frontend-5s1r.vercel.app/](https://aggiecollab-frontend-5s1r.vercel.app/)
- **Backend API**: [https://aggiecollab-backend.onrender.com](https://aggiecollab-backend.onrender.com)

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Monaco Editor (`@monaco-editor/react`)
- **Backend**: Node.js, Native WebSockets (`ws`), HTTP
- **Deployment**: Vercel (Frontend), Render (Backend)
- **State Management**: React Hooks (`useState`, `useRef`, `useEffect`)

## ✨ Key Features
- **Real-Time Sync**: Instantaneous text synchronization across all connected clients using persistent WebSocket connections.
- **Smart Loop Prevention**: Custom `useRef` flagging system prevents infinite update loops when receiving remote changes.
- **Room-Based Architecture**: Backend supports isolated "rooms" (e.g., `/ncat-room`), allowing multiple independent documents to be hosted on a single server.
- **Production-Ready**: Environment variable configuration, CORS-ready, and optimized for cloud hosting wake-up cycles.

## 💻 Local Development Setup
1. Clone the repositories:
   ```bash
   git clone https://github.com/cybershark08/aggiecollab-frontend.git
   git clone https://github.com/cybershark08/aggiecollab-backend.git
