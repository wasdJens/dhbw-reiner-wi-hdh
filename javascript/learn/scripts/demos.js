/**
 * demos.js — Interaktive TechStore-Demos
 *
 * Jede Demo rendert sich in ein `.demo-container[data-demo-id="X"]`
 * Element das vom Renderer erzeugt wird.
 *
 * Demos folgen dem TechStore-Szenario und bauen aufeinander auf.
 */

const Demos = (() => {
  const registry = {
    "cart-calculator": demoCartCalculator,
    "product-validator": demoProductValidator,
    "discount-calculator": demoDiscountCalculator,
    "order-tracker": demoOrderTracker,
    "invoice-generator": demoInvoiceGenerator,
    "catalog-manager": demoCatalogManager,
    "techstore-dashboard": demoTechStoreDashboard,
  };

  function init(chapterId) {
    document.querySelectorAll(".demo-container").forEach((el) => {
      const demoId = el.dataset.demoId;
      const fn = registry[demoId];
      if (fn) {
        fn(el);
      } else {
        el.innerHTML = `<div class="text-center p-md text-muted">Demo "${demoId}" nicht gefunden.</div>`;
      }
    });
  }

  /* ==========================================
     KAPITEL 1 — Warenkorbrechner
     Zeigt: Variablen (const / let) mit echten Werten
     ========================================== */

  function demoCartCalculator(el) {
    el.innerHTML = `
      <div class="demo-card-header">
        <h4>🛒 TechStore — Warenkorbrechner</h4>
        <p class="text-small text-muted">Variablen speichern Preis, Menge und Steuern</p>
      </div>
      <div class="demo-grid-2">
        <div class="demo-input-group">
          <label>Produkt</label>
          <select id="cart-product" class="demo-select">
            <option value="999">💻 MacBook Pro — 999 €</option>
            <option value="699">📱 iPhone 15 — 699 €</option>
            <option value="149">⌨️ Mechanical Keyboard — 149 €</option>
            <option value="299">🖥️ Dell Monitor — 299 €</option>
          </select>
          <label style="margin-top:var(--space-sm)">Menge</label>
          <div class="demo-stepper">
            <button class="btn btn-secondary btn-sm" id="cart-dec">−</button>
            <span id="cart-qty" class="demo-stepper-value">1</span>
            <button class="btn btn-secondary btn-sm" id="cart-inc">+</button>
          </div>
        </div>
        <div class="demo-result-panel">
          <div class="demo-result-row">
            <span class="text-muted text-small">Einzelpreis (netto)</span>
            <span id="cart-net" class="demo-value">999,00 €</span>
          </div>
          <div class="demo-result-row">
            <span class="text-muted text-small">MwSt (19%)</span>
            <span id="cart-tax" class="demo-value">189,81 €</span>
          </div>
          <div class="demo-result-row demo-result-total">
            <span class="text-small" style="font-weight:600">Gesamt (brutto)</span>
            <span id="cart-total" class="demo-value-total">1.188,81 €</span>
          </div>
        </div>
      </div>
      <div class="demo-code-insight">
        <code>const MWST = 0.19;</code>
        <code>let menge = <span id="code-qty">1</span>;</code>
        <code>let preis = <span id="code-price">999</span>;</code>
        <code>let gesamt = preis * menge * (1 + MWST); <span class="code-comment">// = <span id="code-total">1188.81</span></span></code>
      </div>
    `;

    const MWST = 0.19;
    let qty = 1;

    const productEl = el.querySelector("#cart-product");
    const qtyEl = el.querySelector("#cart-qty");
    const netEl = el.querySelector("#cart-net");
    const taxEl = el.querySelector("#cart-tax");
    const totalEl = el.querySelector("#cart-total");
    const codeQty = el.querySelector("#code-qty");
    const codePrice = el.querySelector("#code-price");
    const codeTotal = el.querySelector("#code-total");

    function update() {
      const price = parseInt(productEl.value, 10);
      const net = price * qty;
      const tax = net * MWST;
      const total = net * (1 + MWST);

      netEl.textContent = formatEuro(net);
      taxEl.textContent = formatEuro(tax);
      totalEl.textContent = formatEuro(total);
      qtyEl.textContent = qty;
      codeQty.textContent = qty;
      codePrice.textContent = price;
      codeTotal.textContent = total.toFixed(2);
    }

    el.querySelector("#cart-inc").addEventListener("click", () => {
      if (qty < 10) {
        qty++;
        update();
      }
    });
    el.querySelector("#cart-dec").addEventListener("click", () => {
      if (qty > 1) {
        qty--;
        update();
      }
    });
    productEl.addEventListener("change", update);

    update();
  }

  /* ==========================================
     KAPITEL 2 — Produkt-Validator
     Zeigt: Datentypen (typeof) & null/undefined
     ========================================== */

  function demoProductValidator(el) {
    const products = [
      { name: "MacBook Pro", price: 999, inStock: true, category: "Laptop" },
      { name: "iPhone 15", price: 699, inStock: true, category: "Smartphone" },
      {
        name: 12345,
        price: "nicht verfügbar",
        inStock: null,
        category: "Monitor",
      },
      {
        name: "USB-C Kabel",
        price: undefined,
        inStock: false,
        category: "Zubehör",
      },
    ];

    el.innerHTML = `
      <div class="demo-card-header">
        <h4>🔍 TechStore — Produktdaten-Validator</h4>
        <p class="text-small text-muted">typeof prüft den Datentyp — fehlerhaften Daten auffinden</p>
      </div>
      <p class="text-small text-muted mb-sm">Wähle ein Produkt und sieh welche Felder ungültige Datentypen haben:</p>
      <div class="demo-tabs" id="validator-tabs">
        ${products.map((p, i) => `<button class="demo-tab ${i === 0 ? "active" : ""}" data-idx="${i}">${typeof p.name === "string" ? p.name : "⚠️ Produkt " + (i + 1)}</button>`).join("")}
      </div>
      <div id="validator-result" class="validator-table"></div>
    `;

    function renderProduct(idx) {
      const p = products[idx];
      const fields = [
        { key: "name", value: p.name, expectedType: "string" },
        { key: "price", value: p.price, expectedType: "number" },
        { key: "inStock", value: p.inStock, expectedType: "boolean" },
        { key: "category", value: p.category, expectedType: "string" },
      ];

      const rows = fields
        .map(({ key, value, expectedType }) => {
          const actualType = value === null ? "null" : typeof value;
          const ok = actualType === expectedType;
          const displayVal =
            value === null
              ? "null"
              : value === undefined
                ? "undefined"
                : JSON.stringify(value);
          return `
          <div class="validator-row ${ok ? "valid" : "invalid"}">
            <span class="validator-key"><code>${key}</code></span>
            <span class="validator-value"><code>${displayVal}</code></span>
            <span class="validator-type"><code>typeof → ${actualType}</code></span>
            <span class="validator-status">${ok ? "✓" : "⚠️"}</span>
          </div>
        `;
        })
        .join("");

      el.querySelector("#validator-result").innerHTML =
        `<div class="validator-grid">${rows}</div>`;
    }

    el.querySelectorAll(".demo-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        el.querySelectorAll(".demo-tab").forEach((b) =>
          b.classList.remove("active"),
        );
        btn.classList.add("active");
        renderProduct(parseInt(btn.dataset.idx, 10));
      });
    });

    renderProduct(0);
  }

  /* ==========================================
     KAPITEL 3 — Rabatt-Staffel-Rechner
     Zeigt: Vergleichsoperatoren, ternary, ===
     ========================================== */

  function demoDiscountCalculator(el) {
    el.innerHTML = `
      <div class="demo-card-header">
        <h4>🏷️ TechStore — Rabatt-Staffel-Rechner</h4>
        <p class="text-small text-muted">Vergleichsoperatoren bestimmen den Rabatt</p>
      </div>
      <div class="demo-grid-2">
        <div class="demo-input-group">
          <label>Bestellwert (€)</label>
          <input type="range" id="order-value" min="0" max="2000" step="50" value="500" class="demo-range">
          <div class="flex flex-between">
            <span class="text-small text-muted">0 €</span>
            <span id="order-value-display" class="text-bold text-primary">500 €</span>
            <span class="text-small text-muted">2.000 €</span>
          </div>
          <div class="discount-tiers">
            <div class="discount-tier" data-min="0"    data-max="199">  Kein Rabatt    <span>0 €+</span></div>
            <div class="discount-tier" data-min="200"  data-max="499">  5% Rabatt      <span>200 €+</span></div>
            <div class="discount-tier" data-min="500"  data-max="999">  10% Rabatt     <span>500 €+</span></div>
            <div class="discount-tier" data-min="1000" data-max="99999">15% Rabatt     <span>1.000 €+</span></div>
          </div>
        </div>
        <div class="demo-result-panel">
          <div class="demo-result-row">
            <span class="text-muted text-small">Bestellwert</span>
            <span id="disc-original" class="demo-value">500,00 €</span>
          </div>
          <div class="demo-result-row">
            <span class="text-muted text-small">Rabatt (<span id="disc-pct">10</span>%)</span>
            <span id="disc-amount" class="demo-value text-success">−50,00 €</span>
          </div>
          <div class="demo-result-row demo-result-total">
            <span class="text-small" style="font-weight:600">Zu zahlen</span>
            <span id="disc-total" class="demo-value-total">450,00 €</span>
          </div>
        </div>
      </div>
      <div class="demo-code-insight">
        <code>const bestellwert = <span id="code-ov">500</span>;</code>
        <code>const rabatt = bestellwert >= 1000 ? 0.15</code>
        <code>             : bestellwert >= 500  ? 0.10</code>
        <code>             : bestellwert >= 200  ? 0.05 : 0;</code>
        <code>const endpreis = bestellwert * (1 - rabatt); <span class="code-comment">// = <span id="code-result">450</span></span></code>
      </div>
    `;

    function getDiscount(v) {
      return v >= 1000 ? 0.15 : v >= 500 ? 0.1 : v >= 200 ? 0.05 : 0;
    }

    const rangeEl = el.querySelector("#order-value");
    function update() {
      const v = parseInt(rangeEl.value, 10);
      const discount = getDiscount(v);
      const discAmt = v * discount;
      const total = v - discAmt;

      el.querySelector("#order-value-display").textContent = `${v} €`;
      el.querySelector("#disc-original").textContent = formatEuro(v);
      el.querySelector("#disc-pct").textContent = Math.round(discount * 100);
      el.querySelector("#disc-amount").textContent = `−${formatEuro(discAmt)}`;
      el.querySelector("#disc-total").textContent = formatEuro(total);
      el.querySelector("#code-ov").textContent = v;
      el.querySelector("#code-result").textContent = total.toFixed(2);

      el.querySelectorAll(".discount-tier").forEach((tier) => {
        const min = parseInt(tier.dataset.min, 10);
        const max = parseInt(tier.dataset.max, 10);
        tier.classList.toggle("active", v >= min && v <= max);
      });
    }

    rangeEl.addEventListener("input", update);
    update();
  }

  /* ==========================================
     KAPITEL 4 — Bestellstatus-Tracker
     Zeigt: if/else, switch, loops
     ========================================== */

  function demoOrderTracker(el) {
    const statuses = [
      "eingegangen",
      "bezahlt",
      "verpackt",
      "versendet",
      "zugestellt",
    ];
    const statusInfo = {
      eingegangen: {
        icon: "📥",
        label: "Eingegangen",
        color: "var(--color-medium)",
      },
      bezahlt: { icon: "💳", label: "Bezahlt", color: "var(--color-info)" },
      verpackt: {
        icon: "📦",
        label: "Verpackt",
        color: "var(--color-warning)",
      },
      versendet: {
        icon: "🚚",
        label: "Versendet",
        color: "var(--color-primary)",
      },
      zugestellt: {
        icon: "✅",
        label: "Zugestellt",
        color: "var(--color-success)",
      },
    };

    el.innerHTML = `
      <div class="demo-card-header">
        <h4>📦 TechStore — Bestellstatus-Tracker</h4>
        <p class="text-small text-muted">switch und if/else steuern den Bestellfluss</p>
      </div>
      <div class="order-timeline">
        ${statuses
          .map(
            (s, i) => `
          <div class="order-step" data-status="${s}">
            <div class="order-step-icon">${statusInfo[s].icon}</div>
            <div class="order-step-label">${statusInfo[s].label}</div>
          </div>
          ${i < statuses.length - 1 ? '<div class="order-step-line"></div>' : ""}
        `,
          )
          .join("")}
      </div>
      <div class="demo-grid-2 mt-sm">
        <div>
          <label>Status setzen:</label>
          <div style="display:flex;gap:var(--space-xs);flex-wrap:wrap;margin-top:var(--space-xs)">
            ${statuses.map((s) => `<button class="btn btn-secondary btn-sm status-btn" data-status="${s}">${statusInfo[s].icon} ${statusInfo[s].label}</button>`).join("")}
          </div>
        </div>
        <div class="demo-result-panel">
          <div class="demo-result-row">
            <span class="text-muted text-small">Aktueller Status</span>
            <span id="status-current" class="demo-value">📥 Eingegangen</span>
          </div>
          <div class="demo-result-row">
            <span class="text-muted text-small">Nächste Aktion</span>
            <span id="status-next" class="demo-value text-primary">Zahlung abwarten</span>
          </div>
        </div>
      </div>
      <div class="demo-code-insight">
        <code>switch (status) {</code>
        <code id="code-status-line">  case "eingegangen": nextAction = "Zahlung abwarten"; break;</code>
        <code>  // ...</code>
        <code>}</code>
      </div>
    `;

    const nextActions = {
      eingegangen: "Zahlung abwarten",
      bezahlt: "Ware verpacken",
      verpackt: "Versandlabel drucken",
      versendet: "Lieferung verfolgen",
      zugestellt: "Bestellung abgeschlossen 🎉",
    };

    function setStatus(status) {
      const info = statusInfo[status];
      el.querySelector("#status-current").textContent =
        `${info.icon} ${info.label}`;
      el.querySelector("#status-next").textContent = nextActions[status];
      el.querySelector("#code-status-line").textContent =
        `  case "${status}": nextAction = "${nextActions[status]}"; break;`;

      const steps = el.querySelectorAll(".order-step");
      const currentIdx = statuses.indexOf(status);
      steps.forEach((step, i) => {
        step.classList.toggle("done", i < currentIdx);
        step.classList.toggle("active", i === currentIdx);
      });
    }

    el.querySelectorAll(".status-btn").forEach((btn) => {
      btn.addEventListener("click", () => setStatus(btn.dataset.status));
    });

    setStatus("eingegangen");
  }

  /* ==========================================
     KAPITEL 5 — Rechnungs-Generator
     Zeigt: Funktionen als wiederverwendbare Bausteine
     ========================================== */

  function demoInvoiceGenerator(el) {
    el.innerHTML = `
      <div class="demo-card-header">
        <h4>🧾 TechStore — Rechnungs-Generator</h4>
        <p class="text-small text-muted">Jeder Schritt ist eine eigene Funktion</p>
      </div>
      <div class="demo-grid-2">
        <div class="demo-input-group">
          <label>Produkt</label>
          <select id="inv-product" class="demo-select">
            <option value="999|MacBook Pro">💻 MacBook Pro — 999 €</option>
            <option value="699|iPhone 15">📱 iPhone 15 — 699 €</option>
            <option value="149|Keyboard">⌨️ Keyboard — 149 €</option>
          </select>
          <label style="margin-top:var(--space-sm)">Menge</label>
          <input type="number" id="inv-qty" value="1" min="1" max="99" style="width:80px">
          <label style="margin-top:var(--space-sm)">Kundentyp</label>
          <select id="inv-customer" class="demo-select">
            <option value="0">Neukunde (kein Rabatt)</option>
            <option value="0.05">Stammkunde (5%)</option>
            <option value="0.10">Premium-Kunde (10%)</option>
            <option value="0.15">Partner (15%)</option>
          </select>
        </div>
        <div id="inv-result" class="invoice-preview"></div>
      </div>
      <div class="demo-code-insight">
        <code>function berechneNetto(preis, menge) {</code>
        <code>  return preis * menge;</code>
        <code>}</code>
        <code>function berechneBrutto(netto, rabatt = 0) {</code>
        <code>  return netto * (1 - rabatt) * 1.19;</code>
        <code>}</code>
        <code>function formatierePreis(betrag) {</code>
        <code>  return betrag.toFixed(2) + " €";</code>
        <code>}</code>
      </div>
    `;

    function calcInvoice() {
      const [priceStr, name] = el
        .querySelector("#inv-product")
        .value.split("|");
      const price = parseInt(priceStr, 10);
      const qty = Math.max(
        1,
        parseInt(el.querySelector("#inv-qty").value, 10) || 1,
      );
      const discount = parseFloat(el.querySelector("#inv-customer").value);

      const netto = price * qty;
      const discountAmt = netto * discount;
      const afterDiscount = netto - discountAmt;
      const mwst = afterDiscount * 0.19;
      const brutto = afterDiscount * 1.19;

      el.querySelector("#inv-result").innerHTML = `
        <div class="invoice-box">
          <div class="invoice-header">Rechnung #${Math.floor(Math.random() * 9000) + 1000}</div>
          <div class="invoice-line"><span>${name} × ${qty}</span><span>${formatEuro(netto)}</span></div>
          ${discount > 0 ? `<div class="invoice-line text-success"><span>Rabatt (${Math.round(discount * 100)}%)</span><span>−${formatEuro(discountAmt)}</span></div>` : ""}
          <div class="invoice-line"><span>Zwischensumme</span><span>${formatEuro(afterDiscount)}</span></div>
          <div class="invoice-line"><span>MwSt (19%)</span><span>${formatEuro(mwst)}</span></div>
          <div class="invoice-total"><span>Gesamtbetrag</span><span>${formatEuro(brutto)}</span></div>
        </div>
      `;
    }

    el.querySelector("#inv-product").addEventListener("change", calcInvoice);
    el.querySelector("#inv-qty").addEventListener("input", calcInvoice);
    el.querySelector("#inv-customer").addEventListener("change", calcInvoice);
    calcInvoice();
  }

  /* ==========================================
     KAPITEL 6 — Produkt-Katalog-Manager
     Zeigt: Arrays, Objekte, filter, map, sort
     ========================================== */

  function demoCatalogManager(el) {
    const catalog = [
      {
        id: 1,
        name: "MacBook Pro",
        price: 1299,
        category: "Laptop",
        inStock: true,
      },
      {
        id: 2,
        name: "iPhone 15",
        price: 799,
        category: "Smartphone",
        inStock: true,
      },
      {
        id: 3,
        name: "iPad Air",
        price: 649,
        category: "Tablet",
        inStock: false,
      },
      {
        id: 4,
        name: 'Dell Monitor 27"',
        price: 349,
        category: "Monitor",
        inStock: true,
      },
      {
        id: 5,
        name: "AirPods Pro",
        price: 279,
        category: "Audio",
        inStock: true,
      },
      {
        id: 6,
        name: "Mechanical Keyboard",
        price: 149,
        category: "Zubehör",
        inStock: true,
      },
      {
        id: 7,
        name: "USB-C Hub",
        price: 79,
        category: "Zubehör",
        inStock: false,
      },
      {
        id: 8,
        name: "Samsung Galaxy S24",
        price: 899,
        category: "Smartphone",
        inStock: true,
      },
    ];

    el.innerHTML = `
      <div class="demo-card-header">
        <h4>📋 TechStore — Produkt-Katalog</h4>
        <p class="text-small text-muted">filter(), map() und sort() auf einem Array von Objekten</p>
      </div>
      <div class="catalog-controls">
        <input type="text" id="cat-search" placeholder="Produkt suchen…" style="max-width:200px">
        <select id="cat-category" class="demo-select" style="max-width:180px">
          <option value="">Alle Kategorien</option>
          ${[...new Set(catalog.map((p) => p.category))].map((c) => `<option value="${c}">${c}</option>`).join("")}
        </select>
        <select id="cat-sort" class="demo-select" style="max-width:180px">
          <option value="name">Name (A–Z)</option>
          <option value="price-asc">Preis ↑</option>
          <option value="price-desc">Preis ↓</option>
        </select>
        <label class="demo-checkbox-label">
          <input type="checkbox" id="cat-in-stock"> Nur verfügbar
        </label>
      </div>
      <div id="cat-results" class="catalog-grid mt-sm"></div>
      <div id="cat-stats" class="catalog-stats"></div>
    `;

    function renderCatalog() {
      const search = el.querySelector("#cat-search").value.toLowerCase();
      const category = el.querySelector("#cat-category").value;
      const sort = el.querySelector("#cat-sort").value;
      const onlyStock = el.querySelector("#cat-in-stock").checked;

      let results = catalog
        .filter((p) => !search || p.name.toLowerCase().includes(search))
        .filter((p) => !category || p.category === category)
        .filter((p) => !onlyStock || p.inStock);

      results.sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        return 0;
      });

      const grid = el.querySelector("#cat-results");
      if (results.length === 0) {
        grid.innerHTML = `<p class="text-muted text-small">Keine Produkte gefunden.</p>`;
      } else {
        grid.innerHTML = results
          .map(
            (p) => `
          <div class="catalog-item ${p.inStock ? "" : "out-of-stock"}">
            <div class="catalog-item-name">${p.name}</div>
            <div class="catalog-item-category">${p.category}</div>
            <div class="catalog-item-price">${formatEuro(p.price)}</div>
            <div class="catalog-item-stock">${p.inStock ? "✅ Verfügbar" : "❌ Ausverkauft"}</div>
          </div>
        `,
          )
          .join("");
      }

      const prices = results.map((p) => p.price);
      const avg = prices.length
        ? prices.reduce((s, p) => s + p, 0) / prices.length
        : 0;
      el.querySelector("#cat-stats").innerHTML = `
        <div class="catalog-stat"><span class="text-muted text-small">Ergebnisse</span> <strong>${results.length}</strong></div>
        <div class="catalog-stat"><span class="text-muted text-small">Günstigster</span> <strong>${prices.length ? formatEuro(Math.min(...prices)) : "—"}</strong></div>
        <div class="catalog-stat"><span class="text-muted text-small">Teuerster</span> <strong>${prices.length ? formatEuro(Math.max(...prices)) : "—"}</strong></div>
        <div class="catalog-stat"><span class="text-muted text-small">Ø Preis</span> <strong>${prices.length ? formatEuro(avg) : "—"}</strong></div>
      `;
    }

    el.querySelector("#cat-search").addEventListener("input", renderCatalog);
    el.querySelector("#cat-category").addEventListener("change", renderCatalog);
    el.querySelector("#cat-sort").addEventListener("change", renderCatalog);
    el.querySelector("#cat-in-stock").addEventListener("change", renderCatalog);
    renderCatalog();
  }

  /* ==========================================
     KAPITEL 7 — TechStore Dashboard
     Zeigt: Alle Konzepte kombiniert
     ========================================== */

  function demoTechStoreDashboard(el) {
    const orders = [
      {
        id: "TS-001",
        kunde: "Anna Müller",
        produkt: "MacBook Pro",
        betrag: 1544.81,
        status: "zugestellt",
      },
      {
        id: "TS-002",
        kunde: "Ben Schmidt",
        produkt: "iPhone 15",
        betrag: 950.81,
        status: "versendet",
      },
      {
        id: "TS-003",
        kunde: "Clara Weber",
        produkt: "iPad Air",
        betrag: 771.81,
        status: "verpackt",
      },
      {
        id: "TS-004",
        kunde: "David Fischer",
        produkt: "Dell Monitor",
        betrag: 415.31,
        status: "bezahlt",
      },
      {
        id: "TS-005",
        kunde: "Eva Braun",
        produkt: "AirPods Pro",
        betrag: 332.01,
        status: "eingegangen",
      },
    ];

    const statusBadge = {
      eingegangen: '<span class="badge-status badge-status-new">📥 Neu</span>',
      bezahlt: '<span class="badge-status badge-status-paid">💳 Bezahlt</span>',
      verpackt:
        '<span class="badge-status badge-status-packed">📦 Verpackt</span>',
      versendet:
        '<span class="badge-status badge-status-shipped">🚚 Versendet</span>',
      zugestellt:
        '<span class="badge-status badge-status-done">✅ Zugestellt</span>',
    };

    const totalRevenue = orders.reduce((sum, o) => sum + o.betrag, 0);
    const openOrders = orders.filter((o) => o.status !== "zugestellt").length;
    const avgOrder = totalRevenue / orders.length;

    el.innerHTML = `
      <div class="demo-card-header">
        <h4>📊 TechStore — Bestellübersicht</h4>
        <p class="text-small text-muted">Variablen · Datentypen · Operatoren · Arrays · Funktionen</p>
      </div>
      <div class="dashboard-kpis">
        <div class="kpi-card">
          <div class="kpi-label">Gesamtumsatz</div>
          <div class="kpi-value text-primary">${formatEuro(totalRevenue)}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Offene Bestellungen</div>
          <div class="kpi-value text-warning">${openOrders}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Ø Bestellwert</div>
          <div class="kpi-value text-success">${formatEuro(avgOrder)}</div>
        </div>
      </div>
      <table class="dashboard-table">
        <thead>
          <tr><th>Bestellung</th><th>Kunde</th><th>Produkt</th><th>Betrag</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${orders
            .map(
              (o) => `
            <tr>
              <td><code>${o.id}</code></td>
              <td>${o.kunde}</td>
              <td>${o.produkt}</td>
              <td>${formatEuro(o.betrag)}</td>
              <td>${statusBadge[o.status] || o.status}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
    `;
  }

  /* ==========================================
     HELPER
     ========================================== */

  function formatEuro(val) {
    return (
      val.toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + " €"
    );
  }

  return { init };
})();
