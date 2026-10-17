# NexClass AI Studio App

A React + Vite web app for NexClass — an Indonesian ed-tech platform — powered by Google Gemini AI and Firebase.

## Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS 4
- **AI:** Google Gemini (`@google/genai`)
- **Auth & DB:** Firebase (Auth + Firestore)
- **UI:** Radix UI, Lucide React, Framer Motion
- **Routing:** React Router DOM 7
- **i18n:** Built-in language context with translations

## Running the app

```
npm run dev
```

Starts the Vite dev server on port 5000. The workflow `Start application` handles this automatically.

## Required secrets

| Secret | Where to get it |
|--------|----------------|
| `GEMINI_API_KEY` | https://aistudio.google.com/apikey |

Firebase config is in `firebase-applet-config.json` and initialized via `src/lib/firebase.ts`.

## User preferences

<!-- Add user preferences here -->
