import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    alias: [{ find: "@", replacement: "/src" }],
    setupFiles: "./src/tests/setupTests.ts",
  },
  // @ts-expect-error
  plugins: [react(), svgr()],
});
