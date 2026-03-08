# Lexi Dictionary App 📖

A fast, modern dictionary web app built with Vite and React. Search any word to get instant definitions, synonyms, example sentences, pronunciation audio, and related photography.

🌐 **Live Site:** [https://storied-centaur-9c1747.netlify.app/](https://storied-centaur-9c1747.netlify.app/)

---

## 📚 Project Overview

This project was built as part of the SheCodes React Add-on course to gain advanced knowledge of React. It demonstrates real-world skills including API integration, component architecture, performance optimisation, mobile-first responsive design, and accessibility — going beyond a basic tutorial project into production-ready code.

---

## 🛠 Technologies Used

- **React 18** — Component-based UI with hooks
- **Vite** — Fast dev server and optimised production build
- **Axios** — HTTP client with built-in error handling and timeout support
- **SheCodes Dictionary API** — Word definitions, phonetics, and meanings
- **DictionaryAPI.dev** — Pronunciation audio files
- **Pexels API** — Related photography for each word
- **CSS Custom Properties** — Design token system for consistent styling
- **PropTypes** — Runtime type checking for component props

> **Note on Bootstrap:** Bootstrap was used in the initial build for utility classes and the loading spinner. It was later removed as part of the performance optimisation process — replacing it with ~20 lines of custom CSS eliminated 29 KiB of unused CSS and 32 KiB of unused JS from the bundle.

---

## ✨ Key Features

- 🔍 **Word search** with input validation and clear button
- 📖 **Definitions** grouped by part of speech with example sentences
- 🔊 **Pronunciation audio** with a custom-built audio player and progress bar
- 📷 **Photo grid** of related Pexels images with photographer attribution
- ⏳ **Loading states** with skeleton screens and spinner
- ❌ **Error handling** for API failures, timeouts, and invalid input
- 🌱 **Default word on load** — a random word from a curated list greets the user
- 📱 **Fully responsive** — single column on mobile, 3-column grid at 600px+

---

## ♿ Accessibility

- Semantic HTML throughout (`<header>`, `<main>`, `<footer>`, `<article>`, `<figure>`, `<blockquote>`)
- ARIA labels on all interactive elements (`aria-label`, `aria-live`, `aria-invalid`, `aria-describedby`)
- `role="alert"` on error messages for screen reader announcements
- `role="status"` on loading spinner
- Keyboard-navigable search and audio controls
- Focus-visible styles on all interactive elements

---

## 📊 Lighthouse Scores

|             | Performance | Accessibility | Best Practices | SEO          |
| ----------- | ----------- | ------------- | -------------- | ------------ |
| **Mobile**  | 82 / 100 ✅ | 100 / 100 ✅  | 77 / 100 ⚠️    | 100 / 100 ✅ |
| **Desktop** | 88 / 100 ✅ | 100 / 100 ✅  | 77 / 100 ⚠️    | 100 / 100 ✅ |

### 📌 Note on Best Practices Score

The Best Practices score is impacted by third-party cookies set by the Pexels image CDN (`images.pexels.com`). These include Cloudflare security cookies (`_cfuvid`) and Hotjar analytics cookies (`_hjSessionUser`, `_sp_id`) which are outside my control as a developer — they are set by Pexels' infrastructure, not my code.

This is a real-world trade-off: the Pexels API provides high-quality, royalty-free photography that meaningfully enhances the user experience; removing it would eliminate a core feature to gain a score improvement on a metric that doesn't directly affect users.

---

## 🚀 Performance Optimisation Journey

A significant part of this project was learning to optimise Lighthouse scores iteratively. The mobile Performance score improved from **51 → 82** through systematic diagnosis and targeted fixes:

| Fix                                                                                                         | Impact                                        |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Non-render-blocking Google Fonts via `rel="preload"`                                                        | Improved FCP                                  |
| `width` and `height` on all images                                                                          | CLS 0.721 → 0.059                             |
| `decoding="async"` on images                                                                                | Reduced main thread blocking                  |
| `fetchpriority="high"` on first image                                                                       | Improved LCP                                  |
| Removed Bootstrap (29 KiB unused CSS, 32 KiB unused JS)                                                     | Reduced bundle size                           |
| Custom spinner and utility classes to replace Bootstrap                                                     | Eliminated dependency                         |
| Reduced Pexels fetch from 6 to 3 images                                                                     | Fewer network requests                        |
| Switched Pexels image size from `medium` to `small`                                                         | ~16 KiB saving per image                      |
| `preconnect` hints for `fonts.gstatic.com`, `api.shecodes.io`, `images.pexels.com`, `api.dictionaryapi.dev` | ~320ms saving per origin                      |
| `dns-prefetch` for `fonts.googleapis.com`                                                                   | Lighter alternative within 4-connection limit |
| `will-change: transform` on animated elements                                                               | Moved animations to GPU                       |
| Conditional `min-height` on photo section (loading state only)                                              | Prevented CLS without persistent layout gap   |
| Single column photo grid on mobile, 3 columns at 600px+                                                     | Eliminated orphaned image on small screens    |

> **Learning:** Lighthouse scores vary by ~±5 points between runs due to network conditions and CPU throttling simulation. Always run multiple audits and look for consistent patterns rather than chasing individual numbers. The gains above represent consistent, reproducible improvements across multiple test runs.

---

## 🧱 Component Architecture

```
App
├── Header          — App title, current word, phonetic
├── AudioPlayer     — Custom play/pause button with progress bar
└── main
    ├── SearchBar       — Input with validation, clear button
    ├── LoadingSpinner  — Accessible spinner with visually-hidden text
    ├── ErrorMessage    — ARIA alert for API/validation errors
    ├── DefinitionList  — Maps API meanings to DefinitionCards
    │   └── DefinitionCard  — Part of speech, definition, example, synonyms
    └── PhotoGrid       — Pexels photos with skeleton loading state
```

---

## 🎨 Design System

All visual values are defined as CSS Custom Properties in `App.css`, following a design token approach:

```css
:root {
  /* Brand colours */
  --color-primary: #a57ef0;
  --color-cta: #e8508a;
  --color-accent: #ffc929;

  /* Typography */
  --font-heading: "Fraunces", Georgia, serif;
  --font-body: "DM Sans", sans-serif;

  /* Spacing scale */
  --space-xs / --space-sm / --space-md / --space-lg / --space-xl / --space-xxl

  /* Border radius */
  --radius-sm / --radius-md / --radius-lg
}
```

This means changing a colour or spacing value in one place updates it consistently across the entire app.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AudioPlayer.jsx / .css
│   ├── DefinitionCard.jsx
│   ├── DefinitionList.jsx
│   ├── Definition.css
│   ├── ErrorMessage.jsx / .css
│   ├── Header.jsx / .css
│   ├── LoadingSpinner.jsx / .css
│   ├── PhotoGrid.jsx / .css
│   └── SearchBar.jsx / .css
├── services/
│   ├── dictionaryService.js   — SheCodes + DictionaryAPI calls
│   └── pexelsService.js       — Pexels photo search
├── utils/
│   └── textHelpers.js         — capitalise, truncate, formatSynonyms
├── App.jsx
├── App.css                    — Global styles and design tokens
└── main.jsx
```

---

## 💡 Key Learning Takeaways

### 1. Component design: separation of concerns

Each component has one responsibility. `DefinitionList` only maps data to cards — it doesn't fetch or format anything. `DefinitionCard` only renders — it doesn't know where its data comes from. This made debugging and testing significantly easier.

### 2. Error handling deserves as much thought as the happy path

`dictionaryService.js` handles 404s, 401s, 500s, timeouts, and network failures with distinct, user-friendly messages. A common beginner mistake is only handling the success case — real apps break in all kinds of ways.

### 3. Performance is a series of small decisions, not one big fix

No single change moved the needle dramatically. The 51 → 82 improvement came from ~12 targeted fixes, each addressing a specific Lighthouse diagnostic. Learning to read Lighthouse output and act on it systematically is a valuable real-world skill.

### 4. Third-party dependencies have real costs

Bootstrap was convenient but added 29 KiB of unused CSS and 32 KiB of unused JS. Replacing it with ~20 lines of custom CSS eliminated both warnings and improved bundle size. Choosing dependencies thoughtfully matters.

### 5. Design tokens make scaling easy

Writing `var(--space-md)` instead of `1rem` everywhere means spacing is consistent by default, and changing the scale is a one-line edit. This approach is used in professional design systems at companies like Shopify and GitHub.

### 6. Accessibility is built in, not bolted on

Adding `aria-live`, `aria-label`, `role="alert"`, and semantic HTML from the start costs almost nothing extra. Retrofitting accessibility into an existing codebase is much harder — and skipping it excludes real users.

### 7. Responsive design requires testing at every breakpoint

The photo grid looked fine at 320px and 600px+ but had an orphaned image at ~480–599px. Testing across the full range of screen sizes — not just common breakpoints — catches edge cases before users do.

### 8. Performance fixes can conflict with each other

Adding `min-height` to prevent CLS caused a Speed Index regression. Reverting it and applying the fix more surgically (only during the loading state) solved both problems. Real-world optimisation is iterative and sometimes involves undoing previous changes.

---

## 🔧 Setup & Installation

```bash
# Clone the repository
git clone https://github.com/carolinehargreaves41-sketch/Lexify-Dictionary-App.git

# Install dependencies
cd Lexify-Dictionary-App
npm install

# Add environment variables
# Create a .env file in the root with:
VITE_SHECODES_API_KEY=your_shecodes_key_here
VITE_PEXELS_API_KEY=your_pexels_key_here

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 📈 Future Enhancements

- [ ] Word history — remember recent searches
- [ ] Favourites — save words to a personal list
- [ ] Dark mode toggle
- [ ] Share a word via URL (e.g. `/word/serendipity`)
- [ ] Keyboard shortcut to focus search bar
- [ ] WebP image format support for further performance gains

---

## 👤 Author

**Caroline Hargreaves**
Aspiring Web Developer | SheCodes Student

- 💻 [GitHub Profile](https://github.com/carolinehargreaves41-sketch)
- 🌐 [Live App](https://storied-centaur-9c1747.netlify.app/)

---

## 🙏 Acknowledgments

- [SheCodes](https://www.shecodes.io/) — For the React course and Dictionary API
- [DictionaryAPI.dev](https://dictionaryapi.dev/) — Free pronunciation audio
- [Pexels](https://www.pexels.com/) — Royalty-free photography API
- [Netlify](https://www.netlify.com/) — Seamless deployment and hosting
- [Google Fonts](https://fonts.google.com/) — Fraunces and DM Sans typefaces
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/) — Performance auditing and guidance

---

_Project Status: ✅ Complete — March 2026_
_Built with 💜 and lots of 🫖 in England_
