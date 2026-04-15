# ExamBoost AI — Improvement Log
**Phase 4: Testing & Iteration · Scholar Hackathon Team 03**
**Period:** April 13–14, 2026

---

## Phase 2–3 Fixes (Pre-Phase 4)

### IMP-001 · Critical · Fixed
**Issue:** "No questions found" alert for all subjects.
**Root cause:** Flat array in questions.js vs object lookup in app.js.
**Fix:** Rewrote startSession() to filter flat array by subject name.

### IMP-002 · Critical · Fixed
**Issue:** Every answer marked incorrect regardless of selection.
**Root cause:** answer stored as string, compared to numeric index.
**Fix:** Added options.indexOf(answer) conversion step.

### IMP-003 · High · Fixed
**Issue:** English Language returned no questions.
**Root cause:** Subject labelled "English" not "English Language".
**Fix:** Relabelled all English questions in questions.js.

### IMP-004 · High · Fixed
**Issue:** Score showed 2/10 when only 6 questions existed.
**Root cause:** Denominator hardcoded as 10.
**Fix:** Denominator now reads sessionQuestions.length dynamically.

### IMP-005 · Medium · Fixed
**Issue:** Weak areas showed only a generic one-line message.
**Root cause:** No study tips data in initial build.
**Fix:** Built studyTips database covering 30+ WAEC topics.

### IMP-006 · Medium · Fixed
**Issue:** UI too basic — system fonts, flat cards, no visual hierarchy.
**Root cause:** Initial CSS was functional only.
**Fix:** Full CSS rewrite with DM Sans fonts, navy/green palette, SVG score ring.

---

## Phase 4 Fixes (Confirmed by Code Review & Testing)

### BUG-01 · High · Fixed
**Discovered by:** Persona C simulation + direct code review
**Issue:** state.performance and state.totalAnswered not reset on subject change — previous session data bleeds into new session.
**Root cause:** resetToStart() only toggled UI visibility, did not clear state.
**Fix:** Added state.performance = {}, state.totalAnswered = 0, state.score = 0 to resetToStart().

### BUG-02 · High · Fixed
**Discovered by:** Failure Scenario 2 — rapid navigation stress test
**Issue:** Double-clicking "Next Question" incremented index twice, skipping questions.
**Root cause:** nextQuestion() had no guard against concurrent calls.
**Fix:** Added state.navigating boolean flag. Guard added at top of nextQuestion(). Reset inside renderQuestion().

### BUG-03 · Medium · Fixed
**Discovered by:** Output validation OV-15
**Issue:** Header accuracy showed "0%" on first load before any answers given.
**Root cause:** accuracy variable initialised to 0 and always appended "%" even when totalAnswered = 0.
**Fix:** Changed to ternary: totalQ > 0 ? pct + "%" : "—"

### BUG-04 · High · Fixed
**Discovered by:** Direct code review — DOM ref mismatch
**Issue:** scoreRing targets id="score-ring" but index.html uses SVG arc id="score-arc". Ring never changed colour.
**Root cause:** index.html updated to SVG arc during UI upgrade; app.js DOM refs not updated to match.
**Fix:** Updated DOM ref to score-arc and switched to stroke-dashoffset animation with requestAnimationFrame wrapper for Firefox compatibility.

### BUG-05 · Low · Fixed
**Discovered by:** Direct code review
**Issue:** feedbackSection2 declared as duplicate variable pointing to same element as feedbackSection — dead code.
**Root cause:** Copy-paste artefact from earlier refactor.
**Fix:** Removed feedbackSection2 entirely.

### BUG-06 · Medium · Fixed
**Discovered by:** Persona C cross-session accuracy check
**Issue:** Stale state.score from previous session used as accuracy numerator in new session, producing inflated accuracy %.
**Root cause:** state.score not cleared in resetToStart() (covered by BUG-01 fix).
**Fix:** state.score = 0 added to resetToStart() as part of BUG-01 resolution.

---

## Deferred Items

| ID | Description | Reason |
|---|---|---|
| DEF-001 | Live Claude API integration | Requires API key + backend proxy |
| DEF-002 | localStorage persistence across sessions | Out of scope for MVP |
| DEF-003 | Timer auto-submit on expiry | Deferred to avoid penalising slow readers |
| DEF-004 | More questions for Literature and Civic Education | Content work post-hackathon |
| DEF-005 | Difficulty levels SS1/SS2/SS3 | Requires additional question authoring |

---

*Scholar Team 03 · April 14, 2026*
