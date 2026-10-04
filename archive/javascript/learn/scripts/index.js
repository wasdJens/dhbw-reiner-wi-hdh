/**
 * index.js — Landing Page Logic
 *
 * Rendert die Kapitelübersicht auf der Startseite
 * und zeigt den aktuellen Fortschritt an.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderChapterGrid();
  updateProgress();
});

function renderChapterGrid() {
  const grid = document.getElementById("chapter-grid");
  if (!grid || typeof CHAPTERS === "undefined") return;

  grid.innerHTML = CHAPTERS.map((ch, index) => {
    const completed = Progress.isCompleted(ch.id);
    return `
      <a href="chapter.html#${ch.id}"
         class="chapter-card ${completed ? "completed" : ""}"
         aria-label="Kapitel ${index + 1}: ${ch.title}">
        <div class="chapter-card-icon">${ch.icon}</div>
        <div class="chapter-card-body">
          <div class="chapter-card-number">Kapitel ${index + 1}</div>
          <div class="chapter-card-title">${ch.title}</div>
          <p class="chapter-card-subtitle">${ch.subtitle}</p>
        </div>
        <div class="chapter-card-status">
          <div class="chapter-card-check" aria-hidden="true">✓</div>
        </div>
      </a>
    `;
  }).join("");
}

function updateProgress() {
  const completed = Progress.getCompletedCount();
  const total = typeof CHAPTERS !== "undefined" ? CHAPTERS.length : 7;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const text = document.getElementById("progress-text");
  const fill = document.getElementById("progress-fill");

  if (text) text.textContent = `${completed} / ${total} abgeschlossen`;
  if (fill) fill.style.width = `${pct}%`;
}
