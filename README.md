# 🚀 NASA Space Explorer

A comprehensive web application that showcases NASA's vast collection of space data through interactive visualizations and modern UI design. Built with React, Node.js, and TypeScript.

![NASA Space Explorer](https://img.shields.io/badge/NASA-Space%20Explorer-cosmic-pink?style=for-the-badge&logo=rocket)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript)

## ✨ Features

### 🌌 **Astronomy Picture of the Day (APOD)**
- Daily stunning astronomical images and videos
- Detailed explanations and metadata
- Historical date browsing
- High-resolution image viewing

### 🪐 **Mars Rover Photos**
- Real-time photos from Curiosity, Perseverance, and other rovers
- Filter by camera type and date
- Rover mission information
- Interactive photo galleries

### ☄️ **Near Earth Objects (NEO)**
- Real-time asteroid tracking
- Close approach data visualization
- Hazard assessment indicators
- Interactive charts and statistics

### 🌍 **EPIC Earth Images**
- Daily Earth images from DSCOVR satellite
- Natural and enhanced color views
- Satellite positioning data
- Time-lapse capabilities

### 🔍 **NASA Image & Video Library**
- Search through NASA's vast media collection
- Advanced filtering options
- High-quality downloads
- Metadata exploration

### 📊 **Interactive Visualizations**
- Real-time data charts
- Responsive design
- Smooth animations
- Mobile-optimized interface

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Query** - Data fetching and caching
- **Recharts** - Data visualization
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **Axios** - HTTP client
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- NASA API key (optional, uses DEMO_KEY by default)

## ⚡ Setup & Run (Local Development)

### 1. Clone the repository
```bash
git clone <repository-url>
cd nasa-space-explorer
```

### 2. Install dependencies
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 3. Configure environment variables
```bash
cd backend
cp env.example .env
# Edit .env and add your NASA API key (optional)
```

### 4. Start the project
```bash
# Start both frontend and backend together (from project root)
npm run dev

# Or start separately:
npm run dev:frontend  # Frontend on http://localhost:3000
npm run dev:backend   # Backend on http://localhost:5000
```

## 📁 Project Structure

```
nasa-space-explorer/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript interfaces
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js backend server
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── services/       # NASA API service
│   │   ├── middleware/     # Express middleware
│   │   └── types/          # TypeScript interfaces
│   ├── dist/               # Compiled JavaScript
│   └── package.json
├── package.json            # Root package.json
└── README.md
```

## 🌐 API Endpoints

### Backend Routes
- `GET /api/nasa/dashboard` - Dashboard data (multiple sources)
- `GET /api/nasa/apod` - Astronomy Picture of the Day
- `GET /api/nasa/mars-rover` - Mars Rover photos
- `GET /api/nasa/mars-rovers` - Available Mars rovers
- `GET /api/nasa/neo` - Near Earth Objects
- `GET /api/nasa/epic` - EPIC Earth images
- `GET /api/nasa/search` - NASA Image & Video Library search
- `GET /health` - Health check endpoint

### NASA APIs Used
- [Astronomy Picture of the Day](https://api.nasa.gov/#apod)
- [Mars Rover Photos](https://api.nasa.gov/#mars-rover-photos)
- [Near Earth Object Web Service](https://api.nasa.gov/#neows-feed)
- [EPIC](https://api.nasa.gov/#epic)
- [NASA Image and Video Library](https://api.nasa.gov/#search-assets)

## 🎨 Design Features

### **Space-Themed UI**
- Cosmic color palette (pinks, purples, cyans)
- Glass morphism effects
- Smooth animations and transitions
- Responsive design for all devices

### **Interactive Elements**
- Hover effects and micro-interactions
- Loading states and error handling
- Infinite scroll and pagination
- Real-time data updates

### **Accessibility**
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Render/Heroku)
```bash
cd backend
npm run build
# Deploy with environment variables
```

### Environment Variables
```env
# Backend
NASA_API_KEY=your_nasa_api_key
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com

# Frontend
VITE_API_URL=https://your-backend-domain.com/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NASA Open APIs](https://api.nasa.gov/) for providing the data
- [NASA](https://www.nasa.gov/) for inspiring space exploration
- The open-source community for amazing tools and libraries

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ for space exploration**

*"The universe is not only stranger than we imagine, it is stranger than we can imagine." - Arthur Eddington* 