# Deployment Guide

## 🚀 Quick Deploy to Netlify

### Option 1: Netlify UI (Easiest)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "chore: prepare for deployment"
   git push origin main
   ```

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select your repository
   - Netlify will auto-detect settings from `netlify.toml`
   - Click "Deploy"

### Option 2: Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

### Option 3: Netlify Drop (No GitHub)

1. Build locally: `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag and drop the `dist` folder

## 📋 Pre-Deployment Checklist

- [x] All dependencies installed (`npm install`)
- [x] Build passes successfully (`npm run build`)
- [x] `.gitignore` configured
- [x] `netlify.toml` created
- [x] README.md updated
- [ ] Update project name in `package.json`
- [ ] Add your GitHub repo URL to README
- [ ] Configure custom domain (optional)

## 🔧 Environment Variables (If Needed)

If you add any API keys or secrets:

1. In Netlify dashboard → Site settings → Environment variables
2. Add your variables
3. They'll be available as `import.meta.env.VITE_YOUR_VAR`

## 🌐 Custom Domain Setup

1. In Netlify: Domain settings → Add custom domain
2. Follow DNS instructions
3. Netlify auto-provisions SSL certificate

## 📊 Performance Tips

Your site is already optimized with:
- Code splitting
- Lazy loading
- Optimized assets
- Minified CSS/JS

Expected Lighthouse scores: 90+ across all metrics!

## 🐛 Troubleshooting

**Build fails?**
- Check Node version matches (20.x)
- Run `npm install` to ensure all deps are installed
- Check for console errors in build log

**404 on refresh?**
- Netlify.toml handles SPA routing
- Redirects configured for React Router

**Slow load?**
- Check bundle size with `npm run build`
- Implement lazy loading for heavy components

## 📞 Support

Need help? Check:
- [Netlify Docs](https://docs.netlify.com)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
