import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: import.meta.dirname + "/index.html",
        about: import.meta.dirname + "/about.html",
        contact: import.meta.dirname + "/contact.html",
      },
    },
  },
});
