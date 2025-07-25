# 🚀 Deployment Guide - Zenaris CareMate

This guide will help you deploy the Zenaris CareMate application to Vercel or Netlify for the coding challenge submission.

## 📋 Pre-Deployment Checklist

- ✅ Application builds without errors (`npm run build`)
- ✅ All TypeScript types are correct (`npm run type-check`)
- ✅ ESLint passes (`npm run lint`)
- ✅ Application runs locally (`npm run dev`)

## 🌐 Option 1: Vercel Deployment (Recommended)

Vercel is the recommended platform as it's built by the creators of Next.js and has excellent React support.

### Method A: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: complete Zenaris CareMate interface"
   git push origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure settings:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - Click "Deploy"

3. **Automatic Deployments**
   - Every push to main branch will trigger automatic deployment
   - Preview deployments for pull requests

### Method B: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Follow prompts**
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: zenaris-caremate-interface
   - Directory: ./
   - Override settings: No

## 🌐 Option 2: Netlify Deployment

### Method A: GitHub Integration

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "feat: complete Zenaris CareMate interface"
   git push origin main
   ```

2. **Deploy via Netlify Dashboard**
   - Visit [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and authorize
   - Select your repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Click "Deploy site"

### Method B: Drag & Drop

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder to the deploy area
   - Your site will be live immediately

### Method C: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

## 🔧 Build Configuration

The project is already configured for deployment with these settings:

### Vite Configuration (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
})
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "type-check": "tsc --noEmit"
  }
}
```

## 🌍 Custom Domain (Optional)

### Vercel Custom Domain
1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

### Netlify Custom Domain
1. Go to site settings
2. Click "Domain management"
3. Add custom domain
4. Configure DNS records as instructed

## 🔍 Environment Variables

This project doesn't require any environment variables, making deployment straightforward.

## 📊 Performance Optimization

The build is already optimized with:
- **Tree shaking** for smaller bundle size
- **Code splitting** for faster loading
- **Minification** for production
- **Modern ES modules** for better performance

## 🐛 Troubleshooting

### Common Issues

1. **Build fails with TypeScript errors**
   ```bash
   npm run type-check
   # Fix any TypeScript errors and try again
   ```

2. **Build fails with ESLint errors**
   ```bash
   npm run lint
   # Fix linting issues and try again
   ```

3. **404 errors on refresh**
   - Add `_redirects` file for Netlify:
     ```
     /*    /index.html   200
     ```
   - Vercel handles this automatically

4. **Large bundle size**
   - Check bundle analyzer: `npm run build -- --analyze`
   - Consider code splitting if needed

## 📝 Submission Checklist

For the Zenaris coding challenge submission:

- ✅ **Live demo link**: Copy the deployed URL
- ✅ **GitHub repository**: Ensure it's public and accessible
- ✅ **README.md**: Comprehensive documentation included
- ✅ **Clean code**: No console errors or warnings
- ✅ **Responsive design**: Works on mobile and desktop
- ✅ **Accessibility**: WCAG compliant
- ✅ **Professional appearance**: Healthcare-appropriate styling

## 🎯 Final Steps

1. **Test the deployed application**
   - Check all functionality works
   - Test on different devices
   - Verify export functionality

2. **Update README.md**
   - Replace placeholder URL with actual deployment URL
   - Update GitHub repository link

3. **Submit**
   - Live demo link: `https://your-app.vercel.app`
   - GitHub repository: `https://github.com/your-username/zenaris-caremate-interface`

## 📞 Support

If you encounter any deployment issues:
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Vite**: [vitejs.dev/guide](https://vitejs.dev/guide)

---

**Good luck with your deployment! 🚀**
