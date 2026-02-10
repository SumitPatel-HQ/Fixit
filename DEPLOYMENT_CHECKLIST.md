# 🚀 Quick Deployment Checklist

Use this checklist when deploying FixIt AI to production.

## Pre-Deployment

- [ ] All features tested locally
- [ ] Git repository is clean and up-to-date
- [ ] Environment variables documented
- [ ] API keys ready (Gemini API)
- [ ] Railway account created
- [ ] Vercel account created
- [ ] GitHub repository connected

## Backend Deployment (Railway)

- [ ] Created Railway project
- [ ] Connected GitHub repository
- [ ] Set environment variables:
  - [ ] `GEMINI_API_KEY`
  - [ ] `GEMINI_MODEL_NAME`
  - [ ] `ENABLE_WEB_GROUNDING`
  - [ ] `PORT` (set to 8000)
- [ ] Deployment successful
- [ ] Backend URL saved: `___________________________`
- [ ] Tested `/docs` endpoint
- [ ] Tested `/health` endpoint

## Frontend Deployment (Vercel)

- [ ] Created Vercel project
- [ ] Connected GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Set environment variables:
  - [ ] `NEXT_PUBLIC_API_URL` (Railway URL)
- [ ] Deployment successful
- [ ] Frontend URL saved: `___________________________`
- [ ] Tested homepage loads
- [ ] Tested API connection

## Post-Deployment

- [ ] Updated CORS in backend (backend/main.py)
- [ ] Added `FRONTEND_URL` variable in Railway
- [ ] Redeployed backend with CORS changes
- [ ] End-to-end test:
  - [ ] Upload image
  - [ ] Submit query
  - [ ] Receive response
  - [ ] Audio playback works
  - [ ] AR visualization works
- [ ] Monitoring set up
- [ ] Team notified of URLs
- [ ] Documentation updated

## Security Review

- [ ] API keys not in Git repository
- [ ] CORS restricted to frontend domain (not "*")
- [ ] HTTPS enabled (automatic)
- [ ] Rate limiting considered
- [ ] Error messages don't expose sensitive info

## Performance Check

- [ ] Backend responds in < 3 seconds
- [ ] Frontend loads in < 2 seconds
- [ ] Images upload successfully
- [ ] No console errors
- [ ] Mobile responsive

## URLs for Reference

```
Backend (Railway):  _____________________________________
Frontend (Vercel):  _____________________________________
API Documentation:  _____________________________________/docs
```

## Rollback Plan

If issues occur:
1. Revert to previous deployment in Railway/Vercel dashboard
2. Check logs for error details
3. Fix issue locally
4. Test thoroughly
5. Redeploy

## Notes

_Add any deployment-specific notes here:_





---

**Deployment Date**: __________________  
**Deployed By**: __________________  
**Version**: __________________
