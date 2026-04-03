/**
 * app.js — Haupt-Controller
 *
 * Hash-Router: Liest den URL-Hash (z.B. #variablen) und rendert
 * das entsprechende Kapitel. Steuert Sidebar-Navigation und
 * mobile Menü-Toggle.
 */

document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  initMobileMenu();
  navigateToCurrentHash();
  window.addEventListener("hashchange", navigateToCurrentHash);
});

/* ==========================================
   ROUTING
   ========================================== */

function navigateToCurrentHash() {
  const hash = location.hash.slice(1) || CHAPTERS[0]?.id;
  if (!hash) return;

  const chapter = findChapter(hash);
  if (!chapter) {
    renderNotFound(hash);
    return;
  }

  renderChapter(chapter);
  updateSidebarActive(chapter.id);
  updateTopbar(chapter);
  updateChapterNav(chapter);
  updateProgressUI();
  closeMobileMenu();

  // Scroll to top
  document
    .getElementById("chapter-content")
    ?.scrollIntoView({ behavior: "instant" });
}

function findChapter(id) {
  if (typeof CHAPTERS === "undefined") return null;
  return CHAPTERS.find((ch) => ch.id === id) || null;
}

function getChapterIndex(id) {
  return CHAPTERS.findIndex((ch) => ch.id === id);
}

/* ==========================================
   RENDERING
   ========================================== */

function renderChapter(chapter) {
  const container = document.getElementById("chapter-content");
  if (!container) return;

  const index = getChapterIndex(chapter.id);

  // Build chapter header
  let html = `
    <div class="chapter-header fade-in">
      <div class="chapter-header-meta">
        <span class="chapter-icon">${chapter.icon}</span>
        <span class="chapter-number">Kapitel ${index + 1}</span>
      </div>
      <h1>${chapter.title}</h1>
      <p>${chapter.subtitle}</p>
    </div>
  `;

  // Story intro
  if (chapter.storyIntro) {
    html += `
      <div class="chapter-story fade-in">
        <div class="chapter-story-icon">🏪</div>
        <p><strong>TechStore:</strong> ${chapter.storyIntro}</p>
      </div>
    `;
  }

  // Render each section
  html += chapter.sections
    .map((section, sectionIndex) =>
      Renderer.render(section, chapter.id, sectionIndex),
    )
    .join("");

  // Mark as completed button
  const isCompleted = Progress.isCompleted(chapter.id);
  html += `
    <div class="section text-center fade-in">
      <button
        id="complete-btn"
        class="btn ${isCompleted ? "btn-success" : "btn-primary"} btn-lg"
        onclick="toggleChapterComplete('${chapter.id}')"
      >
        ${isCompleted ? "✓ Kapitel abgeschlossen" : "Kapitel als abgeschlossen markieren"}
      </button>
    </div>
  `;

  container.innerHTML = html;

  // Update page title
  document.title = `${chapter.title} — JavaScript Lernen`;

  // Initialize interactive components after DOM is ready
  Playground.initAll();
  Quiz.initAll();
  Demos.init(chapter.id);
}

function renderNotFound(hash) {
  const container = document.getElementById("chapter-content");
  if (!container) return;
  container.innerHTML = `
    <div class="text-center p-lg fade-in">
      <h2>Kapitel nicht gefunden</h2>
      <p>Das Kapitel "${hash}" existiert nicht.</p>
      <a href="index.html" class="btn btn-primary">Zurück zur Übersicht</a>
    </div>
  `;
}

/* ==========================================
   CHAPTER COMPLETE TOGGLE
   ========================================== */

