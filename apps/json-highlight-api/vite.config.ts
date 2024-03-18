import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts()],
  build: {
    sourcemap: true,
    minify: false,
    emptyOutDir: false,
    lib: {
      entry: './src/index.ts',
      name: 'json-highlight-api',
      fileName: 'json-highlight-api'
    },
    rollupOptions: {
      output: {
        exports: 'named'
      }
    }
  }
})
