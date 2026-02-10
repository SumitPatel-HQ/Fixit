# ⚡ Deployment Quick Reference

## 🚂 Railway (Backend) - One-Page Guide

### 1. Setup (5 minutes)
```bash
# No local setup needed - Railway uses your Git repo
1. Go to railway.app
2. "New Project" → "Deploy from GitHub"
3. Select your repo
```

### 2. Environment Variables
```bash
GEMINI_API_KEY=your_actual_api_key
GEMINI_MODEL_NAME=gemini-2.5-flash-lite
ENABLE_WEB_GROUNDING=true
PORT=8000
```

### 3. Start Command
```bash
cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
```

### 4. Get Your URL
```
After deployment: https://YOUR-APP.railway.app
Test it: https://YOUR-APP.railway.app/docs
```

---

## ▲ Vercel (Frontend) - One-Page Guide

### 1. Setup (3 minutes)
```bash
1. Go to vercel.com
2. "New Project" → Import your GitHub repo
3. Root Directory: frontend
```

### 2. Environment Variables
```bash
NEXT_PUBLIC_API_URL=https://YOUR-APP.railway.app
```

### 3. Build Settings (Auto-detected)
```bash
Framework: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### 4. Get Your URL
```
After deployment: https://YOUR-APP.vercel.app
```

---

## 🔗 Connect Them Together

### Update Backend CORS
In Railway, add:
```bash
FRONTEND_URL=https://YOUR-APP.vercel.app
```

Then update [backend/main.py](backend/main.py):
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "*")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## ✅ Test Deployment

### Backend Health Check
```bash
curl https://YOUR-APP.railway.app/health
```

### Frontend Test
1. Visit: `https://YOUR-APP.vercel.app`
2. Upload an image
3. Ask a question
4. Verify response

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check Railway logs, verify env vars |
| 500 errors | Validate GEMINI_API_KEY in Railway |
| CORS errors | Add FRONTEND_URL to Railway, update main.py |
| Frontend can't connect | Check NEXT_PUBLIC_API_URL in Vercel |
| Build fails | Check logs in respective platform |

---

## 🔄 Redeploy

**Railway**: Push to GitHub main branch (auto-deploys)  
**Vercel**: Push to GitHub main branch (auto-deploys)

Or manually in each dashboard: "Deployments" → "Redeploy"

---

## 📱 CLI Quick Commands

### Railway CLI
```bash
npm i -g @railway/cli
railway login
railway logs
```

### Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## 🎯 Common Commands

### View Logs
```bash
# Railway
railway logs

# Vercel
vercel logs
```

### Environment Variables
```bash
# Railway
railway variables

# Vercel (use dashboard)
```

### Redeploy
```bash
# Railway
railway up

# Vercel
vercel --prod
```

---

## 💡 Pro Tips

1. **Use Preview Deployments**: Every PR gets a preview URL on Vercel
2. **Monitor Usage**: Check Railway/Vercel dashboards for resource usage
3. **Set Alerts**: Configure alerts for downtime
4. **Keep Logs**: Review logs regularly for errors
5. **Rotate Keys**: Change API keys periodically

---

## 📞 Support Links

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- FastAPI Deployment: https://fastapi.tiangolo.com/deployment
- Next.js Deployment: https://nextjs.org/docs/deployment

---

**Print this page and keep it handy during deployment!** 🎉
