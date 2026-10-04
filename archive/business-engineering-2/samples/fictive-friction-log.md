# Friction Log
## Getting Started with "ShopCase" – From Clone to First Contribution

---

| Field | Detail |
|-------|--------|
| **Author** | Maria S. (New team member, Week 1) |
| **Date** | 2026-03-15 |
| **Role** | Frontend Developer |
| **Prior experience** | React, TypeScript, 2 years professional. No prior exposure to this codebase. |
| **Goal** | Clone the repo, run the app locally, understand the architecture, and add a "Sort by Price" feature to the product list. |
| **Environment** | macOS 14.3, Node 20.11, VS Code, Chrome 122 |
| **Time budget** | Target: 60 minutes |

---

## Summary

| Metric | Value |
|--------|-------|
| **Total time** | 1h 47m |
| **Effective work** | 38m |
| **Friction time** | 69m |
| **Friction cost** (@ €100/h) | **€115** |
| **Blocker count** | 3 |
| **Friction points** | 7 |
| **Smooth steps** | 6 |

**Verdict:** The app itself is well-architected and the component structure is clean. However, onboarding is significantly slowed by missing environment documentation, an incomplete README, and implicit knowledge about data setup. With 5 targeted fixes (estimated 2h of work), onboarding time could be reduced from ~107 minutes to ~25 minutes — saving ~€137 per new developer.

---

## Detailed Log

---

### 09:00 — Clone repository

✅ **Smooth**

```bash
git clone https://github.com/team/shopcase.git
cd shopcase
```

Repo clones in ~10 seconds. `.gitignore` is present, no `node_modules` or build artifacts in the repo. Good.

**Time spent:** 1 min

---

### 09:01 — Read README

⚠️ **Friction**

README exists but is minimal:

```markdown
# ShopCase
Online shop built with React and TypeScript.

## Getting Started
npm install
npm run dev
```

**What's missing:**
- Node version requirement
- Whether any environment variables or config files are needed
- Project structure overview
- How to run tests
- Any context about what the app does or who it's for

At this point I have no idea what I'm about to install or run. I'm trusting the process.

💡 **Fix:** Expand README with Node version, project overview, structure map, and test instructions. Consider adding a `CONTRIBUTING.md` for new developers. (Est. fix: 45 min)

**Time spent:** 3 min

---

### 09:04 — npm install

❌ **Blocked**

```bash
npm install

npm ERR! engine Unsupported engine
npm ERR! notsup Required: {"node":">=16 <19"}
npm ERR! notsup Actual:   {"node":"v20.11.0"}
```

I'm running Node 20. The project requires Node 16–18 but this is not documented anywhere — not in the README, not in a `.nvmrc`, not in `package.json` engines field (it's there but I didn't think to check before running install).

**Resolution:**
- Searched for `.nvmrc` → doesn't exist
- Opened `package.json` → found `"engines": { "node": ">=16 <19" }`
- Ran `nvm install 18 && nvm use 18`
- Re-ran `npm install` → success

💡 **Fix:** Add `.nvmrc` file with `18` and mention Node version prominently in README under Getting Started. (Est. fix: 5 min)

**Time spent:** 12 min (including nvm setup)

---

### 09:16 — npm run dev

❌ **Blocked**

```
Error: ENOENT: no such file or directory, open './src/data/products.json'
```

The app expects a `products.json` file in `src/data/` but the file is not in the repository. It's in `.gitignore`.

I have no idea what format this file should have. No example file, no schema, no documentation.

**Resolution:**
- Searched codebase for `products.json` imports → found in `productService.ts`
- Read the `Product` interface in `types.ts` to understand the expected shape
- Manually created a minimal `products.json` with 3 entries based on the interface
- App starts

**What would have saved me:** A `products.example.json` in the repo, or a note in the README.

💡 **Fix:** Add `products.example.json` to the repo with 5-10 sample records and a note in README: "Copy `products.example.json` to `products.json` before first run." (Est. fix: 15 min)

**Time spent:** 18 min

---

