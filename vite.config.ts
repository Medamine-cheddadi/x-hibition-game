import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Support both GitHub Pages and Vercel deployments
  // GitHub Pages requires '/xhibition/' base path, Vercel uses '/'
  const base = process.env.GITHUB_PAGES === 'true' 
    ? '/xhibition/' 
    : (process.env.VITE_BASE_PATH || '/')
  
  return {
    plugins: [react()],
    base,
  }
})
