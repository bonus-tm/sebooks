import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({command, mode, ssrBuild}) => {
  let config = {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    }
  }

  if (command === 'build') {
    config.base = '/sebooks/'
  }
  return config
})
