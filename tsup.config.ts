import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/client.ts", "src/types.ts"],
  format: ["cjs", "esm"],
  outDir: "dist",
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  splitting: false,
});
