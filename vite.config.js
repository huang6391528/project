import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [uni()],
  server: {
    port: 5173,
    open: false
  },
  build: {
    outDir: 'dist/build/h5'
  }
})
