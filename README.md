# ExamBoost AI 📚

**AI-powered WAEC/NECO exam practice platform for Nigerian secondary school students.**

> Built for the Scholar Hackathon — Scholar Team 03 · Phase 3 MVP Submission

---

## What It Does

ExamBoost AI gives SS3 students preparing for WAEC and NECO examinations a smarter way to practise. Instead of just showing whether an answer is right or wrong, the platform:

- Delivers **instant AI-generated explanations** for every question
- **Tracks performance topic-by-topic** across all 10 available subjects
- **Identifies weak areas** after each session and recommends targeted study resources
- **Persists progress** across browser sessions using local storage
- Runs entirely in the browser — **no installation, no account, no cost to the student**

---

## Live Demo

🔗 **[examboost-ai demo link — add your GitHub Pages URL here]**

---

## Problem Statement

SS3 students preparing for WAEC/NECO lack access to personalised feedback on practice questions, making it difficult to identify weak areas and improve efficiently. Past question booklets and basic CBT apps show correct answers but do not explain *why* a student got something wrong or track which topics need more attention.

**ExamBoost AI solves this** by providing instant, topic-aware feedback and a live performance tracker that guides students toward more targeted, effective revision.

---

## Features (MVP Scope)

| Feature | Status |
|---|---|
| Practice question interface (MCQ) | ✅ Done |
| Instant answer checking | ✅ Done |
| AI-generated explanation per question | ✅ Done (mock mode — real API ready) |
| Performance tracking per topic | ✅ Done |
| Weak area identification + study tips | ✅ Done |
| Session summary with score ring | ✅ Done |
| Progress persisted across page reloads | ✅ Done |
| Keyboard navigation (A/B/C/D + Enter) | ✅ Done |
| 10 subjects, 64 WAEC-standard questions | ✅ Done |
| Fully responsive (mobile + desktop) | ✅ Done |

---

## Subjects Available

Mathematics · English Language · Biology · Chemistry · Physics ·
Geography · Economics · Government · Literature in English · Civic Education

---

## How the AI Works

This section explains the model logic as required by the hackathon brief.

### Architecture

```
Student selects subject
        ↓
Questions filtered from local bank & shuffled
        ↓
Student answers MCQ → answer checked client-side
        ↓
Correct/incorrect result + topic recorded in state
        ↓
AI Explanation fetched (see below)
        ↓
Session ends → weak topics surfaced → study tips generated
```

### AI Explanation Layer

When a student submits an answer, the app calls the **Anthropic Claude API** (`claude-sonnet-4-20250514`) with a prompt that includes:

- The subject and topic
- The full question text and all four options
- Which answer is correct
- Whether the student answered correctly or not

Claude returns a 3–5 sentence explanation written for a Nigerian SS3 student — plain English, no jargon, directly explaining *why* the correct answer is right.

**Current deployment mode:** The Claude API call is scaffolded and ready. For this MVP submission, the app runs in **mock mode** — explanations are served from the `explanation_hint` field already embedded in each question object. This keeps the demo fully functional without requiring an API key. The live API call is one `uncomment` away (see `app.js` lines 750–800).

### Weak Area Detection

After each session, the app computes per-topic accuracy from `state.sessionPerformance`:

```
accuracy = (correct answers in topic) / (total questions in topic)
```

Topics where accuracy < 70% are surfaced as weak areas, sorted worst-first. Each weak area card shows: score, a mini accuracy bar, 3 topic-specific study tips, recommended Nigerian textbooks, and an encouragement message — all drawn from a curated `studyTips` database covering 30+ WAEC topics.

### Performance Persistence

Session and lifetime performance data are stored in `localStorage` under keys `eb_performance` and `eb_totals`. On next visit, the tracker and header stats restore automatically with no server required.

---

## Project Structure

```
examboost-ai/
├── index.html        # App shell — semantic HTML, single-page layout
├── style.css         # Design system — CSS variables, components, responsive
├── app.js            # All application logic — state, quiz engine, API call
├── questions.js      # Question bank — 64 WAEC-standard MCQs across 10 subjects
└── README.md         # This file
```

### Code Structure Notes

- **`app.js`** follows a clear state-machine pattern: `startSession → renderQuestion → submitAnswer → showFeedback → nextQuestion → showSummary → resetToStart`
- **`questions.js`** is a plain JS array of question objects with fields: `id`, `subject`, `topic`, `question`, `options[]`, `answer`, `explanation_hint`
- **`style.css`** uses a design token system (`--primary`, `--wrong`, `--correct`, etc.) for consistent theming and easy customisation
- No build tools, no frameworks, no dependencies — pure HTML/CSS/JS

---

## How to Run Locally

1. Clone or download this repository
2. Open `index.html` in any modern browser
3. That's it — no server, no npm install, no build step

```bash
git clone https://github.com/YOUR_USERNAME/examboost-ai.git
cd examboost-ai
open index.html   # or just double-click the file
```

---

## Enabling Real AI Explanations (Post-Hackathon)

When an API key is available:

1. Set up a serverless proxy (Cloudflare Worker or Vercel Edge Function) that holds the key server-side
2. In `app.js`, uncomment the `fetchExplanation` live API block (lines ~750–800) and comment out the mock block below it
3. Update `CLAUDE_API_URL` to point to your proxy endpoint instead of the Anthropic API directly

> **Important:** Never place a real API key directly in client-side JavaScript. The proxy pattern keeps your key secure.

---

## Team

**Scholar Team 03** — built during the Scholar Hackathon, Phase 3 (April 7–12, 2026)

---

## Acknowledgements

- Questions sourced and adapted from WAEC past papers (2015–2023)
- Study tips reference: New General Mathematics (SS3), New School Chemistry (Ababio), New School Physics (Anyakoha), Countdown to WAEC English (Macmillan), Amplified Economics (Femi Longe)
- AI explanations powered by [Claude](https://claude.ai) by Anthropic
