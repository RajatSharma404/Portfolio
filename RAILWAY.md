# Railway Deployment Guide

## 🚂 Deploy to Railway

### Method 1: Railway Dashboard (Recommended)

1. **Push to GitHub** (if not already done):

   ```bash
   git add .
   git commit -m "chore: add Railway configuration"
   git push origin main
   ```

2. **Deploy on Railway**:

   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository: `RajatSharma404/Portfolio`
   - Railway will auto-detect the configuration

3. **Configure Environment** (if needed):

   - Go to your project → Variables
   - Add: `NODE_ENV=production`

4. **Get Your URL**:
   - Go to Settings → Generate Domain
   - Your site will be live at: `https://your-project.up.railway.app`

### Method 2: Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to existing project (or create new)
railway link

# Deploy
railway up
```

### Method 3: Docker Deployment

```bash
# Railway will automatically detect and use the Dockerfile
# Just push your code and Railway handles the rest
```

## 📋 Configuration Files

- ✅ `package.json` - Updated with `start` script using `serve`
- ✅ `railway.json` - Railway build and deploy configuration
- ✅ `nixpacks.toml` - Nixpacks build configuration
- ✅ `Dockerfile` - Optional Docker configuration

## 🔧 Environment Variables

Railway will automatically set:

- `PORT` - The port your app should listen on (Railway assigns this)
- `NODE_ENV` - Set to `production`

## 🧪 Test Locally

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start production server
npm start
```

Visit: http://localhost:3000

## 📝 Notes

- Railway automatically detects Node.js apps
- The app uses `serve` to host the static build
- SPA routing is handled by the `-s` flag in serve
- Port 3000 is used by default (Railway will override with $PORT)

## 🔄 Auto-Deploy

Railway automatically deploys when you push to your main branch on GitHub.

## 💰 Pricing

- Railway offers a free tier with:
  - $5 of usage per month
  - 500 hours of execution time
  - Perfect for portfolio sites!
