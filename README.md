# 🎯 Win11 Portfolio - Quick Start Guide

Welcome to your full-stack portfolio application! This project is now fully set up and ready for development.

## 📋 What's Been Setup

✅ **Frontend** (React + Vite)

- Located in `client/` folder
- Development server: http://localhost:5173
- Hot reload enabled
- Installed dependencies: react-router-dom, framer-motion, react-draggable, axios, prettier, eslint

✅ **Backend** (Express + MongoDB)

- Located in `server/` folder
- Development server: http://localhost:5000
- MongoDB connection ready
- Installed: express, mongoose, cors, dotenv, nodemon

✅ **Project Structure**

```
win11-portfolio/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── styles/       # CSS files
│   │   └── services/     # API client
│   └── package.json
│
├── server/               # Express backend
│   ├── routes/          # API routes
│   ├── models/          # MongoDB models
│   ├── controllers/     # Route handlers
│   ├── server.js        # Server entry point
│   ├── .env             # Configuration
│   └── package.json
│
└── SETUP_GUIDE.md       # Detailed setup documentation
```

## 🚀 Quick Start (3 Steps)

### Step 1: MongoDB Setup (Choose One)

**Option A: Local MongoDB**

- Download and install [MongoDB Community](https://www.mongodb.com/try/download/community)
- Start MongoDB service
- Default connection string is already configured in `server/.env`

**Option B: MongoDB Atlas (Cloud)**

- Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get connection string
- Update `server/.env` with your connection string

### Step 2: Start the Servers

**In Terminal 1 (Frontend):**

```bash
cd client
npm run dev
```

Frontend will be available at **http://localhost:5173**

**In Terminal 2 (Backend):**

```bash
cd server
npm run dev
```

Backend will be available at **http://localhost:5000**

### Step 3: Test the Connection

1. Open http://localhost:5173 in your browser
2. You'll see the Vite + React welcome page with a "Test API Connection" button
3. Click it to verify frontend-backend communication
4. You should see a success message with timestamp

✅ **Success!** Your full-stack app is running!

## 📚 Project Files Overview

### Frontend Key Files

- `client/src/App.jsx` - Main app component with API test button
- `client/src/services/api.js` - Axios API client configuration
- `client/vite.config.js` - Vite configuration
- `client/package.json` - Frontend dependencies

### Backend Key Files

- `server/server.js` - Express server setup with MongoDB connection
- `server/.env` - Database and server configuration
- `server/package.json` - Backend dependencies
- `server/routes/`, `server/models/`, `server/controllers/` - API structure

## 🛠️ Available Commands

### Frontend

```bash
cd client

npm run dev      # Start dev server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend

```bash
cd server

npm run dev      # Start with nodemon (auto-restart)
npm start        # Start production server
```

## 📝 Important Notes

1. **Environment Variables**
   - Backend: `server/.env` - Already configured with defaults
   - Frontend: `.env` file (optional) - Set `VITE_API_URL` if needed

2. **MongoDB Connection**
   - Update `MONGODB_URI` in `server/.env` if using MongoDB Atlas
   - Local MongoDB defaults to `mongodb://localhost:27017/win11-portfolio`

3. **CORS**
   - Already enabled on backend for frontend requests
   - Frontend runs on port 5173, backend on 5000

4. **Git**
   - Repository initialized with initial commit
   - `.gitignore` configured to exclude node_modules and .env

## 🔧 Troubleshooting

| Issue                                     | Solution                                                   |
| ----------------------------------------- | ---------------------------------------------------------- |
| "Cannot GET /api/test"                    | Backend not running. Run `npm run dev` in server/ folder   |
| "Network Error" when clicking test button | Check both servers are running, verify API URL             |
| MongoDB connection error                  | Ensure MongoDB is running, check connection string in .env |
| Port already in use                       | Change port in server/.env or kill process using port      |

## 📖 Full Documentation

For detailed information about:

- Project structure explanation
- All installed dependencies
- MongoDB setup options
- Security considerations
- Performance tips

**See: [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

## 🎨 Next Steps to Build Your Portfolio

1. **Create Components** - Build React components in `client/src/components/`
2. **Add Pages** - Create page layouts in `client/src/pages/`
3. **Design Database** - Create MongoDB models in `server/models/`
4. **Build API** - Add API routes in `server/routes/` and controllers
5. **Connect Everything** - Call APIs from components using the axios client
6. **Style** - Add CSS in `client/src/styles/` or use CSS-in-JS

## 💡 Example: Adding a New API Endpoint

**Backend** (`server/server.js`):

```javascript
app.get('/api/portfolio/projects', (req, res) => {
  res.json({ projects: [...] });
});
```

**Frontend** (`client/src/services/api.js`):

```javascript
export const api = {
  getProjects: () => apiClient.get("/portfolio/projects"),
};
```

**Component** (`client/src/components/Projects.jsx`):

```javascript
import { api } from "../services/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.getProjects().then((res) => setProjects(res.data.projects));
  }, []);

  return <div>{/* Display projects */}</div>;
}
```

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vite.dev/)
- [Express.js Docs](https://expressjs.com/)
- [Mongoose Guide](https://mongoosejs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)

## ✨ Project Status

- ✅ Backend Express server configured
- ✅ Frontend React app created
- ✅ MongoDB integration ready
- ✅ API testing capability added
- ✅ Git initialized with initial commit
- 🎯 Ready for development!

---

**You're all set! Start coding your portfolio app! 🚀**

For more details, check [SETUP_GUIDE.md](./SETUP_GUIDE.md)