function toggleChapterComplete(chapterId) {
  const data = JSON.parse(
    localStorage.getItem("techstore-learn-progress") ||
      '{"completed":[],"quizResults":{}}',
  );
  const idx = data.completed.indexOf(chapterId);

  if (idx === -1) {
    data.completed.push(chapterId);
  } else {
    data.completed.splice(idx, 1);
  }

  localStorage.setItem("techstore-learn-progress", JSON.stringify(data));

  const btn = document.getElementById("complete-btn");
  const isNowComplete = data.completed.includes(chapterId);
  if (btn) {
    btn.className = `btn ${isNowComplete ? "btn-success" : "btn-primary"} btn-lg`;
    btn.textContent = isNowComplete
      ? "✓ Kapitel abgeschlossen"
      : "Kapitel als abgeschlossen markieren";
  }

  updateSidebarActive(chapterId);
  updateProgressUI();
}

/* ==========================================
   SIDEBAR
   ========================================== */

function initSidebar() {
  const nav = document.getElementById("sidebar-nav");
  if (!nav || typeof CHAPTERS === "undefined") return;

  nav.innerHTML = CHAPTERS.map((ch, i) => {
    const completed = Progress.isCompleted(ch.id);
    return `
      <a href="#${ch.id}"
         class="sidebar-link ${completed ? "completed" : ""}"
         data-chapter="${ch.id}">
        <span class="sidebar-link-icon">${ch.icon}</span>
        <span>${ch.title}</span>
        <span class="sidebar-link-check" aria-hidden="true">✓</span>
      </a>
    `;
  }).join("");
}

function updateSidebarActive(activeId) {
  document.querySelectorAll(".sidebar-link").forEach((link) => {
    const id = link.dataset.chapter;
    const completed = Progress.isCompleted(id);
    link.classList.toggle("active", id === activeId);
    link.classList.toggle("completed", completed);
  });
}

/* ==========================================
   CHAPTER NAV (Prev/Next)
   ========================================== */

function updateChapterNav(chapter) {
  const navEl = document.getElementById("chapter-nav");
  if (!navEl) return;

  const index = getChapterIndex(chapter.id);
  const prev = index > 0 ? CHAPTERS[index - 1] : null;
  const next = index < CHAPTERS.length - 1 ? CHAPTERS[index + 1] : null;

  let html = "";

  if (prev) {
    html += `
      <a href="#${prev.id}" class="chapter-nav-link chapter-nav-prev">
        <span class="chapter-nav-link-label">← Vorheriges Kapitel</span>
        <span class="chapter-nav-link-title">${prev.icon} ${prev.title}</span>
      </a>
    `;
  } else {
    html += `<div></div>`;
  }

  if (next) {
    html += `
      <a href="#${next.id}" class="chapter-nav-link chapter-nav-next">
        <span class="chapter-nav-link-label">Nächstes Kapitel →</span>
        <span class="chapter-nav-link-title">${next.icon} ${next.title}</span>
      </a>
    `;
  }

  navEl.innerHTML = html;
}

/* ==========================================
   TOPBAR & PROGRESS
   ========================================== */

function updateTopbar(chapter) {
  const title = document.getElementById("topbar-title");
  if (title) title.textContent = chapter.title;
}

function updateProgressUI() {
  const completed = Progress.getCompletedCount();
  const total = CHAPTERS.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const text = document.getElementById("sidebar-progress-text");
  const fill = document.getElementById("sidebar-progress-fill");

  if (text) text.textContent = `${completed} / ${total}`;
  if (fill) fill.style.width = `${pct}%`;
}

/* ==========================================
   MOBILE MENU
   ========================================== */

function initMobileMenu() {
  const toggle = document.getElementById("sidebar-toggle");
  const close = document.getElementById("sidebar-close");
  const overlay = document.getElementById("sidebar-overlay");

  if (toggle) toggle.addEventListener("click", openMobileMenu);
  if (close) close.addEventListener("click", closeMobileMenu);
  if (overlay) overlay.addEventListener("click", closeMobileMenu);
}

function openMobileMenu() {
  document.getElementById("sidebar")?.classList.add("open");
  document.getElementById("sidebar-overlay")?.classList.remove("hidden");
}

function closeMobileMenu() {
  document.getElementById("sidebar")?.classList.remove("open");
  document.getElementById("sidebar-overlay")?.classList.add("hidden");
}
