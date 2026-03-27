# CleanPlate - AI-Powered Meal Planning Platform

**Tagline:** *Plan less. Eat better.*

CleanPlate is an AI-powered meal planning platform that builds weekly meal plans around what you already have in your pantry, reducing food waste and saving time.

## 🚀 Features

- **Pantry Management** - Track ingredients, quantities, and expiration dates
- **AI Meal Planning** - Generate personalized 7-day meal plans using OpenAI
- **Household Profiles** - Set dietary restrictions, allergies, and cuisine preferences
- **Meal Confirmation** - Mark meals as cooked and auto-deduct ingredients
- **Dashboard** - Overview of pantry status, expiring items, and meal plans
- **Dark Theme** - Apple liquid glass aesthetic with frosted glass effects

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Next.js API routes
- **Database & Auth:** Supabase (PostgreSQL + Supabase Auth)
- **AI:** OpenAI GPT-4 for meal plan generation
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- OpenAI API key
- Vercel account (for deployment)

## 🏗️ Setup Instructions

### 1. Clone the Repository

```bash
cd cleanplate
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the migration to create tables:
   - Go to the SQL Editor in Supabase Dashboard
   - Copy the contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and run in the SQL Editor
3. Get your Supabase URL and keys from Project Settings > API

### 4. Set Up Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
cleanplate/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Authentication pages
│   │   ├── (dashboard)/     # Protected dashboard pages
│   │   ├── api/             # API routes
│   │   └── page.tsx         # Landing page
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   └── features/        # Feature-specific components
│   ├── lib/
│   │   └── supabase/        # Supabase client setup
│   └── types/               # TypeScript types
├── supabase/
│   └── migrations/          # Database migrations
└── public/                  # Static assets
```

## 🗄️ Database Schema

- **profiles** - User profiles linked to auth.users
- **household_members** - Family members with dietary preferences
- **pantry_items** - Pantry inventory with expiration tracking
- **meal_plans** - AI-generated weekly meal plans (JSONB)
- **cooked_meals** - Meal history with ratings and feedback

All tables include Row Level Security (RLS) policies.

## 🚀 Deployment to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy!

Vercel will automatically detect Next.js and configure the build.

## 🎨 Design System

- **Background:** #080b12 (deep dark)
- **Accent:** #4a7c59 (forest green) via Tailwind's primary-* colors
- **Typography:** Inter font family
- **Effects:** Glass morphism, backdrop blur, subtle animations

## 🧪 Testing

```bash
npm test
```

## 📝 License

MIT License - feel free to use this project for learning and building!

## 🤝 Contributing

This is a demo project built with the RuFlo hive-mind swarm. Feel free to fork and customize!

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with** ❤️ **using RuFlo V3 hierarchical swarm coordination**
