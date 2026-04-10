// ===================================================
// ExamBoost AI — app.js
// ===================================================

const CLAUDE_API_KEY = "YOUR_API_KEY_HERE"; // ← Step 4: replace this
const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";
const QUESTIONS_PER_SESSION = 10;

// ===== STATE =====
let state = {
  subject: "",
  sessionQuestions: [],
  currentIndex: 0,
  selectedOption: null,
  score: 0,
  answered: false,
  performance: {} // { topicName: { correct: N, total: N } }
};

// ===== DOM REFS =====
const subjectSelect    = document.getElementById("subject-select");
const startBtn         = document.getElementById("start-btn");
const selectorSection  = document.getElementById("selector-section");
const questionSection  = document.getElementById("question-section");
const feedbackSection  = document.getElementById("feedback-section");
const summarySection   = document.getElementById("summary-section");
const trackerSection   = document.getElementById("tracker-section");

const subjectLabel     = document.getElementById("current-subject-label");
const topicLabel       = document.getElementById("current-topic-label");
const questionCounter  = document.getElementById("question-counter");
const questionText     = document.getElementById("question-text");
const optionsList      = document.getElementById("options-list");
const submitBtn        = document.getElementById("submit-btn");
const nextBtn          = document.getElementById("next-btn");

const feedbackBadge    = document.getElementById("feedback-badge");
const correctAnswerDisplay = document.getElementById("correct-answer-display");
const explanationText  = document.getElementById("explanation-text");

const scoreDisplay     = document.getElementById("score-display");
const weakAreasList    = document.getElementById("weak-areas-list");
const restartBtn       = document.getElementById("restart-btn");
const topicStats       = document.getElementById("topic-stats");

// ===== INIT =====
subjectSelect.addEventListener("change", () => {
  startBtn.disabled = subjectSelect.value === "";
});

startBtn.addEventListener("click", startSession);
submitBtn.addEventListener("click", submitAnswer);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", resetToStart);

// ===== SESSION MANAGEMENT =====
function startSession() {
  state.subject = subjectSelect.value;
  state.currentIndex = 0;
  state.score = 0;
  state.answered = false;
  state.selectedOption = null;

  // Pull questions for selected subject
  const pool = (questions[state.subject] || []).slice();
  if (pool.length === 0) {
    alert("No questions found for this subject yet. Please try another.");
    return;
  }

  // Shuffle and pick QUESTIONS_PER_SESSION
  shuffle(pool);
  state.sessionQuestions = pool.slice(0, QUESTIONS_PER_SESSION);

  // Show question section, hide others
  selectorSection.classList.add("hidden");
  summarySection.classList.add("hidden");
  feedbackSection.classList.add("hidden");
  questionSection.classList.remove("hidden");

  renderQuestion();
}

function resetToStart() {
  summarySection.classList.add("hidden");
  feedbackSection.classList.add("hidden");
  questionSection.classList.add("hidden");
  selectorSection.classList.remove("hidden");
  subjectSelect.value = "";
  startBtn.disabled = true;
}

// ===== QUESTION RENDERING =====
function renderQuestion() {
  const q = state.sessionQuestions[state.currentIndex];
  state.answered = false;
  state.selectedOption = null;

  // Meta labels
  subjectLabel.textContent = formatSubject(state.subject);
  topicLabel.textContent = q.topic || "General";
  questionCounter.textContent =
    `Question ${state.currentIndex + 1} of ${state.sessionQuestions.length}`;

  // Question text
  questionText.textContent = q.question;

  // Options
  optionsList.innerHTML = "";
  const letters = ["A", "B", "C", "D"];
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.dataset.index = i;
    btn.innerHTML = `
      <span class="option-letter">${letters[i]}</span>
      <span class="option-text">${opt}</span>
    `;
    btn.addEventListener("click", () => selectOption(btn, i));
    optionsList.appendChild(btn);
  });

  // Reset action buttons
  submitBtn.disabled = true;
  submitBtn.classList.remove("hidden");
  nextBtn.classList.add("hidden");

  // Hide feedback
  feedbackSection.classList.add("hidden");
}

function selectOption(clickedBtn, index) {
  if (state.answered) return;

  // Deselect all
  document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));

  // Select clicked
  clickedBtn.classList.add("selected");
  state.selectedOption = index;
  submitBtn.disabled = false;
}

// ===== ANSWER CHECKING =====
function submitAnswer() {
  if (state.selectedOption === null || state.answered) return;
  state.answered = true;

  const q = state.sessionQuestions[state.currentIndex];
  const isCorrect = state.selectedOption === q.answer;

  // Update score
  if (isCorrect) state.score++;

  // Update performance tracking
  const topic = q.topic || "General";
  if (!state.performance[topic]) {
    state.performance[topic] = { correct: 0, total: 0 };
  }
  state.performance[topic].total++;
  if (isCorrect) state.performance[topic].correct++;

  // Style options
  const optionBtns = document.querySelectorAll(".option-btn");
  optionBtns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add("correct");
    else if (i === state.selectedOption && !isCorrect) btn.classList.add("wrong");
  });

  // Show feedback
  showFeedback(isCorrect, q);

  // Update tracker
  renderTracker();

  // Swap buttons
  submitBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
}

