import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, X, Check, FileArchive, Terminal, Sparkles, Loader2 } from 'lucide-react';
import JSZip from 'jszip';
import { DateAppConfig } from '../config/dateConfig';
import { GIFS } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: DateAppConfig;
}

export default function ExportModal({ isOpen, onClose, config }: Props) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    try {
      setIsExporting(true);
      const zip = new JSZip();

      // Project Root Files
      zip.file('README.md', `# Romantic Date Invitation Template ❤️
*Created by Nikhil Chauhan*

This is a customized standalone copy of the romantic date invitation template.

### Quick Start
1. Install dependencies: \`npm install\`
2. Start dev server: \`npm run dev\`
3. Build for production: \`npm run build\`

### Current Configured Settings
- **Her Name**: ${config.recipientName}
- **Your Name**: ${config.senderName}
- **WhatsApp Number**: ${config.whatsAppNumber}
- **Special Date**: ${config.specialDate || 'Dynamic / In-App Selection'}

See the complete configuration in \`src/config/dateConfig.ts\`.
`);

      zip.file('package.json', JSON.stringify({
        name: "love-project",
        version: "1.0.0",
        private: true,
        type: "module",
        author: "Nikhil Chauhan",
        scripts: {
          "dev": "vite",
          "build": "tsc && vite build",
          "preview": "vite preview"
        },
        dependencies: {
          "@tailwindcss/vite": "^4.1.14",
          "@vitejs/plugin-react": "^5.0.4",
          "canvas-confetti": "^1.9.4",
          "date-fns": "^4.4.0",
          "lucide-react": "^0.546.0",
          "motion": "^12.23.24",
          "react": "^19.0.1",
          "react-dom": "^19.0.1",
          "tailwindcss": "^4.1.14",
          "typescript": "~5.8.2",
          "vite": "^6.2.3"
        },
        devDependencies: {
          "@types/canvas-confetti": "^1.9.0",
          "@types/node": "^22.14.0",
          "@types/react": "^19.0.10",
          "@types/react-dom": "^19.0.4"
        }
      }, null, 2));

      zip.file('tsconfig.json', JSON.stringify({
        compilerOptions: {
          target: "ES2020",
          useDefineForClassFields: true,
          lib: ["ES2020", "DOM", "DOM.Iterable"],
          module: "ESNext",
          skipLibCheck: true,
          moduleResolution: "bundler",
          allowImportingTsExtensions: true,
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: "react-jsx",
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          noFallthroughCasesInSwitch: true
        },
        include: ["src"]
      }, null, 2));

      zip.file('vite.config.ts', `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 3000, host: '0.0.0.0' }
});
`);

      zip.file('index.html', `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <title>A Special Invitation for ${config.recipientName} ❤️</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <meta name="description" content="A special romantic date invitation." />
    <meta property="og:title" content="A Special Invitation ❤️" />
    <meta property="og:description" content="A special romantic date invitation." />
    <meta property="og:type" content="website" />
    <meta name="theme-color" content="#fff0f3" />
  </head>
  <body>
    <div id="heart-container" class="floating-hearts-container"></div>
    <div id="root"></div>
    <script>
      const container = document.getElementById('heart-container');
      const heartCount = window.innerWidth < 600 ? 15 : 30;
      for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = Math.random() > 0.5 ? '♡' : '♥';
        const size = Math.random() * 12 + 10;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 15;
        const delay = Math.random() * 10;
        heart.style.fontSize = \`\${size}px\`;
        heart.style.left = \`\${left}%\`;
        heart.style.animationDuration = \`\${duration}s\`;
        heart.style.animationDelay = \`-\${delay}s\`;
        const direction = Math.random() > 0.5 ? 1 : -1;
        heart.style.setProperty('--direction', direction);
        container.appendChild(heart);
      }
    </script>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);

      // Config with user's customized settings baked in
      const customConfigContent = `/**
 * ROMANTIC DATE INVITATION CONFIGURATION
 * Created by Nikhil Chauhan
 */
export interface DateAppConfig {
  recipientName: string;
  senderName: string;
  whatsAppNumber: string;
  specialDate: string | null;
  audioUrl: string;
  messages: {
    questionTitle: string;
    questionSubtitle: string;
    celebrationTitle: string;
    celebrationSubtitle: string;
    quoteTitle: string;
    quoteSubtitle: string;
    confirmedTitle: string;
    confirmedSubtitle: string;
  };
}

export const DEFAULT_CONFIG: DateAppConfig = ${JSON.stringify(config, null, 2)};

export function getAppConfig(): DateAppConfig {
  try {
    const saved = localStorage.getItem('love_project_custom_config');
    if (saved) return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
  } catch (e) {}
  return DEFAULT_CONFIG;
}

export function saveAppConfig(newConfig: Partial<DateAppConfig>): DateAppConfig {
  const current = getAppConfig();
  const updated = { ...current, ...newConfig };
  try {
    localStorage.setItem('love_project_custom_config', JSON.stringify(updated));
  } catch (e) {}
  return updated;
}

export function resetAppConfig(): DateAppConfig {
  try {
    localStorage.removeItem('love_project_custom_config');
  } catch (e) {}
  return DEFAULT_CONFIG;
}
`;
      zip.file('src/config/dateConfig.ts', customConfigContent);

      // Fetch and bundle all GIF assets
      const gifFolder = zip.folder('public/gifs');
      if (gifFolder) {
        for (const [key, path] of Object.entries(GIFS)) {
          try {
            const resp = await fetch(path);
            if (resp.ok) {
              const blob = await resp.blob();
              const filename = path.split('/').pop() || `${key}.gif`;
              gifFolder.file(filename, blob);
            }
          } catch (e) {
            console.warn(`Could not fetch asset ${path}`, e);
          }
        }
      }

      // Generate Zip Blob and trigger download
      const content = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `love-project-${config.recipientName.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'custom'}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 3000);
    } catch (err) {
      console.error("Export error:", err);
      alert("Failed to create zip export. Please use CLI export: npm run export");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        className="w-full max-w-lg bg-neutral-900/95 border border-white/20 rounded-[32px] p-6 sm:p-8 text-white shadow-2xl relative"
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5 text-[var(--color-romantic-300)]">
            <FileArchive size={24} />
            <h2 className="text-xl font-bold font-sans">Export Project</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-white/70 mb-6 leading-relaxed">
          Download a standalone copy of this project bundled with your current customized names, special date, and WhatsApp configuration.
        </p>

        {/* Current summary */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 mb-6 text-sm">
          <div className="flex justify-between">
            <span className="text-white/60">Recipient:</span>
            <span className="font-semibold text-[var(--color-romantic-300)]">{config.recipientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">WhatsApp Number:</span>
            <span className="font-mono">{config.whatsAppNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Special Date:</span>
            <span>{config.specialDate ? config.specialDate.split('T')[0] : 'In-App Selected'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Creator Attribution:</span>
            <span className="font-semibold">Nikhil Chauhan</span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Sparkles size={14} className="text-[var(--color-romantic-300)]" />
            <span>Includes HTML, CSS, React components, reaction GIFs, and configs.</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Terminal size={14} className="text-white/40" />
            <span>Terminal users can also run <code className="text-white/80 bg-white/10 px-1 py-0.5 rounded">npm run export</code></span>
          </div>
        </div>

        {/* Export Button */}
        <button
          disabled={isExporting}
          onClick={handleDownloadZip}
          className="w-full py-4 px-6 rounded-full bg-[var(--color-romantic-400)] hover:bg-[var(--color-romantic-500)] font-bold text-base text-white shadow-xl shadow-[var(--color-romantic-500)]/30 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <Loader2 size={20} className="animate-spin" /> Packaging ZIP...
            </>
          ) : exportComplete ? (
            <>
              <Check size={20} /> Download Started! ❤️
            </>
          ) : (
            <>
              <Download size={20} /> Download Project ZIP
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}
