import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pagesで公開する場合は base を設定
  // base: '/リポジトリ名/',
  // その他の場合は '/' のまま
  base: '/',
})

