# FixIt AI Deployment Guide

Complete guide for deploying the backend on Railway and frontend on Vercel.

---

## 📋 Prerequisites

Before starting, ensure you have:
- [ ] Git repository (GitHub, GitLab, or Bitbucket)
- [ ] Railway account ([railway.app](https://railway.app))
- [ ] Vercel account ([vercel.com](https://vercel.com))
- [ ] Google Gemini API key ([aistudio.google.com](https://aistudio.google.com))

---

## 🚂 Part 1: Deploy Backend on Railway

### Step 1: Prepare Backend Files

Create a `Procfile` in the root directory (for Railway to know how to start your app):

```bash
# Create Procfile in project root
web: cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Step 2: Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select your **FixIt** repository

### Step 3: Configure Backend Service

1. After Railway creates the project, click on your service
2. Go to **"Settings"** tab
3. Under **"Build"**, set:
   - **Root Directory**: Leave empty (or set to `/` if needed)
   - **Build Command**: (Leave empty, pip will auto-install)
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`

### Step 4: Set Environment Variables

1. In Railway, go to **"Variables"** tab
2. Add the following environment variables:

```bash
GEMINI_API_KEY=AIzaSyBmcw4vrX9wqMwVAl7Q3r5MOAQFydn-Fok
GEMINI_MODEL_NAME=gemini-2.5-flash-lite
ENABLE_WEB_GROUNDING=true
PORT=8000
```

> ⚠️ **Security**: Replace the GEMINI_API_KEY with your own API key. Don't use the one in your .env file in production!

### Step 5: Deploy

1. Railway will automatically deploy after you add variables
2. Wait for the build to complete (2-5 minutes)
3. Once deployed, Railway will provide a URL like: `https://your-app.railway.app`
4. Copy this URL - you'll need it for the frontend

### Step 6: Verify Backend Deployment

Test your backend by visiting:
```
https://your-app.railway.app/docs
```

You should see the FastAPI Swagger documentation.

---

## ▲ Part 2: Deploy Frontend on Vercel

### Step 1: Prepare Frontend Environment

Create `.env.production` in the `frontend` folder:

```bash
NEXT_PUBLIC_API_URL=https://your-app.railway.app
```

Replace `https://your-app.railway.app` with your actual Railway URL from Part 1.

### Step 2: Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect it's a Next.js project

### Step 3: Configure Build Settings

1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `.next` (default)
5. **Install Command**: `npm install` (default)

### Step 4: Set Environment Variables

In Vercel project settings:

1. Go to **"Settings"** → **"Environment Variables"**
2. Add:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-app.railway.app` (your Railway backend URL)
   - **Environment**: Check all (Production, Preview, Development)

### Step 5: Deploy

1. Click **"Deploy"**
2. Vercel will build and deploy (2-3 minutes)
3. Once complete, you'll get a URL like: `https://your-app.vercel.app`

### Step 6: Update Backend CORS (Important!)

Since your frontend is now on Vercel, you should update CORS settings for security:

1. Go to Railway dashboard
2. Add a new environment variable:
   ```bash
   FRONTEND_URL=https://your-app.vercel.app
   ```

3. Update [backend/main.py](backend/main.py) CORS settings:
   ```python
   # Replace the allow_origins line with:
   allow_origins=[os.getenv("FRONTEND_URL", "*")],
   ```

4. Redeploy the backend on Railway

---

## ✅ Testing Your Deployment

### Test Backend
```bash
curl https://your-app.railway.app/health
```

### Test Frontend
1. Visit `https://your-app.vercel.app`
2. Upload a device image
3. Ask a question
4. Verify the response comes back successfully

---

## 🔧 Troubleshooting

### Backend Issues

**Issue**: Backend fails to start
- Check Railway logs: Service → Deployments → View Logs
- Verify all environment variables are set
- Ensure `requirements.txt` includes all dependencies

**Issue**: 500 errors
- Check GEMINI_API_KEY is valid
- Verify the API key has proper permissions
- Check Railway logs for detailed error messages

### Frontend Issues

**Issue**: Cannot connect to backend
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Ensure Railway backend URL is accessible
- Check browser console for CORS errors

**Issue**: Build fails on Vercel
- Check that `frontend/package.json` is valid
- Verify all dependencies are listed
- Check Vercel build logs for specific errors

### CORS Issues

**Issue**: CORS errors in browser console
- Verify backend CORS settings include your Vercel domain
- Ensure `allow_credentials` is set correctly
- Check that Railway backend is running

---

## 🔄 Continuous Deployment

Both Railway and Vercel support automatic deployments:

- **Railway**: Auto-deploys on push to main branch
- **Vercel**: Auto-deploys on push to main branch (production) and creates preview deployments for PRs

To enable:
1. Both platforms should auto-detect your GitHub repo
2. Every git push will trigger a new deployment
3. Check deployment status in respective dashboards

---

## 📊 Monitoring

### Railway Monitoring
- Go to Railway dashboard → Your service
- View metrics: CPU, Memory, Network
- Check logs in real-time

### Vercel Monitoring
- Go to Vercel dashboard → Your project
- View Analytics (may require Pro plan)
- Check Function logs for server-side errors

---

## 💰 Cost Considerations

### Railway
- **Free Tier**: $5 credit/month (500 hours)
- **Hobby Plan**: $5/month + usage
- Your app should fit in the free tier for development

### Vercel
- **Free Tier**: Unlimited personal projects
- **Bandwidth**: 100GB/month
- **Function Execution**: 100GB-hours/month
- Should be sufficient for moderate traffic

---

## 🔐 Security Best Practices

1. **API Keys**: 
   - Never commit `.env` files to Git
   - Use Railway/Vercel environment variables
   - Rotate API keys regularly

2. **CORS**:
   - Update from `allow_origins=["*"]` to specific domains
   - Use environment variable for frontend URL

3. **Rate Limiting**:
   - Consider adding rate limiting to your FastAPI backend
   - Use Redis or similar for production rate limiting

4. **HTTPS**:
   - Both Railway and Vercel provide SSL certificates automatically
   - Ensure all API calls use HTTPS

---

## 📝 Quick Commands Reference

### Railway CLI (Optional)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project
railway link

# View logs
railway logs

# Set environment variable
railway variables set GEMINI_API_KEY=your_key
```

### Vercel CLI (Optional)
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# View logs
vercel logs
```

---

## 🎉 Success Checklist

- [ ] Backend deployed on Railway
- [ ] Backend URL accessible
- [ ] FastAPI docs visible at `/docs`
- [ ] Frontend deployed on Vercel
- [ ] Frontend can reach backend
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] Test upload and query work end-to-end
- [ ] SSL certificates active (HTTPS)
- [ ] Monitoring set up

---

## 🆘 Need Help?

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **FastAPI Deployment**: https://fastapi.tiangolo.com/deployment/
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

**Last Updated**: February 2026  
**Version**: 1.0.0
