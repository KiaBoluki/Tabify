import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/usd": {
        target: "https://alanchand.com",
        changeOrigin: true,
        rewrite: () => "/currencies-price/usd",
      },
    },
  },
});
