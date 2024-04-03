import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        yourDog: resolve(__dirname, "src/your-dog/index.html"),
        aboutMe: resolve(__dirname, "src/about-me/index.html"),
      },
    },
  },
});
