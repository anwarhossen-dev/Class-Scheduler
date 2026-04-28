# 🚀 Deployment Guide - Class Scheduler

## Deploy to Production

### Option 1: Deploy to Netlify (Easiest)

#### Step 1: Build the Project
```bash
cd "Class Scheduler"
npm run build
```
This creates a `dist/` folder with production-ready files.

#### Step 2: Connect to Netlify

**Option A: Using Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

**Option B: Using Netlify Dashboard**
1. Go to [netlify.com](https://netlify.com)
2. Sign up or login
3. Click "Add new site" → "Deploy manually"
4. Drag and drop the `dist/` folder
5. Site will be live immediately!

#### Step 3: Custom Domain (Optional)
1. In Netlify dashboard, go to Domain settings
2. Add your custom domain
3. Configure DNS settings as instructed

---

### Option 2: Deploy to Vercel

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
vercel login
```

#### Step 2: Deploy
```bash
cd "Class Scheduler"
vercel
```

Follow the prompts:
- Select current directory as root
- Confirm default settings
- Done! Your app is live!

#### Step 3: Auto-Deploy (Optional)
Connect your GitHub repo for automatic deployments on every push.

---

### Option 3: Deploy to GitHub Pages

#### Step 1: Build the Project
```bash
cd "Class Scheduler"
npm run build
```

#### Step 2: Upload to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/class-scheduler.git
git push -u origin main
```

#### Step 3: Enable GitHub Pages
1. Go to repository Settings
2. Navigate to Pages section
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Click Save

Your site will be available at: `https://YOUR_USERNAME.github.io/class-scheduler`

---

### Option 4: Deploy to Docker

#### Step 1: Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Step 2: Build Docker Image
```bash
docker build -t class-scheduler .
```

#### Step 3: Run Container
```bash
docker run -p 80:80 class-scheduler
```

Access at `http://localhost:80`

---

### Option 5: Self-Hosted (VPS)

#### Step 1: Connect to Your Server
```bash
ssh root@YOUR_SERVER_IP
```

#### Step 2: Install Dependencies
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

#### Step 3: Upload Project
```bash
git clone https://github.com/YOUR_USERNAME/class-scheduler.git
cd class-scheduler/Class\ Scheduler
npm install
npm run build
```

#### Step 4: Run with PM2
```bash
pm2 serve dist 3000 --spa
pm2 startup
pm2 save
```

#### Step 5: Setup Nginx (Reverse Proxy)
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
```

Then:
```bash
sudo systemctl restart nginx
```

---

## Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] No console errors
- [ ] Responsive design checked
- [ ] localStorage working correctly
- [ ] All routes accessible
- [ ] Environment variables set (if any)
- [ ] Built successfully (`npm run build`)
- [ ] No large dependencies missing
- [ ] README updated with instructions
- [ ] Source code version control ready

---

## Environment Configuration

### For Production Firebase

If you want to use Firebase instead of localStorage:

1. Update `src/firebase.js` to use real Firebase credentials
2. Replace localStorage logic in contexts with Firebase calls
3. Install Firebase packages (already in package.json)
4. Test thoroughly before deployment

Example Firebase auth upgrade:
```javascript
import { signUp, signIn, signOut } from 'firebase/auth';

// Replace localStorage login with:
await signUp(auth, email, password);
```

---

## Performance Optimization

### Before Deployment

1. **Code Splitting**
```bash
npm run build
# Check bundle size
```

2. **Image Optimization**
- Compress all images
- Use WebP format where possible
- Implement lazy loading

3. **Minification & Compression**
- Already handled by Vite
- Enable Gzip on server

4. **Caching Strategy**
- Set long cache headers for static assets
- Cache-bust on new deployments

---

## Monitoring & Maintenance

### Setup Error Tracking
```javascript
// Add to main.jsx
window.addEventListener('error', (e) => {
  console.error('Global error:', e);
  // Send to monitoring service
});
```

### Monitor Performance
- Use Lighthouse (DevTools)
- Check Core Web Vitals
- Monitor error rates

---

## Security Considerations

⚠️ **Before Going Live:**

1. **HTTPS Only**
   - All deployed apps must use HTTPS
   - Netlify/Vercel do this automatically

2. **Secure Headers**
   ```nginx
   add_header X-Content-Type-Options "nosniff";
   add_header X-Frame-Options "SAMEORIGIN";
   add_header X-XSS-Protection "1; mode=block";
   ```

3. **Password Security**
   - Current setup uses plain text (demo only!)
   - For production: Use bcryptjs
   - Install: `npm install bcryptjs`

4. **Input Validation**
   - Always validate on server-side
   - Sanitize all user inputs
   - Use OWASP guidelines

5. **API Security**
   - Rate limiting
   - CORS configuration
   - Authentication tokens (JWT recommended)

---

## Post-Deployment Tasks

1. ✅ Test all features in production
2. ✅ Verify database connectivity
3. ✅ Check error logs
4. ✅ Monitor performance metrics
5. ✅ Setup automated backups
6. ✅ Configure CDN (if using)
7. ✅ Setup monitoring alerts
8. ✅ Document deployment process

---

## Troubleshooting Deployment

### White Blank Page
- Check browser console for errors
- Ensure `index.html` is served for all routes
- Verify build output in dist folder

### 404 on Routes
- Enable SPA mode in server config
- Ensure all routes redirect to index.html
- Check routing configuration

### Database Connection Issues
- Verify environment variables
- Check Firebase/Backend connectivity
- Review server logs

### Slow Performance
- Run `npm run build --report`
- Analyze bundle size
- Enable compression on server
- Setup CDN for static assets

### CORS Errors
- Configure backend CORS headers
- Or use CORS proxy during development
- In production, ensure same origin

---

## Rollback Procedure

If deployment fails:

**Netlify:**
```
Dashboard → Deploys → Select previous version → Publish
```

**GitHub Pages:**
```bash
git revert <commit-hash>
git push origin main
```

**Docker:**
```bash
docker run -p 80:80 class-scheduler:previous-tag
```

---

## Scaling for Growth

When your app gets more users:

1. **Database Migration**
   - Move from localStorage to real database
   - Set up Firebase Firestore
   - Implement backup strategy

2. **Performance**
   - Implement service workers
   - Add Redis caching
   - Use CDN for static assets

3. **Analytics**
   - Add Google Analytics
   - Track user behavior
   - Monitor error rates

4. **Infrastructure**
   - Load balancing
   - Auto-scaling
   - Multi-region deployment

---

**Happy Deploying! 🎉**

Choose the option that best fits your needs. For beginners, **Netlify** is the easiest. For production-grade apps, consider **Vercel** or **self-hosted VPS**.
