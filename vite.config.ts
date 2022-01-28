import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import windiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  resolve: {
    alias: {
      '@/': pathResolve('src') + '/', // 设置 @ 指向 src
    },
  },
  plugins: [vue(), windiCSS()],
  server: {
    // Listening on all local IPs
    host: true,
  },
})