### 09:34 — App loads in browser

✅ **Smooth**

`http://localhost:5173` opens. The landing page renders correctly with my sample data. Vite hot-reload works. Navigation is visible.

First impression: Clean UI, clear layout. I can see the component structure reflected in what's on screen.

**Time spent:** 1 min

---

### 09:35 — Navigate the app

⚠️ **Friction**

Clicked through the navigation:
- Home → ✅ works
- Products → ✅ works, shows my 3 test products
- Product Detail (`/products/1`) → ✅ works
- About → ⚠️ page renders but is completely empty (no content, just the header/footer shell)
- Contact → ❌ 404 page (route seems to be defined in nav but not in the router)

Not sure if the Contact page is work-in-progress or a bug. No indication either way.

💡 **Fix:** Either implement the Contact route or remove it from navigation. Empty/broken links erode trust in the app's quality. (Est. fix: 10 min)

**Time spent:** 4 min

---

### 09:39 — Explore the codebase

✅ **Smooth**

The folder structure is clean and intuitive:

```
src/
├── components/     → Immediately clear: reusable UI pieces
├── pages/          → Immediately clear: route-level components
├── services/       → Immediately clear: data logic
├── data/           → Where my products.json lives
├── types/          → TypeScript interfaces
└── App.tsx         → Root with routing
```

I can orient myself without any documentation. Good naming conventions. `ProductCard`, `SearchBar`, `ProductListPage` — all self-explanatory.

**Time spent:** 5 min

---

### 09:44 — Read productService.ts

✅ **Smooth**

The service layer is well-structured:
- `getAllProducts()`, `getProductById()`, `searchProducts()` — clear API
- Data loaded once at import, not on every call
- Validation and normalization functions present
- No component imports the JSON directly — everything goes through the service

This is the kind of abstraction I'd expect in a professional codebase. Whoever wrote this understood separation of concerns.

**Time spent:** 5 min

---

### 09:49 — Read ProductListPage.tsx (Smart Component)

⚠️ **Friction**

The component is functional but has a block of ~40 lines that handles filtering, searching, and state management all inline. No comments explaining the logic chain.

```tsx
// This block does filtering by category AND search AND in-stock status
// but it took me 8 minutes to understand the full chain because
// the variable names are slightly generic:
const filtered = products
  .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
  .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .filter(p => showOutOfStock || p.inStock);
```

The code is correct. But a one-line comment above this block ("Filter products by active category, search term, and stock preference") would have saved me 6 minutes of tracing.

💡 **Fix:** Add a comment above complex filter chains. Not "what" (the code shows that) but "why this order" or "what business logic this implements." (Est. fix: 5 min)

**Time spent:** 10 min

---

### 09:59 — Understand State flow

⚠️ **Friction**

Took a while to understand where cart state lives. It's in `App.tsx` and passed down through 3 levels of props. Not wrong, but there's no State Map or architecture diagram anywhere.

I had to trace `onAddToCart` from `ProductCard` → `ProductGrid` → `ProductListPage` → `App` to understand the flow. With a visual diagram this would have been instant.

💡 **Fix:** Add a simple State Map to `/docs` — even a text-based one. Which state lives where, who reads it, who updates it. (Est. fix: 20 min)

**Time spent:** 8 min

---

### 10:07 — Run tests

⚠️ **Friction**

README doesn't mention how to run tests. Guessed:

```bash
npm test        → "test" script not found
npm run test    → "test" script not found
npx vitest      → Works!
```

Tests pass (7/7). Good coverage of the service layer. One component test for ProductCard. No test for the filter logic in ProductListPage (which is the most complex piece).

💡 **Fix:** Add `"test": "vitest"` to package.json scripts. Mention in README. (Est. fix: 2 min)

**Time spent:** 5 min

---

### 10:12 — Implement "Sort by Price" feature

✅ **Smooth**

Now that I understand the architecture, adding the feature is straightforward:

