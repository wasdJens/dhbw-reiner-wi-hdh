/**
 * playground.js — Code-Playground
 *
 * Ein einfacher in-browser Code-Editor mit:
 * - textarea für Code-Eingabe
 * - Ausführen-Button (via new Function())
 * - Output-Panel das console.log abfängt
 * - Reset auf Starter-Code
 * - Hint-Toggle
 */

const Playground = (() => {
  function initAll() {
    document.querySelectorAll(".playground").forEach(initPlayground);
  }

  function initPlayground(container) {
    const starterCode = container.dataset.starterCode || "";
    const hint = container.dataset.hint || "";

    container.innerHTML = `
      <div class="pg-editor-wrapper">
        <div class="pg-editor-header">
          <span class="pg-editor-label">JavaScript</span>
          <div class="pg-editor-actions">
            ${hint ? `<button class="btn btn-ghost btn-sm pg-hint-btn">💡 Hinweis</button>` : ""}
            <button class="btn btn-ghost btn-sm pg-reset-btn">↺ Reset</button>
          </div>
        </div>
        <div class="pg-textarea-wrapper">
          <textarea class="pg-textarea" spellcheck="false" autocapitalize="off" autocomplete="off">${escapeHtml(starterCode)}</textarea>
          <div class="pg-line-numbers" aria-hidden="true"></div>
        </div>
      </div>
      <div class="pg-controls">
        <button class="btn btn-primary btn-sm pg-run-btn">▶ Ausführen</button>
      </div>
      ${hint ? `<div class="pg-hint hidden"><span class="pg-hint-icon">💡</span> ${hint}</div>` : ""}
      <div class="pg-output hidden">
        <div class="pg-output-header">
          <span>Ausgabe</span>
          <button class="btn btn-ghost btn-sm pg-clear-btn">Leeren</button>
        </div>
        <div class="pg-output-body"></div>
      </div>
    `;

    // References
    const textarea = container.querySelector(".pg-textarea");
    const lineNumbers = container.querySelector(".pg-line-numbers");
    const runBtn = container.querySelector(".pg-run-btn");
    const resetBtn = container.querySelector(".pg-reset-btn");
    const hintBtn = container.querySelector(".pg-hint-btn");
    const hintEl = container.querySelector(".pg-hint");
    const outputEl = container.querySelector(".pg-output");
    const outputBody = container.querySelector(".pg-output-body");
    const clearBtn = container.querySelector(".pg-clear-btn");

    // Line numbers
    updateLineNumbers(textarea, lineNumbers);
    textarea.addEventListener("input", () =>
      updateLineNumbers(textarea, lineNumbers),
    );
    textarea.addEventListener("scroll", () => {
      if (lineNumbers) lineNumbers.scrollTop = textarea.scrollTop;
    });

    // Tab support in textarea
    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value =
          textarea.value.substring(0, start) +
          "  " +
          textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 2;
        updateLineNumbers(textarea, lineNumbers);
      }
    });

    // Run code
    runBtn.addEventListener("click", () => {
      runCode(textarea.value, outputEl, outputBody);
    });

    // Reset
    resetBtn.addEventListener("click", () => {
      textarea.value = starterCode;
      updateLineNumbers(textarea, lineNumbers);
      outputEl.classList.add("hidden");
      outputBody.innerHTML = "";
    });

    // Hint toggle
    if (hintBtn && hintEl) {
      hintBtn.addEventListener("click", () =>
        hintEl.classList.toggle("hidden"),
      );
    }

    // Clear output
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        outputBody.innerHTML = "";
        outputEl.classList.add("hidden");
      });
    }
  }

  function runCode(code, outputEl, outputBody) {
    outputEl.classList.remove("hidden");
    outputBody.innerHTML = "";

    const logs = [];

    // Create a sandboxed console.log
    const mockConsole = {
      log: (...args) => {
        logs.push({ type: "log", args });
      },
      warn: (...args) => {
        logs.push({ type: "warn", args });
      },
      error: (...args) => {
        logs.push({ type: "error", args });
      },
      info: (...args) => {
        logs.push({ type: "info", args });
      },
    };

    try {
      // Use new Function to create an isolated scope
      const fn = new Function("console", code);
      fn(mockConsole);

      if (logs.length === 0) {
        outputBody.innerHTML = `<div class="pg-output-line pg-output-info">Kein Output. Nutze console.log() um Werte auszugeben.</div>`;
      } else {
        outputBody.innerHTML = logs
          .map((entry) => {
            const formatted = entry.args.map(formatValue).join(" ");
            return `<div class="pg-output-line pg-output-${entry.type}">${escapeHtml(formatted)}</div>`;
          })
          .join("");
      }
    } catch (err) {
      outputBody.innerHTML = `<div class="pg-output-line pg-output-error">❌ ${escapeHtml(err.message)}</div>`;
    }
  }

  function formatValue(val) {
    if (val === null) return "null";
    if (val === undefined) return "undefined";
    if (typeof val === "object") {
      try {
        return JSON.stringify(val, null, 2);
      } catch {
        return String(val);
      }
    }
    return String(val);
  }

  function updateLineNumbers(textarea, lineNumbers) {
    if (!lineNumbers || !textarea) return;
    const lines = textarea.value.split("\n").length;
    lineNumbers.innerHTML = Array.from(
      { length: lines },
      (_, i) => `<div>${i + 1}</div>`,
    ).join("");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  return { initAll };
})();
