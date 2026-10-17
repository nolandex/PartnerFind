---
name: Language and navbar unification
description: How to keep course pages sharing the landing-page language switcher and a single top navigation pattern.
---

## Rule

- Course UI text, category names, and course content (titles, descriptions, module titles) must all follow the language selected on the landing page.
- Do not maintain a separate language state for the course area. Derive the course language from the shared `LanguageContext` (the landing-page language provider) so the selection is consistent across routes and survives reloads.
- Store the active locale in `localStorage` on the user’s device so the choice persists after a refresh.

**Why:** The app originally had two separate language contexts: `LanguageContext` for the landing page and `ColorContext` for the course pages. This caused the course area to stay in Indonesian regardless of the language chosen on the landing page.

**How to apply:**
1. Keep the landing page as the single source of truth for `locale`.
2. In the course language provider, read the active `locale` and map it to a course-specific language object that provides UI labels and category names.
3. Keep course content (titles, descriptions, modules) in a locale-aware data layer, and return localized courses from `getCourses` / `getCourseById`.
4. Make course pages that list saved/fetched courses reload when the language code changes (e.g., add `selectedLang.code` to the relevant `useEffect` dependency array).

## Rule

- Course-area pages should share a single top navbar (like the landing page) that contains the logo, language switcher, and one back affordance.
- Add top padding (`pt-16`) to the page root so the fixed navbar does not cover content.
- Remove any duplicate back buttons inside banners or headers.

**Why:** Adding the top navbar without adjusting padding caused the page top to be hidden under the fixed header, and keeping both the in-banner back button and the navbar back button created two competing controls.

**How to apply:**
1. Create a reusable `TopNavbar` component that uses the shared language switcher.
2. Let the navbar accept an `onBack` callback for pages that need contextual back behavior (e.g., preserving a `category` query parameter).
3. Add the navbar to every course-area page and remove the old back button in `Index`.
