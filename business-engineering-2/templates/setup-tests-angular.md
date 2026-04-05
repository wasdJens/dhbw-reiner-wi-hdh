```shell
# ng test ist direkt eingebaut, keine separate Installation nötig
npx ng test --watch=false   # Tests einmal ausführen
npx ng test 
```

```ts
// vitest.config.ts – Ceta Angular nutzt Vitest statt Karma
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/test-setup.ts"],
  },
});

```