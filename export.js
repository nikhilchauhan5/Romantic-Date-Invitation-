/**
 * Standalone Project Exporter for love-project-public
 * Created by Nikhil Chauhan
 * 
 * Usage: node export.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('❤️  Packaging Love Project Standalone Release...');

const EXPORT_DIR = path.join(__dirname, 'export-dist');
const IGNORE_PATTERNS = ['node_modules', 'dist', '.git', 'export-dist', '.DS_Store'];

function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      if (IGNORE_PATTERNS.includes(childItemName)) return;
      copyRecursive(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

try {
  if (fs.existsSync(EXPORT_DIR)) {
    fs.rmSync(EXPORT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(EXPORT_DIR, { recursive: true });

  const filesToCopy = [
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'index.html',
    'README.md',
    'src',
    'public'
  ];

  filesToCopy.forEach((item) => {
    const srcPath = path.join(__dirname, item);
    const destPath = path.join(EXPORT_DIR, item);
    if (fs.existsSync(srcPath)) {
      copyRecursive(srcPath, destPath);
    }
  });

  console.log('✅ Export successfully created at: ./export-dist/');
  console.log('📦 You can zip or distribute the "export-dist" folder directly!');
} catch (err) {
  console.error('❌ Export failed:', err);
  process.exit(1);
}
