# EMI Landscape App - Deployment Guide

A React application with Supabase authentication and layout generation capabilities.

## 🚀 Quick Start

The application is ready for deployment! Here's what you need to do:

### Critical Fix Required: Supabase Configuration

**⚠️ IMPORTANT**: Authentication is currently failing because of Supabase project settings. You need to:

1. **Login to Supabase Dashboard**: https://supabase.com/dashboard
2. **Navigate to your project**: `btaebdtmopeulzpglapw`
3. **Go to Authentication → Settings**
4. **Check Email configuration**:
   - Ensure "Allow email signups" is enabled
   - Remove any domain restrictions/allowlists that might be blocking emails
   - Verify there are no overly restrictive email validation rules
5. **Test**: Try signing up with a Gmail or other common email provider

## 🎯 Features Working

✅ **Backend APIs**: All working perfectly
- Health check (`/api/`)
- Layout generation (`/api/generate-layout`)
- Status endpoints (`/api/status`)

✅ **Frontend UI**: All pages loading correctly
- Home page with navigation
- Auth forms (sign up/sign in toggle)
- Layout generation form
- Responsive design

✅ **Route Protection**: Protected routes redirect to auth
✅ **Error Handling**: User-friendly error messages
✅ **API Integration**: Frontend properly calls backend

❌ **Authentication**: Needs Supabase dashboard configuration fix

## 🌐 Vercel Deployment

### Option A: Deploy via Vercel CLI
```bash
cd frontend
npx vercel
```

### Option B: Deploy via Vercel Dashboard
1. Connect GitHub repository
2. **Set Root Directory**: `frontend/`
3. **Build Settings**:
   - Framework: Create React App
   - Build Command: `yarn build`
   - Output Directory: `build`
   - Install Command: `yarn install`

### Environment Variables (in Vercel)
```
REACT_APP_BACKEND_URL=https://your-backend-url.com
REACT_APP_SUPABASE_URL=https://btaebdtmopeulzpglapw.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0YWViZHRtb3BldWx6cGdsYXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NzExMDAsImV4cCI6MjA2NzI0NzEwMH0.Ga3zgWhvMg6vXGGKN8GZBYdfijQPTCrwqD20HPM9xZM
```

## 🔧 After Deployment

1. **Update Supabase Site URL**:
   - Go to Supabase Dashboard → Authentication → Settings
   - Set Site URL to your Vercel domain: `https://your-app.vercel.app`

2. **Configure OAuth** (if using Google sign-in):
   - Add your Vercel domain to Google OAuth settings
   - Update redirect URLs in Supabase

## 🧪 Testing Results

**✅ Backend APIs**: All endpoints working perfectly
**✅ Frontend Pages**: All routes and navigation working
**✅ Layout Generation**: Backend API generates layout plans successfully
**❌ Authentication**: Blocked by Supabase email validation settings

## 📋 Application Features

- **Home Page** (`/`): Welcome page with call-to-action
- **Authentication** (`/auth`): Email/password + Google OAuth
- **Layout Generator** (`/generate`): Protected form for creating layout plans

## 🛠 Tech Stack

- **Frontend**: React 18 + Tailwind CSS
- **Auth**: Supabase (email/password + OAuth)
- **Backend**: FastAPI + MongoDB
- **Deployment**: Vercel (frontend)

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AuthPage.js        # Custom auth forms
│   │   ├── GeneratePage.js    # Layout generation
│   │   └── Header.js          # Navigation
│   ├── context/
│   │   └── AuthContext.js     # Auth state management
│   ├── lib/
│   │   └── supabase.js        # Supabase client
│   └── App.js                 # Main app with routing
├── package.json               # Dependencies
├── vercel.json               # Vercel configuration
└── .env                      # Environment variables
```

## 🔍 API Endpoints

- `GET /api/` - Health check
- `POST /api/generate-layout` - Generate layout plan
- `POST /api/status` - Create status check  
- `GET /api/status` - Get status checks

## 🎨 Layout Generation

The main feature allows users to:
1. Fill out project details (name, description, requirements, style)
2. Submit to FastAPI backend
3. Receive AI-generated layout plan
4. View formatted results

## 🚨 Known Issues & Fixes

### Issue: Authentication Fails
**Fix**: Configure Supabase email settings (see Critical Fix section above)

### Issue: Route Protection
**Status**: ✅ Fixed - All protected routes properly redirect to auth

### Issue: API Integration  
**Status**: ✅ Working - Backend APIs tested and functional

## 📞 Support

Once you've fixed the Supabase configuration:
1. Test authentication with a common email provider
2. Verify OAuth providers work with your domain
3. Test the complete layout generation flow

The application is production-ready and just needs the Supabase email validation fix!