1. Added a `sortBy` state to `ProductListPage` (2 min)
2. Added `.sort()` to the filter chain (2 min)
3. Added a `<select>` dropdown using existing UI patterns (3 min)
4. TypeScript caught a typo in my sort comparator immediately (saved ~10 min debugging)
5. Works on first try

The component architecture made this easy: I knew exactly where to add state (ProductListPage), and the existing filter chain was easy to extend.

**Time spent:** 9 min

---

### 10:21 — Verify nothing is broken

⚠️ **Friction**

Ran `npx vitest run`. All 7 existing tests pass. But there's no test for the filter/sort logic I just extended. I have no automated way to verify I didn't break the existing filter behavior.

Manually tested in browser: Search + Filter + Sort together works correctly.

I'd feel more confident with a test. But the existing test patterns in the codebase give me a clear template to write one.

💡 **Fix:** Add tests for the filter chain in ProductListPage. This is the most complex logic and the most likely to break when modified. (Est. fix: 30 min)

**Time spent:** 5 min

---

### 10:26 — Done

Feature implemented, manually verified, existing tests still pass.

---

## Friction Summary

| # | Time | Severity | Issue | Fix effort |
|---|------|----------|-------|------------|
| 1 | 09:01 | ⚠️ Friction | README is minimal, missing critical setup info | 45 min |
| 2 | 09:04 | ❌ Blocker | Node version not documented, install fails | 5 min |
| 3 | 09:16 | ❌ Blocker | products.json missing from repo, no example file | 15 min |
| 4 | 09:35 | ⚠️ Friction | Broken/empty routes in navigation | 10 min |
| 5 | 09:49 | ⚠️ Friction | Complex filter chain without comments | 5 min |
| 6 | 09:59 | ⚠️ Friction | No State Map or architecture diagram | 20 min |
| 7 | 10:07 | ⚠️ Friction | Test command not in package.json or README | 2 min |

**Total fix effort: ~102 minutes (~1.7 hours = €170)**

---

## Impact Analysis

| Scenario | Onboarding time | Cost per developer |
|----------|----------------|--------------------|
| **Current state** (this friction log) | 107 min | €178 |
| **After fixing blockers** (#2, #3) | ~70 min | €117 |
| **After fixing all issues** (#1–#7) | ~25 min | €42 |

| Developers onboarded per year | Cost (current) | Cost (after fixes) | Annual savings |
|-------------------------------|----------------|---------------------|----------------|
| 2 | €356 | €84 | €272 |
| 5 | €890 | €210 | €680 |
| 10 | €1,780 | €420 | €1,360 |

**ROI of fixing all friction points:**
- Investment: €170 (one-time)
- Savings per developer: €136
- Break-even: After onboarding **1.25 developers**

---

## Recommendations

### Priority 1 — Fix today (30 min total)
- [ ] Add `.nvmrc` with Node version
- [ ] Add `products.example.json` with sample data
- [ ] Add `"test": "vitest"` to package.json scripts
- [ ] Update README with Node version, data setup, and test command

### Priority 2 — Fix this week (60 min total)
- [ ] Expand README with project overview, structure map, and architecture context
- [ ] Remove or implement broken Contact route
- [ ] Add comments to complex filter/sort logic in ProductListPage

### Priority 3 — Fix this sprint (50 min total)
- [ ] Create State Map in `/docs/architecture.md`
- [ ] Add filter/sort tests for ProductListPage
- [ ] Consider adding a `CONTRIBUTING.md` for future contributors

---

## What Worked Well

This section matters — friction logs aren't just about problems.

- **Folder structure** is immediately understandable without documentation
- **Component naming** is excellent — `ProductCard`, `SearchBar`, `ProductListPage` need no explanation
- **Service layer** is properly abstracted — data access is clean and replaceable
- **TypeScript** caught my typo instantly during feature development — this alone saved 10+ minutes
- **Existing tests** gave me confidence and a template to follow
- **Adding a new feature** took only 9 minutes once I understood the codebase — proof that the architecture works

---

*Friction log template version 1.0*
*Based on practices from Stripe Developer Relations, Google Developer Experience, and Twilio DevRel.*
