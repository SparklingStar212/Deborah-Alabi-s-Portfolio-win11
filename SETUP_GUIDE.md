# Win11 Portfolio - Full Stack Application

A modern full-stack web application built with React (Vite) frontend and Express.js backend with MongoDB integration.

## Project Structure

```
win11-portfolio/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS/styling files
│   │   ├── services/      # API services (axios)
│   │   └── App.jsx        # Main App component
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example       # Environment variables template
│
├── server/                # Express.js backend
│   ├── routes/            # API routes
│   ├── models/            # MongoDB schemas (Mongoose)
│   ├── controllers/       # Route controllers
│   ├── server.js          # Express app entry point
│   ├── package.json
│   ├── .env               # Environment variables (not in git)
│   └── .gitignore
│
├── .gitignore            # Root .gitignore
└── README.md             # This file
```

## Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (local or MongoDB Atlas cloud account)
  - Local: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Installation & Setup

### 1. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Create .env file (optional, for custom API URL)
echo "VITE_API_URL=http://localhost:5000" > .env

# Start development server
npm run dev
```

The frontend will be available at **http://localhost:5173** (Vite default port)

### 2. Backend Setup

```bash
cd server

# Install dependencies (if not already done)
npm install

# Configure MongoDB URI in .env file
# Edit .env and set MONGODB_URI to your MongoDB connection string
# Example for local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/win11-portfolio

# Start development server
npm run dev
```

The backend will be available at **http://localhost:5000**

## Running Both Frontend & Backend

**Option 1: Separate Terminals**

Terminal 1 (Frontend):

```bash
cd client
npm run dev
```

Terminal 2 (Backend):

```bash
cd server
npm run dev
```

## Available Scripts

### Frontend (`client/`)

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (`server/`)

- `npm run dev` - Start with nodemon (auto-restart on changes)
- `npm start` - Start production server

## Environment Variables

### Frontend (`.env`)

```
VITE_API_URL=http://localhost:5000
VITE_ENV=development
```

### Backend (`.env`)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/win11-portfolio
NODE_ENV=development
```

## Testing API Connection

1. Start both servers (see "Running Both Frontend & Backend" above)
2. Open http://localhost:5173 in your browser
3. Click the "Test API Connection" button on the page
4. You should see a success message with the timestamp from the backend

### Manual Testing with curl

```bash
# Test backend health
curl http://localhost:5000/health

# Test API endpoint
curl http://localhost:5000/api/test
```

## MongoDB Setup

### Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:

   ```bash
   # On Windows:
   net start MongoDB

   # On macOS (with Homebrew):
   brew services start mongodb-community
   ```

3. Update `.env` in server folder with:
   ```
   MONGODB_URI=mongodb://localhost:27017/win11-portfolio
   ```

### MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string from Atlas
4. Update `.env` in server folder:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/win11-portfolio
   ```

## Installed Dependencies

### Frontend

- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Client-side routing
- **axios** - HTTP client
- **framer-motion** - Animation library
- **react-draggable** - Drag and drop
- **vite** - Build tool
- **eslint** - Code linting
- **prettier** - Code formatting

### Backend

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-origin requests
- **dotenv** - Environment variables
- **nodemon** - Dev auto-restart

## Project Features (Ready to Build)

- ✅ Full-stack architecture setup
- ✅ React + Vite frontend with hot reload
- ✅ Express REST API backend
- ✅ MongoDB database integration
- ✅ CORS enabled for frontend-backend communication
- ✅ Environment configuration
- ✅ Git version control initialized
- ✅ ESLint + Prettier code formatting
- ✅ API test endpoint for verification

## Next Steps

1. **Create models** - Define MongoDB schemas in `server/models/`
2. **Build routes** - Create API endpoints in `server/routes/`
3. **Build components** - Create React components in `client/src/components/`
4. **Style app** - Add styles in `client/src/styles/`
5. **Test API** - Use the API test button in the frontend

## Troubleshooting

### "Cannot GET /api/test"

- Backend server is not running. Start it with `npm run dev` in the `server/` folder

### "Network Error" / "Failed to connect"

- Check that both frontend and backend are running
- Verify the `VITE_API_URL` in `.env` matches your backend URL
- Check browser console (F12) for CORS errors

### MongoDB connection error

- Ensure MongoDB is running
- Check `MONGODB_URI` in `server/.env` is correct
- For MongoDB Atlas, check IP whitelist allows your connection

## Git Workflow

The project is initialized with git. Make commits as you develop:

```bash
# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "Feature: Add new component"

# View history
git log
```

## Performance Optimization Tips

- Use Code splitting with React Router for lazy loading
- Optimize images with proper formats
- Implement API pagination for large datasets
- Use MongoDB indexes for frequent queries
- Enable gzip compression in Express

## Security Considerations

- Never commit `.env` files with real credentials
- Use environment variables for sensitive data
- Implement input validation on backend
- Use HTTPS in production
- Implement authentication/authorization
- Use helmet.js for Express security headers

## License

MIT

## Support

For issues or questions, refer to:

- [React Documentation](https://react.dev)
- [Vite Guide](https://vite.dev)
- [Express.js Documentation](https://expressjs.com)
- [Mongoose Documentation](https://mongoosejs.com)

---

**Happy Coding! 🚀**
