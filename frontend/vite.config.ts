import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
    tailwindcss(),
    tsconfigPaths(),
  ],
  esbuild: {
    drop: ["console", "debugger"],
    target: "es2019",
    legalComments: "none",
  },
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    minify: "esbuild",
    target: "es2019",
    chunkSizeWarningLimit: 900,
    reportCompressedSize: false,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["framer-motion", "lucide-react"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "framer-motion", "lucide-react"],
  },
})
