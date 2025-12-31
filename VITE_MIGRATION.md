# Vite Migration Complete

This project has been successfully converted from a vanilla HTML/JS setup with Node.js server to use Vite.

## Changes Made

### 1. Configuration Files
- **vite.config.js**: Updated to support multi-page HTML application
  - Configured for vanilla JS (removed React plugin)
  - Added all HTML pages as entry points
  - Set up public directory
  - Added path aliases for easier imports

- **package.json**: Updated scripts and dependencies
  - Added `vite` as dev dependency
  - Updated scripts:
    - `npm run dev` - Start Vite dev server
    - `npm run build` - Build for production
    - `npm run preview` - Preview production build

### 2. HTML Files
- **index.html**: Cleaned up and converted to use Vite
  - Removed all cache-busting scripts (Vite handles this automatically)
  - Updated CSS import to `/css/styles.css`
  - Updated JS import to `/js/pages/home.js`
  - Simplified HTML structure

- **All page HTML files** (in `pages/` directory):
  - Updated CSS imports: `../css/styles.css` → `/css/styles.css`
  - Updated JS imports: `../js/...` → `/js/...`
  - Updated links: `../index.html` → `/`
  - Updated image paths: `/public/...` → `/...` (Vite serves public folder at root)

### 3. JavaScript Files
- **js/pages/demographics.js**: Updated image paths in dynamic HTML
- All other JS files: Relative imports (`../storage.js`, etc.) work correctly with Vite's ES module system

## How to Use

### Development
```bash
npm install
npm run dev
```
This will start the Vite dev server at `http://localhost:3000`

### Production Build
```bash
npm run build
```
This creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

## File Structure
```
.
├── index.html          # Main entry point
├── pages/              # All page HTML files
├── js/                 # JavaScript modules
├── css/                # Stylesheets
├── public/             # Static assets (served at root in Vite)
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies and scripts
```

## Notes
- Vite automatically handles HMR (Hot Module Replacement) during development
- All assets in the `public/` folder are served at the root path (`/`)
- CSS and JS files are automatically optimized and bundled in production
- No more manual cache-busting needed - Vite handles it automatically

