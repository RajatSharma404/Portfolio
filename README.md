# Portfolio

A modern, interactive portfolio website built with React, Vite, and Three.js featuring a stunning 3D wireframe background and premium UI/UX design.

## ✨ Features

- **Interactive 3D Wireframe**: Dynamic icosahedron animation using React Three Fiber
- **Smooth Animations**: Powered by Framer Motion and GSAP
- **Dark/Light Mode**: Full theme support with system preference detection
- **Custom Cursor**: Interactive cursor with magnetic effects
- **Smooth Scrolling**: Lenis smooth scroll integration
- **Responsive Design**: Mobile-first approach with fluid typography
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **Accessibility**: WCAG compliant with keyboard navigation and reduced motion support

## 🚀 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Animation**: Framer Motion, GSAP
- **Routing**: React Router v7
- **Styling**: Vanilla CSS with CSS Variables
- **Smooth Scroll**: Lenis

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/portfolio-v2.git

# Navigate to project directory
cd portfolio-v2

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Build settings are automatically configured via `netlify.toml`
4. Deploy!

Or use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains your production-ready files
```

## 📁 Project Structure

```
portfolio-2.o/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Hero.jsx
│   │   ├── Hero3D.jsx
│   │   ├── Navigation.jsx
│   │   ├── CustomCursor.jsx
│   │   └── ...
│   ├── pages/           # Page components
│   │   ├── Work.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── ProjectDetail.jsx
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── netlify.toml         # Netlify configuration
└── package.json
```

## 🎨 Customization

### Colors & Theme

Edit CSS variables in `src/index.css`:

```css
:root {
  --bg-color: #fdfdfd;
  --text-primary: #0e0e0e;
  --text-secondary: #6a6a6a;
  /* ... */
}
```

### 3D Sphere Settings

Modify in `src/components/Hero3D.jsx`:

```javascript
<Icosahedron args={[1, 4]} scale={4.2} ref={meshRef}>
  <MeshDistortMaterial
    opacity={0.5}
    color="#00ffff"
    // ... other properties
  />
</Icosahedron>
```

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ by Rajat Sharma
