import fs from 'fs';
import path from 'path';

const srcDir = 'e:/osa-data/csqna/src';
const destDir = './public';

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (fs.existsSync(srcDir)) {
  try {
    console.log('Copying marketing-assets...');
    copyRecursiveSync(path.join(srcDir, 'marketing-assets'), path.join(destDir, 'marketing-assets'));
    console.log('Copying assets...');
    copyRecursiveSync(path.join(srcDir, 'assets'), path.join(destDir, 'assets'));
    console.log('Copying favicon.ico...');
    copyRecursiveSync(path.join(srcDir, 'favicon.ico'), path.join(destDir, 'favicon.ico'));
    console.log('Copying styles.css...');
    copyRecursiveSync(path.join(srcDir, 'styles.css'), path.join(destDir, 'styles.css'));
    console.log('Copy successful!');
  } catch (err) {
    console.error('Error during copy:', err);
    process.exit(1);
  }
} else {
  console.log('Original src directory not found. Skipping copy (using existing public/ folder).');
}

// Sync single CSQNA text logo over all legacy icon files
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
    console.log('[Logo Sync] Overwrote all favicons with FamousDotsLogo.png');
  }
} catch (e) {
  console.error('[Logo Sync Error]', e);
}
