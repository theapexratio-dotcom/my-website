
# Apex Ratio Coaching - Technical Roadmap

## Task 1: Folder Structure
A clean, scalable architecture for your professional coaching site:

```text
/src
  /assets         # Brand logos, high-res transformation images
  /components     # Reusable UI (Button.tsx, Hero.tsx, BookingForm.tsx)
  /hooks          # Custom React hooks (useAuth.ts, useApexRatio.ts)
  /pages          # Full view components (LandingPage.tsx, Portal.tsx)
  /services       # Logic for Firebase, Stripe, and Gemini AI
  /styles         # Global styles (handled by Tailwind)
  /types          # TypeScript interfaces for users/exercises
  App.tsx         # Main router and state orchestration
  index.tsx       # Entry point
  index.html      # Meta tags & external font loading
```

## Task 2: Core Code
*   **Landing Page**: Implemented in `pages/LandingPage.tsx` with high-conversion Hero and Booking components.
*   **Auth Logic**: Implemented via `pages/LoginPage.tsx` and protected routing in `App.tsx`.
*   **Aesthetics**: Utilizes Tailwind's "Glassmorphism" and custom gradients for that premium "Ultimate Performance" feel.

## Task 3: Syncing Existing Features
To ensure your existing app features (from the provided HTML file) and this new web platform stay in sync, follow these steps:

1.  **Standardized Firestore Schema**: 
    Your original app uses: `/artifacts/{appId}/users/{userId}/client_data/apex_ratio_config`.
    Keep this EXACT path in the new React app. Do not create a separate `/clients` or `/profiles` collection for the core Apex data.

2.  **Auth Persistence**:
    Both apps must use the same Firebase Project ID. When a user logs in via the web app, their `uid` should be used to fetch the data at the path above.

3.  **Cross-Platform Triggering**:
    - When a user calculates their score on the **Web App**, update the Firestore document.
    - When a user opens their **Mobile Web App**, the `onSnapshot` listener you already wrote will automatically refresh with the new data.

4.  **AI Insights Sync**:
    - The original app has `fetchGeminiContent`. In the new React app, move this to `services/gemini.ts`.
    - Both platforms will feed the same SWR and RHR data into the AI to ensure the "Executive Focus Mantra" is consistent across devices.

## How to Link Custom Domain
1.  **Deploy to Vercel**: Import your repository. It will automatically detect the Vite/React configuration.
2.  **Settings > Domains**: Enter `apex-ratio.com` (or your chosen domain).
3.  **DNS Update**: Point your `A` record and `CNAME` as instructed by Vercel's dashboard.
