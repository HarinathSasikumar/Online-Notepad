# Online-Notepad
A **premium full-stack Notes Management Platform** built with React, Node.js, Express, and MongoDB.  Inspired by Notion and Evernote with its own elegant identity. **A premium, high-performance Notes Management Platform built with the MERN stack.**
# SmartNotes Pro 🚀
<div align="center">
  
# ✨ SmartNotes Pro
A **premium full-stack Notes Management Platform** built with React, Node.js, Express, and MongoDB. 
Inspired by Notion and Evernote with its own elegant identity.
**A premium, high-performance Notes Management Platform built with the MERN stack.**
## Quick Start
[![React](https://img.shields.io/badge/React-18-blue.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green.svg?logo=nodedotjs)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-black.svg?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248.svg?logo=mongodb)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
</div>
<br />
**SmartNotes Pro** is a visually stunning, full-stack web application designed to give users a premium SaaS-like experience for organizing their thoughts, ideas, and tasks. Featuring a beautiful glassmorphic UI, rich animations, and robust backend architecture.
## 🚀 Key Features
- **Premium UI/UX:** Ultra-modern design featuring smooth gradients, glassmorphism, and fluid animations powered by Framer Motion.
- **Secure Authentication:** Robust user authentication system using JSON Web Tokens (JWT) and bcrypt password hashing.
- **Advanced Organization:** Keep notes categorized by custom tags, predefined categories (Work, Personal, Study, etc.), and priority levels (High, Medium, Low).
- **Color Coding:** Visually distinct notes using custom color swatches.
- **Pin & Archive:** Pin important notes to the top of your dashboard, or archive them to keep your active workspace clutter-free.
- **Instant Search & Filtering:** Real-time search by title, content, or tags. Filter by category, color, priority, and sort by creation/update dates.
- **Fully Responsive:** Flawless experience across desktop, tablet, and mobile devices.
## 🛠️ Tech Stack
### Frontend
- **Framework:** [React 18](https://reactjs.org/) powered by [Vite](https://vitejs.dev/) for lightning-fast HMR and optimized builds.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **State Management:** React Context API
- **Routing:** [React Router v6](https://reactrouter.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ORM
- **Security:** `bcryptjs` for password hashing, `jsonwebtoken` for secure stateless sessions, and `cors`.
---
## 💻 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.
### Prerequisites
- Node.js 18+
- MongoDB (local) or MongoDB Atlas connection string
### 1. Configure Environment
```bash
# Edit backend/.env and set your MongoDB URI:
MONGO_URI=mongodb://localhost:27017/smartnotes
# OR for MongoDB Atlas:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smartnotes
```
You will need the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local instance or MongoDB Atlas cluster)
### 2. Install All Dependencies
```bash
npm run install:all
```
### Installation
### 3. Start Both Servers
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/smartnotes-pro.git
   cd smartnotes-pro
   ```
2. **Install dependencies:**
   The project is configured to easily install dependencies for both the frontend and backend from the root directory.
   ```bash
   npm run install-all
   ```
3. **Configure Environment Variables:**
   Navigate to the `backend` directory, duplicate the `.env.example` file, and rename it to `.env`:
   ```bash
   cd backend
   cp .env.example .env
   ```
   Open the `.env` file and add your MongoDB connection string:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<harisasi:>:<db_password>@cluster0.mongodb.net/smartnotes?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```
### Running the Application
From the **root directory** of the project, you can start both the frontend and backend servers simultaneously with a single command:
```bash
npm run dev
```
This starts:
- **Backend API**: http://localhost:5000
- **Frontend**: http://localhost:5173
### Individual Start (alternative)
```bash
# Terminal 1 – Backend
cd backend && npm run dev
- The **Frontend** will be available at `http://localhost:5173`
- The **Backend API** will be available at `http://localhost:5000`
# Terminal 2 – Frontend  
cd frontend && npm run dev
```
---
## Tech Stack
## 📂 Project Structure
|
 Layer 
|
 Technology 
|
|
-------
|
-----------
|
|
 Frontend 
|
 React 18 + Vite 
|
|
 Styling 
|
 Tailwind CSS v4 
|
|
 Animations 
|
 Framer Motion 
|
|
 Routing 
|
 React Router v6 
|
|
 HTTP 
|
 Axios 
|
|
 Icons 
|
 React Icons 
|
|
 Toasts 
|
 React Hot Toast 
|
|
 Backend 
|
 Node.js + Express 
|
|
 Database 
|
 MongoDB + Mongoose 
|
|
 Auth 
|
 JWT + bcrypt.js 
|
|
 Dev 
|
 nodemon + concurrently 
|
```text
smartnotes-pro/
├── backend/                  # Express.js API server
│   ├── config/               # Database connection configs
│   ├── controllers/          # Route logic handlers
│   ├── middleware/           # JWT auth and error handling
│   ├── models/               # Mongoose schemas (User, Note)
│   ├── routes/               # Express API routes
│   └── server.js             # API entry point
│
├── frontend/                 # React Vite application
│   ├── src/
│   │   ├── api/              # Axios instance setup
│   │   ├── components/       # Reusable UI components (Auth, Layout, Notes, UI)
│   │   ├── context/          # React Context (AuthContext, NotesContext)
│   │   ├── pages/            # Page components (Dashboard, Login, Register, etc.)
│   │   ├── utils/            # Helper functions and constants
│   │   ├── App.jsx           # Main router and layout wrapper
│   │   └── index.css         # Global Tailwind styles
│   ├── package.json
│   └── vite.config.js
│
└── package.json              # Root package.json for concurrent scripts
```
## Features
## 🤝 Contributing
### Authentication
- ✅ JWT-based login/register
- ✅ bcrypt password hashing (salt rounds: 12)
- ✅ Protected routes with auto-redirect
- ✅ Session persistence via localStorage
Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](https://github.com/HarinathSasikumar/smartnotes-pro/issues).
### Notes
- ✅ Create, Edit, Delete notes
- ✅ Pin/Unpin important notes
- ✅ Archive/Restore notes
- ✅ Color-coded cards (10 colors)
- ✅ Categories: Work, Personal, Study, Health, Finance, Ideas, Travel, Other
- ✅ Priority: High, Medium, Low
- ✅ Tags with chip input (press Enter or comma)
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
### Search & Filter
- ✅ Real-time debounced search (title + content + tags)
- ✅ Filter by Category, Priority, Color
- ✅ Sort: Newest, Oldest, A→Z, Z→A, Priority
- ✅ Instant filter reset
## 📝 License
### UI/UX
- ✅ Premium SaaS design with Indigo color palette
- ✅ Framer Motion animations
- ✅ Skeleton loading screens
- ✅ Toast notifications (success/error)
- ✅ Empty states with animated illustrations
- ✅ Mobile-responsive with sidebar drawer
- ✅ Dark mode toggle
- ✅ FAB button on mobile
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
## API Endpoints
---
*Designed with ❤️ to make productivity beautiful.*
|
 Method 
|
 Endpoint 
|
 Description 
|
|
--------
|
----------
|
-------------
|
|
 POST 
|
 /api/auth/register 
|
 Register user 
|
|
 POST 
|
 /api/auth/login 
|
 Login 
|
|
 GET 
|
 /api/auth/me 
|
 Get current user 
|
|
 GET 
|
 /api/notes 
|
 Get all notes (search/filter) 
|
|
 POST 
|
 /api/notes 
|
 Create note 
|
|
 PUT 
|
 /api/notes/:id 
|
 Update note 
|
|
 DELETE 
|
 /api/notes/:id 
|
 Delete note 
|
|
 PATCH 
|
 /api/notes/:id/pin 
|
 Toggle pin 
|
|
 PATCH 
|
 /api/notes/:id/archive 
|
 Toggle archive 
|
