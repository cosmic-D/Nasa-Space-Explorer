# 🚀 Deployment Guide

This guide will help you deploy the NASA Space Explorer application to various platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- NASA API key (optional, uses DEMO_KEY by default)
- Git repository access

## 🔧 Local Development Setup

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Environment Configuration

```bash
# Backend environment
cd backend
cp env.example .env
# Edit .env and add your NASA API key (optional)
```

### 3. Start Development Servers

```bash
# Start both frontend and backend
npm run dev

# Or start separately:
npm run dev:frontend  # Frontend on http://localhost:3000
npm run dev:backend   # Backend on http://localhost:5000
```

## 🌐 Production Deployment

The frontend does NOT use a .env file for the backend URL. Instead, the backend API URL is set in `frontend/vite.config.ts` under the `server.proxy` configuration:

```js
// vite.config.ts
export default defineConfig({
  // ...
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // ...
})
```

### Frontend Deployment (Vercel)

1. **Connect Repository**
   - Push your code to GitHub/GitLab
   - Connect your repository to Vercel

2. **Configure Build Settings**
   ```
   Build Command: cd frontend && npm run build
   Output Directory: frontend/dist
   Install Command: npm run install:all
   ```
3. **Deploy**
   - Vercel will automatically deploy on push to main branch

### Backend Deployment (Render)

1. **Create New Web Service**
   - Connect your repository to Render
   - Choose "Web Service"

2. **Configure Build Settings**
   ```
   Build Command: cd backend && npm run build
   Start Command: cd backend && npm start
   ```

3. **Environment Variables**
   ```
   NASA_API_KEY=your_nasa_api_key
   PORT=10000
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-domain.com
   ```

4. **Deploy**
   - Render will automatically deploy on push to main branch

### Alternative: Heroku Deployment

#### Backend (Heroku)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NASA_API_KEY=your_nasa_api_key
   heroku config:set NODE_ENV=production
   heroku config:set CORS_ORIGIN=https://your-frontend-domain.com
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

#### Frontend (Netlify)

1. **Connect Repository**
   - Push code to GitHub
   - Connect repository to Netlify

2. **Build Settings**
   ```
   Build command: cd frontend && npm run build
   Publish directory: frontend/dist
   ```
## 🔐 Environment Variables

### Backend (.env)
```env
# NASA API Configuration
NASA_API_KEY=DEMO_KEY

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```
For production, set up your reverse proxy (e.g., Nginx, Vercel, Netlify) to forward `/api` requests to your backend server.

## 📊 Performance Optimization

### Frontend
- Enable Vite build optimization
- Use CDN for static assets
- Implement lazy loading for images
- Enable gzip compression

### Backend
- Enable compression middleware
- Implement caching strategies
- Use rate limiting
- Monitor API usage

## 🔍 Monitoring & Analytics

### Recommended Tools
- **Vercel Analytics** - Frontend performance
- **Render Metrics** - Backend monitoring
- **NASA API Usage** - Track API calls
- **Error Tracking** - Sentry or similar

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure CORS_ORIGIN is set correctly
   - Check frontend API URL configuration

2. **NASA API Limits**
   - Use DEMO_KEY for testing
   - Get API key from https://api.nasa.gov/
   - Monitor rate limits

3. **Build Failures**
   - Check Node.js version (18+)
   - Clear node_modules and reinstall
   - Verify TypeScript configuration

4. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names and values
   - Restart services after changes

### Support

If you encounter issues:
1. Check the logs in your deployment platform
2. Verify environment variables
3. Test locally first
4. Check NASA API status

## 📈 Scaling Considerations

### Frontend
- Use CDN for static assets
- Implement service workers for caching
- Consider SSR for better SEO

### Backend
- Implement database caching
- Use load balancers
- Monitor API rate limits
- Consider serverless functions

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm run install:all
      - run: npm run build:frontend
      # Add deployment steps

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm run install:all
      - run: npm run build:backend
      # Add deployment steps
```

---

**Happy Deploying! 🚀**

For more information, check the main [README.md](README.md) file. 