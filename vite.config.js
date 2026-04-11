import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  base: '/', // 👈 必须改成绝对路径 '/'，千万不能带点！

  plugins: [uni()],

  build: {
    outDir: 'dist/build/h5',
    assetsDir: 'assets',
    // 下面的 rollupOptions 保持你的原样即可
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: undefined
      }
    }
  }
})