// ===== FEEDBACK & AI EXPLANATION =====
function showFeedback(isCorrect, q) {
  feedbackSection.classList.remove("hidden");

  // Badge
  feedbackBadge.textContent = isCorrect ? "✓ Correct!" : "✗ Incorrect";
  feedbackBadge.className = "feedback-badge " + (isCorrect ? "correct" : "wrong");

  // Show correct answer text if wrong
  if (!isCorrect) {
    const letters = ["A", "B", "C", "D"];
    correctAnswerDisplay.textContent =
      `Correct answer: ${letters[q.answer]}. ${q.options[q.answer]}`;
  } else {
    correctAnswerDisplay.textContent = "";
  }

  // AI explanation — show loading state then fetch
  explanationText.textContent = "";
  explanationText.classList.add("loading-dots");
  fetchExplanation(q, isCorrect);
}

async function fetchExplanation(q, isCorrect) {
  const prompt = `
You are a helpful Nigerian secondary school exam tutor.

A student is practicing for WAEC/NECO exams. They just answered this question:

Subject: ${formatSubject(state.subject)}
Topic: ${q.topic || "General"}
Question: ${q.question}
Options: ${q.options.map((o, i) => `${["A","B","C","D"][i]}. ${o}`).join(" | ")}
Correct answer: ${["A","B","C","D"][q.answer]}. ${q.options[q.answer]}
Student answered: ${isCorrect ? "correctly" : "incorrectly"}

Give a clear, concise explanation (3–5 sentences) of why the correct answer is right. 
Use simple English suitable for a Nigerian secondary school student.
Do not repeat the question. Go straight to the explanation.
`.trim();

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    explanationText.classList.remove("loading-dots");

    if (data.content && data.content[0] && data.content[0].text) {
      explanationText.textContent = data.content[0].text;
    } else if (data.error) {
      explanationText.textContent =
        `⚠ Could not load explanation: ${data.error.message}`;
    } else {
      explanationText.textContent =
        "Explanation unavailable. Check your API key in app.js.";
    }

  } catch (err) {
    explanationText.classList.remove("loading-dots");
    explanationText.textContent =
      "⚠ Network error — could not reach the AI. Check your connection and API key.";
    console.error("Claude API error:", err);
  }
}

// ===== NAVIGATION =====
function nextQuestion() {
  state.currentIndex++;

  if (state.currentIndex >= state.sessionQuestions.length) {
    showSummary();
  } else {
    renderQuestion();
  }
}

// ===== SESSION SUMMARY =====
function showSummary() {
  questionSection.classList.add("hidden");
  feedbackSection.classList.add("hidden");
  summarySection.classList.remove("hidden");

  scoreDisplay.textContent = state.score;

  // Weak area recommendations
  weakAreasList.innerHTML = "";
  const weak = Object.entries(state.performance)
    .filter(([, v]) => v.total > 0 && (v.correct / v.total) < 0.6)
    .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total));

  if (weak.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Great job! No major weak areas this session. Keep practicing!";
    weakAreasList.appendChild(li);
  } else {
    weak.forEach(([topic, v]) => {
      const pct = Math.round((v.correct / v.total) * 100);
      const li = document.createElement("li");
      li.textContent = `${topic} — ${pct}% accuracy. Review this topic before your exam.`;
      weakAreasList.appendChild(li);
    });
  }
}

// ===== PERFORMANCE TRACKER =====
function renderTracker() {
  if (Object.keys(state.performance).length === 0) return;

  topicStats.innerHTML = "";

  Object.entries(state.performance).forEach(([topic, v]) => {
    const pct = Math.round((v.correct / v.total) * 100);
    const level = pct >= 70 ? "high" : pct >= 40 ? "medium" : "low";

    const row = document.createElement("div");
    row.className = "topic-row";
    row.innerHTML = `
      <span class="topic-name" title="${topic}">${topic}</span>
      <div class="topic-bar-bg">
        <div class="topic-bar-fill ${level}" style="width: ${pct}%"></div>
      </div>
      <span class="topic-pct">${pct}%</span>
    `;
    topicStats.appendChild(row);
  });
}

// ===== HELPERS =====
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function formatSubject(slug) {
  const map = {
    mathematics: "Mathematics",
    english:     "English Language",
    biology:     "Biology",
    chemistry:   "Chemistry",
    physics:     "Physics",
    geography:   "Geography",
    economics:   "Economics",
    government:  "Government",
    literature:  "Literature in English",
    civic:       "Civic Education"
  };
  return map[slug] || slug;
}