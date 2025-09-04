const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const distDir = path.join(__dirname, '..', 'dist');
let target = distDir;

try {
  if (fs.existsSync(distDir)) {
    // Prefer mac* folder (e.g. mac, mac-arm64, mac-universal) if present
    const sub = fs.readdirSync(distDir).find(d => d.startsWith('mac'));
    if (sub) {
      const candidate = path.join(distDir, sub);
      if (fs.statSync(candidate).isDirectory()) target = candidate;
    }
    openFolder(target);
  } else {
    console.error('No dist directory found:', distDir);
  }
} catch (e) {
  console.error('Failed to open dist folder:', e.message);
}

function openFolder(p) {
  if (process.platform === 'darwin') {
    spawnSync('open', [p], { stdio: 'ignore' });
  } else if (process.platform === 'win32') {
    spawnSync('explorer', [p], { stdio: 'ignore' });
  } else {
    spawnSync('xdg-open', [p], { stdio: 'ignore' });
  }
}
