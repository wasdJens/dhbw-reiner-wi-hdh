/**
 * renderer.js — Section Renderer
 *
 * Nimmt ein Section-Objekt aus den Content-Daten und erzeugt
 * das passende HTML. Jeder Section-Type hat seine eigene
 * Render-Funktion.
 */

const Renderer = (() => {
  function render(section, chapterId, sectionIndex) {
    const renderers = {
      explanation: renderExplanation,
      "code-example": renderCodeExample,
      playground: renderPlayground,
      quiz: renderQuiz,
      demo: renderDemo,
      pitfall: renderPitfall,
      comparison: renderComparison,
    };

    const fn = renderers[section.type];
    if (!fn) {
      console.warn(`Unknown section type: ${section.type}`);
      return "";
    }

    return `<div class="section fade-in" data-section-type="${section.type}">${fn(section, chapterId, sectionIndex)}</div>`;
  }

  /* ==========================================
     EXPLANATION
     ========================================== */

  function renderExplanation(section) {
    let html = "";

    if (section.title) {
      html += `<h2 class="section-title">${section.title}</h2>`;
    }

    if (section.content) {
      html += `<div class="explanation-content">${formatText(section.content)}</div>`;
    }

    if (section.keyPoints?.length) {
      html += `<ul class="key-points" role="list">`;
      html += section.keyPoints
        .map((p) => `<li class="key-point">${formatText(p)}</li>`)
        .join("");
      html += `</ul>`;
    }

    if (section.businessContext) {
      html += `<div class="business-context">${formatText(section.businessContext)}</div>`;
    }

    return html;
  }

  /* ==========================================
     CODE EXAMPLE
     ========================================== */

  function renderCodeExample(section) {
    let html = "";

    if (section.title) {
      html += `<h3 class="section-title">💻 ${section.title}</h3>`;
    }

    html += `<div class="code-example-wrapper">`;
    html += `
      <div class="code-example-header">
        <span class="code-example-lang">JavaScript</span>
        <button class="code-example-copy" onclick="Renderer.copyCode(this)" data-code="${escapeAttr(section.code)}">
          Kopieren
        </button>
      </div>
    `;
    html += `<pre><code>${highlightCode(section.code, section.highlightLines)}</code></pre>`;
    html += `</div>`;

    if (section.explanation) {
      html += `<div class="code-explanation">${formatText(section.explanation)}</div>`;
    }

    return html;
  }

  /* ==========================================
     PLAYGROUND
     ========================================== */

  function renderPlayground(section, chapterId, sectionIndex) {
    const isBonus = section.difficulty === "bonus";
    const badgeHtml = isBonus
      ? `<span class="badge badge-bonus">🔥 Bonus</span>`
      : `<span class="badge badge-primary">Aufgabe</span>`;

    return `
      <div class="playground-section" data-chapter="${chapterId}" data-index="${sectionIndex}">
        <h3 class="section-title">${badgeHtml} ${section.title}</h3>
        ${section.description ? `<p class="text-small text-muted mb-sm">${section.description}</p>` : ""}
        <div class="playground"
             data-starter-code="${escapeAttr(section.starterCode || "")}"
             data-hint="${escapeAttr(section.hint || "")}">
        </div>
      </div>
    `;
  }

  /* ==========================================
     QUIZ
     ========================================== */

  function renderQuiz(section, chapterId, sectionIndex) {
    return `
      <div class="quiz-section" data-chapter="${chapterId}" data-index="${sectionIndex}">
        <h3 class="section-title">🧠 Wissenscheck</h3>
        <div class="quiz-container" data-questions='${escapeAttr(JSON.stringify(section.questions))}'>
        </div>
      </div>
    `;
  }

  /* ==========================================
     DEMO
     ========================================== */

  function renderDemo(section) {
    return `
      <div class="demo-section">
        <h3 class="section-title">🎮 ${section.title}</h3>
        ${section.description ? `<p class="text-small text-muted mb-sm">${section.description}</p>` : ""}
        <div class="demo-container card" data-demo-id="${section.demoId}">
          <div class="text-center p-md text-muted">Demo wird geladen…</div>
        </div>
      </div>
    `;
  }

  /* ==========================================
     PITFALL
     ========================================== */

  function renderPitfall(section) {
    let html = "";

    if (section.title) {
      html += `<h3 class="section-title">⚠️ ${section.title}</h3>`;
    }

    if (section.mistakes?.length) {
      html += section.mistakes
        .map(
          (m) => `
        <div class="pitfall-card">
          <div class="pitfall-header">⚠️ Häufiger Fehler</div>
          <div class="pitfall-body">
            <div class="pitfall-comparison">
              <div class="pitfall-bad">
                <div class="pitfall-bad-label">✗ Vermeiden</div>
                <pre><code>${highlightCode(m.bad)}</code></pre>
              </div>
              <div class="pitfall-good">
                <div class="pitfall-good-label">✓ Besser</div>
                <pre><code>${highlightCode(m.good)}</code></pre>
              </div>
            </div>
            <div class="pitfall-why">${formatText(m.why)}</div>
          </div>
        </div>
      `,
        )
        .join("");
    }

    return html;
  }

  /* ==========================================
     COMPARISON TABLE
     ========================================== */

  function renderComparison(section) {
    if (!section.rows?.length) return "";

    let html = "";
    if (section.title) {
      html += `<h3 class="section-title">📊 ${section.title}</h3>`;
    }

    const headers = section.headers || [];
    html += `<div class="comparison-table-wrapper"><table class="comparison-table">`;

    if (headers.length) {
      html += `<thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>`;
    }

    html += `<tbody>`;
    html += section.rows
      .map(
        (row) =>
          `<tr>${row.map((cell) => `<td>${formatText(cell)}</td>`).join("")}</tr>`,
      )
      .join("");
    html += `</tbody></table></div>`;

    return html;
  }

  /* ==========================================
     HELPERS
     ========================================== */

  function formatText(text) {
    if (!text) return "";
    return text
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  function escapeAttr(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function highlightCode(code, highlightLines) {
    const lines = code.split("\n");
    const highlightSet = new Set(highlightLines || []);

    return lines
      .map((line, i) => {
        const escaped = escapeHtml(line);
        const lineNum = i + 1;

        // Basic syntax highlighting
        let highlighted = escaped
          .replace(
            /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|default|new|typeof|delete|true|false|null|undefined|class|import|export|from|of|in)\b/g,
            '<span style="color: var(--color-code-keyword)">$1</span>',
          )
          .replace(
            /(\/\/.*)/g,
            '<span style="color: var(--color-code-comment)">$1</span>',
          )
          .replace(
            /(&quot;[^&]*&quot;|&#39;[^&]*&#39;|`[^`]*`)/g,
            '<span style="color: var(--color-code-string)">$1</span>',
          )
          .replace(
            /\b(\d+\.?\d*)\b/g,
            '<span style="color: var(--color-code-number)">$1</span>',
          );

        if (highlightSet.has(lineNum)) {
          return `<span class="code-line-highlight">${highlighted}</span>`;
        }
        return highlighted;
      })
      .join("\n");
  }

  function copyCode(button) {
    const code = button.dataset.code;
    navigator.clipboard.writeText(code).then(() => {
      const original = button.textContent;
      button.textContent = "✓ Kopiert";
      setTimeout(() => {
        button.textContent = original;
      }, 2000);
    });
  }

  return { render, copyCode, escapeHtml, formatText };
})();
