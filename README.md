# Romantic Date Invitation Template ❤️

> **This Project is Created by Nikhil Chauhan**

An interactive, responsive, and romantic date invitation web application template built with **React**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Motion**.

Easily customize names, dates, activities, preferences, and WhatsApp confirmation numbers for your special someone!

---

## 🌟 Features

- **Interactive Runaway "NO" Button**: Playfully dodges clicks and touches with spring physics and funny reaction messages.
- **Celebration & Confetti**: Vibrant multi-color confetti explosion upon accepting.
- **Dynamic Date Picker & Calendar**: Interactive month-by-month calendar view with quick presets and heart badge date selection.
- **Activity & Preferences Selection**: Multi-select activity cards and romantic preference chips + custom input.
- **WhatsApp Integration**: Sends the completed date plan directly to your WhatsApp with one click.
- **Persistent Watermark**: Clean, subtle creator attribution (*Created by Nikhil Chauhan*).
- **In-App Customization & Export**: Change names/dates live in the UI or download a complete standalone ZIP bundle directly from the browser.
- **Atmospheric Visuals & Audio**: Glowing animated orbs, floating romantic hearts, glassmorphism cards, and background music player.

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
- Node.js (version 18+ recommended)
- npm, yarn, or pnpm

### Installation & Run

```bash
# 1. Navigate to the project directory
cd love-project-public

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

---

## 🛠️ How to Edit & Personalize

Everything you need to customize is organized in **one central file**:

📁 [`src/config/dateConfig.ts`](./src/config/dateConfig.ts)

### 1. Change Her Name / Recipient Name
Open `src/config/dateConfig.ts` and edit `recipientName`:
```ts
export const DEFAULT_CONFIG: DateAppConfig = {
  recipientName: "Sophia", // 👈 Enter your girlfriend's name here
  senderName: "Me",
  ...
};
```

### 2. Change WhatsApp Number
Replace the default demonstration number (`+919876543210`) with your actual WhatsApp phone number (including country code, without spaces or symbols):
```ts
whatsAppNumber: "+1234567890", // 👈 Your WhatsApp number with country code
```

### 3. Change or Preset a Special Date
You can set a default date or leave it `null` so she picks it herself in the interactive calendar:
```ts
specialDate: "2026-10-24", // 👈 'YYYY-MM-DD' or null
```

### 4. Live In-App Customizer
You can also click the **Customize** (gear icon) button at the top-left of the running web application to change names and phone numbers in real time without writing any code.

### 5. Replacing Images & GIFs
Reaction GIFs are located in the `public/gifs/` folder:
- `waiting.gif` - Waiting cat on the opening question screen
- `yes.gif` - Happy celebration GIF
- `sad1.gif` / `sad2.gif` - Runaway NO button reaction GIFs
- `love.gif` - Romantic couple GIF on the smile reflection screen
- `date.gif`, `excited.gif`, `kiss.gif`, `flowers.gif` - Additional bonus reaction GIFs

To replace any GIF, drop your preferred GIF into `public/gifs/` with the same filename.

### 6. Changing Background Music
Update the `audioUrl` in `src/config/dateConfig.ts`:
```ts
audioUrl: "https://your-domain.com/path-to-your-romantic-song.mp3",
```

---

## 📦 Project Structure

```text
love-project-public/
├── index.html                   # HTML5 entry with floating hearts background
├── README.md                    # Project documentation & guide
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite & Tailwind CSS bundler configuration
├── export.js                    # Standalone export script (npm run export)
├── public/
│   └── gifs/                    # Cute reaction GIFs
│       ├── waiting.gif
│       ├── yes.gif
│       ├── sad1.gif
│       ├── sad2.gif
│       └── love.gif
└── src/
    ├── App.tsx                  # Core state manager & screen router
    ├── main.tsx                 # React DOM mount entry
    ├── types.ts                 # TypeScript data structures & plans
    ├── constants.ts             # Asset references
    ├── index.css                # Tailwind CSS, theme tokens & custom animations
    ├── config/
    │   └── dateConfig.ts        # Central configuration file
    └── components/
        ├── AskingScreen.tsx           # Opening question with runaway NO button
        ├── YesCelebrationScreen.tsx   # Confetti celebration screen
        ├── DateSelectionScreen.tsx    # Interactive calendar picker
        ├── ActivitySelectionScreen.tsx# Date activity selector
        ├── PreferencesScreen.tsx      # Romantic preference chips
        ├── SmileScreen.tsx            # Love reflection screen
        ├── SummaryScreen.tsx          # Summary & WhatsApp sender
        ├── AudioPlayer.tsx            # Floating background music player
        ├── Watermark.tsx              # Persistent creator attribution layer
        ├── DateModal.tsx              # Quick date picker modal
        ├── SettingsModal.tsx          # In-app customization modal
        └── ExportModal.tsx            # Standalone project ZIP generator
```

---

## 💻 Technologies Used

- **React 19** - Component architecture and declarative state rendering.
- **TypeScript** - Strongly typed configuration and props.
- **Vite 6** - Lightning-fast development server and production bundler.
- **Tailwind CSS v4** - Modern CSS-first utility design system.
- **Motion (`motion/react`)** - Spring physics animations, transitions, and gesture controls.
- **Canvas Confetti** - Particle effects for the acceptance celebration.
- **Lucide React** - Clean and accessible romantic iconography.
- **Date-fns** - Lightweight, locale-aware date manipulation and formatting.
- **JSZip** - In-browser standalone project packaging and export.
- **Google Fonts** - Typography pairing (*Plus Jakarta Sans* and *Caveat*).

---

## 🎨 UI / Design Techniques

- **Glassmorphism**: Translucent frosted-glass cards with backdrop blur filters and subtle borders.
- **Dynamic Gradient Orbs**: Eight independently keyframe-animated ambient light spheres.
- **Floating Hearts**: Continuous CSS particle stream rendered in the background.
- **Responsive Layout**: Fluid breakpoints catering to small mobile screens, tablets, and large displays.
- **Spring Physics**: Dynamic physics-based runaway button motion.
- **Accessible Controls**: Full keyboard navigation, touch support, and reduced-motion fallbacks.

---

## 🚢 Exporting & Deployment

### In-Browser Export
Click the **Export** button at the top-left of the running app to download a clean `.zip` archive with all your current custom names, dates, and WhatsApp configuration baked in!

### CLI Export
Run the following command to generate a clean `export-dist/` standalone directory:
```bash
npm run export
```

### Deploying to Netlify / Vercel / GitHub Pages
1. Build the production distribution:
   ```bash
   npm run build
   ```
2. Deploy the generated `dist/` directory to any static hosting provider:
   - **Vercel**: Import the GitHub repository or use `npx vercel`.
   - **Netlify**: Drag and drop the `dist/` folder into Netlify Drop.
   - **GitHub Pages**: Deploy the `dist/` folder via GitHub Actions.

---

## 📜 Ownership & License

**This Project is Created by Nikhil Chauhan**

Created with love. Feel free to use and customize this template for your own romantic date proposals! ❤️
