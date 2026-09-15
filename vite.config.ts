import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Auto-sync CSQNA text logo (FamousDotsLogo.png) over all legacy icon/favicon files
try {
  const srcLogo = path.resolve('public/marketing-assets/images/logo/FamousDotsLogo.png');
  if (fs.existsSync(srcLogo)) {
    const targets = [
      'public/favicon.ico',
      'public/marketing-assets/images/logo/Favicon.png',
      'public/marketing-assets/images/logo/favicon.png',
      'public/marketing-assets/images/logo/1.jpg',
      'public/marketing-assets/images/logo/5.jpg',
      'public/marketing-assets/images/logo/Icon.jpg',
      'public/marketing-assets/images/logo/logooption-9.jpg',
    ];
    targets.forEach((target) => {
      const fullPath = path.resolve(target);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.copyFileSync(srcLogo, fullPath);
    });
    console.log('[Logo Sync] Successfully replaced all favicons with FamousDotsLogo.png');
  }
} catch (err) {
  console.error('[Logo Sync] Error:', err);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4200,
    cors: true,
  },
})
