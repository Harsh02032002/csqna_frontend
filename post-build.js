import fs from 'fs';
import path from 'path';

const distDir = './dist';
const certs = ['cisa', 'ceh', 'cipp', 'dpdp', 'iso', 'aaia'];

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

if (fs.existsSync(distDir)) {
  console.log('Post-build: Creating separate folders for subdomain deployment...');
  
  certs.forEach((cert) => {
    const certFolder = path.join(distDir, cert);
    if (!fs.existsSync(certFolder)) {
      fs.mkdirSync(certFolder, { recursive: true });
    }
    
    // Copy index.html
    fs.copyFileSync(
      path.join(distDir, 'index.html'),
      path.join(certFolder, 'index.html')
    );
    
    // Copy assets folder
    const srcAssets = path.join(distDir, 'assets');
    const destAssets = path.join(certFolder, 'assets');
    if (fs.existsSync(srcAssets)) {
      copyRecursiveSync(srcAssets, destAssets);
    }
    
    // Copy marketing-assets folder if exists
    const srcMarketing = path.join(distDir, 'marketing-assets');
    const destMarketing = path.join(certFolder, 'marketing-assets');
    if (fs.existsSync(srcMarketing)) {
      copyRecursiveSync(srcMarketing, destMarketing);
    }
    
    // Copy favicon.ico if exists
    const srcFavicon = path.join(distDir, 'favicon.ico');
    const destFavicon = path.join(certFolder, 'favicon.ico');
    if (fs.existsSync(srcFavicon)) {
      fs.copyFileSync(srcFavicon, destFavicon);
    }
    
    console.log(`- Created ${cert}/ index.html and assets.`);
  });
  
  console.log('Post-build: Done! All subdomain folders are structured in dist/.');
} else {
  console.error('Post-build: dist/ directory not found!');
}
