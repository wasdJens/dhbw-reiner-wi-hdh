/**
 * quiz.js — Quiz-System
 *
 * Rendert Multiple-Choice-Fragen aus den Content-Daten,
 * wertet Antworten aus, zeigt Feedback und speichert
 * Ergebnisse via Progress.
 */

const Quiz = (() => {
  function initAll() {
    document.querySelectorAll(".quiz-container").forEach(initQuiz);
  }

  function initQuiz(container) {
    let questions;
    try {
      questions = JSON.parse(container.dataset.questions || "[]");
    } catch {
      console.warn("Quiz: Could not parse questions JSON");
      return;
    }

    if (!questions.length) return;

    // Derive chapterId + sectionIndex from parent
    const section = container.closest(".quiz-section");
    const chapterId = section?.dataset.chapter || "unknown";
    const sectionIndex = section ? parseInt(section.dataset.index, 10) : 0;

    container.innerHTML = questions
      .map((q, qIndex) => renderQuestion(q, qIndex, chapterId, sectionIndex))
      .join("");

    // Restore any saved answers
    questions.forEach((q, qIndex) => {
      const saved = Progress.getQuizResult(
        chapterId,
        `${sectionIndex}-${qIndex}`,
      );
      if (saved !== null) {
        revealAnswer(
          container,
          qIndex,
          q.correct,
          saved ? q.correct : -1,
          q.explanation,
        );
      }
    });

    // Attach click handlers
    container.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.addEventListener("click", handleOptionClick);
    });
  }

  function handleOptionClick(e) {
    const btn = e.currentTarget;
    if (btn.disabled) return;

    const questionEl = btn.closest(".quiz-question");
    const container = btn.closest(".quiz-container");
    const qIndex = parseInt(questionEl.dataset.qIndex, 10);
    const chosenIndex = parseInt(btn.dataset.optionIndex, 10);

    // Find correct answer index from a data attribute we set during render
    const correctIndex = parseInt(questionEl.dataset.correct, 10);
    const explanation = questionEl.dataset.explanation || "";
    const chapterId =
      container.closest(".quiz-section")?.dataset.chapter || "unknown";
    const sectionIndex = parseInt(
      container.closest(".quiz-section")?.dataset.index || "0",
      10,
    );

    const isCorrect = chosenIndex === correctIndex;

    Progress.saveQuizResult(chapterId, `${sectionIndex}-${qIndex}`, isCorrect);
    revealAnswer(container, qIndex, correctIndex, chosenIndex, explanation);
  }

  function revealAnswer(
    container,
    qIndex,
    correctIndex,
    chosenIndex,
    explanation,
  ) {
    const questionEl = container.querySelector(`[data-q-index="${qIndex}"]`);
    if (!questionEl) return;

    const isCorrect = chosenIndex === correctIndex;

    // Disable all options and apply visual states
    questionEl.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.disabled = true;
      const idx = parseInt(btn.dataset.optionIndex, 10);
      const dot = btn.querySelector(".quiz-option-dot");

      if (idx === correctIndex) {
        btn.classList.add("correct");
        if (dot) dot.innerHTML = "✓";
      } else if (idx === chosenIndex && !isCorrect) {
        btn.classList.add("wrong");
        if (dot) dot.innerHTML = "✗";
      }
    });

    // Show feedback
    const existingFeedback = questionEl.querySelector(".quiz-feedback");
    if (existingFeedback) return; // Already shown

    const feedbackEl = document.createElement("div");
    feedbackEl.className = `quiz-feedback ${isCorrect ? "correct" : "wrong"}`;
    feedbackEl.innerHTML = `
      <div class="quiz-feedback-icon">${isCorrect ? "✅" : "❌"}</div>
      <div class="quiz-feedback-text">
        <strong>${isCorrect ? "Richtig!" : "Leider falsch."}</strong>
        ${explanation ? `<span>${Renderer.formatText(explanation)}</span>` : ""}
      </div>
    `;

    questionEl.appendChild(feedbackEl);

    // Update summary if all questions answered
    updateSummary(container);
  }

  function updateSummary(container) {
    const allQuestions = container.querySelectorAll(".quiz-question");
    const answeredCount =
      container.querySelectorAll(".quiz-option:disabled").length > 0
        ? container.querySelectorAll(".quiz-question:has(.quiz-feedback)")
            .length
        : 0;

    if (answeredCount < allQuestions.length) return;

    const correctCount = container.querySelectorAll(
      ".quiz-feedback.correct",
    ).length;
    const total = allQuestions.length;

    const existing = container.querySelector(".quiz-summary");
    if (existing) return;

    const summaryEl = document.createElement("div");
    summaryEl.className = "quiz-summary fade-in";

    const pct = Math.round((correctCount / total) * 100);
    let emoji = pct === 100 ? "🎉" : pct >= 60 ? "👍" : "💪";

    summaryEl.innerHTML = `
      <div class="quiz-summary-score">${emoji} ${correctCount} / ${total}</div>
      <div class="quiz-summary-label">${
        pct === 100
          ? "Perfekt! Alle Fragen richtig."
          : pct >= 60
            ? "Gut gemacht! Lies die Erklärungen nochmal durch."
            : "Noch etwas Übung nötig — kein Problem!"
      }</div>
    `;
    container.appendChild(summaryEl);
  }

  function renderQuestion(q, qIndex, chapterId, sectionIndex) {
    const options = q.options
      .map(
        (opt, i) => `
        <button class="quiz-option" data-option-index="${i}" aria-label="Option ${i + 1}: ${escapeAttr(opt)}">
          <span class="quiz-option-dot" aria-hidden="true"></span>
          <span class="quiz-option-label">${Renderer.formatText(opt)}</span>
        </button>
      `,
      )
      .join("");

    return `
      <div class="quiz-question"
           data-q-index="${qIndex}"
           data-correct="${q.correct}"
           data-explanation="${escapeAttr(q.explanation || "")}">
        <div class="quiz-question-text">
          <span class="quiz-question-number">${qIndex + 1}</span>
          <span>${Renderer.formatText(q.question)}</span>
        </div>
        <div class="quiz-options" role="group" aria-label="Antwortmöglichkeiten">
          ${options}
        </div>
      </div>
    `;
  }

  function escapeAttr(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  return { initAll };
})();
