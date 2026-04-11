import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  base: '/', 
  plugins: [uni()],
  build: {
    cssCodeSplit: false,     // 绝杀1：强制所有 CSS 合并为一个文件
    modulePreload: false     // 绝杀2：彻底关闭 Vite 的预加载行为
  }
})