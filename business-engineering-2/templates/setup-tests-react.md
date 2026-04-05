```shell
npm install vitest @testing-library/react @testing-library/jest-dom --save-dev
```

```ts
// vite.config.ts – Ceta nutzt defineConfig aus vitest/config!
import { defineConfig } from "vitest/config"; // ← NICHT aus "vite"!
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  plugins: [reactRouter()],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["app/**/*.test.{ts,tsx}"],
  },
});
```