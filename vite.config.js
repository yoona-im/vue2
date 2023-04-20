import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 8000,
    proxy: {
      '/api': {
        // target: 'http://10.0.38.38:8050/conf',
        target: 'http://10.0.38.38:8050',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, 'conf/api')
      }
    }
  },
});
