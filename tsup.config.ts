import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/**/*.ts"],
  target: "esnext",
  format: ["cjs", "esm"],
  outDir: "out",
  dts: true,
  clean: true,
});
