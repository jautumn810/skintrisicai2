// Script to generate missing images for the Skinstric website
// Run with: node scripts/generate-images.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create icons directory if it doesn't exist
const iconsDir = path.join(publicDir, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Function to create SVG diamond shape
function createDiamondSVG(size, strokeColor = '#A0A4AB', strokeWidth = 1) {
  const center = size / 2;
  const points = [
    `${center},0`,           // top
    `${size},${center}`,     // right
    `${center},${size}`,     // bottom
    `0,${center}`            // left
  ];
  
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <polygon points="${points.join(' ')}" 
           fill="none" 
           stroke="${strokeColor}" 
           stroke-width="${strokeWidth}"
           stroke-dasharray="4 4"/>
</svg>`;
}

// Function to create SVG camera icon (black and white aperture)
function createCameraIconSVG(size = 136) {
  const center = size / 2;
  const outerRadius = size / 2 - 4;
  const middleRadius = outerRadius - 8;
  const innerRadius = middleRadius - 8;
  const bladeLength = innerRadius - 6;
  const hexRadius = bladeLength / 2;
  
  // Create 6 triangular blades
  const blades = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const x1 = center + Math.cos(angle) * innerRadius;
    const y1 = center + Math.sin(angle) * innerRadius;
    const x2 = center + Math.cos(angle + Math.PI / 3) * innerRadius;
    const y2 = center + Math.sin(angle + Math.PI / 3) * innerRadius;
    const x3 = center + Math.cos(angle + Math.PI / 6) * bladeLength;
    const y3 = center + Math.sin(angle + Math.PI / 6) * bladeLength;
    blades.push(`<path d="M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} Z" fill="#111" stroke="#111"/>`);
  }
  
  // Create hexagonal center opening
  const hexPoints = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3 + Math.PI / 6;
    const x = center + Math.cos(angle) * hexRadius;
    const y = center + Math.sin(angle) * hexRadius;
    hexPoints.push(`${x},${y}`);
  }
  
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${center}" cy="${center}" r="${outerRadius}" fill="none" stroke="#111" stroke-width="6"/>
  <circle cx="${center}" cy="${center}" r="${middleRadius}" fill="none" stroke="#111" stroke-width="4"/>
  ${blades.join('\n  ')}
  <polygon points="${hexPoints.join(' ')}" fill="#fff" stroke="#111" stroke-width="1"/>
</svg>`;
}

// Function to create camera aperture icon - solid black circle with white hexagonal opening
function createCameraApertureSVG(size = 180) {
  const center = size / 2;
  const radius = size / 2 - 2;
  
  // Create 6 overlapping triangular blades that form the aperture
  const blades = [];
  const hexRadius = radius * 0.35; // Size of the hexagonal opening
  
  for (let i = 0; i < 6; i++) {
    const baseAngle = (i * Math.PI) / 3;
    // Each blade is a triangle from the hexagon edge to the circle edge
    const hexAngle1 = baseAngle + Math.PI / 6;
    const hexAngle2 = baseAngle + Math.PI / 3 + Math.PI / 6;
    
    const hexX1 = center + Math.cos(hexAngle1) * hexRadius;
    const hexY1 = center + Math.sin(hexAngle1) * hexRadius;
    const hexX2 = center + Math.cos(hexAngle2) * hexRadius;
    const hexY2 = center + Math.sin(hexAngle2) * hexRadius;
    
    // Outer point of the blade (on the circle)
    const outerAngle = baseAngle + Math.PI / 6;
    const outerX = center + Math.cos(outerAngle) * radius;
    const outerY = center + Math.sin(outerAngle) * radius;
    
    blades.push(`<path d="M ${hexX1} ${hexY1} L ${hexX2} ${hexY2} L ${outerX} ${outerY} Z" fill="#111"/>`);
  }
  
  // Create hexagonal center opening (white)
  const hexPoints = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3 + Math.PI / 6;
    const x = center + Math.cos(angle) * hexRadius;
    const y = center + Math.sin(angle) * hexRadius;
    hexPoints.push(`${x},${y}`);
  }
  
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${center}" cy="${center}" r="${radius}" fill="#111"/>
  ${blades.join('\n  ')}
  <polygon points="${hexPoints.join(' ')}" fill="#fff"/>
</svg>`;
}

// Function to create SVG gallery icon (landscape with sun)
function createGalleryIconSVG(size = 136) {
  const center = size / 2;
  const outerRadius = size / 2 - 4;
  
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${center}" cy="${center}" r="${outerRadius}" fill="#fff" stroke="#111" stroke-width="6"/>
  <!-- Mountain range -->
  <path d="M ${size * 0.2} ${size * 0.7} L ${size * 0.35} ${size * 0.5} L ${size * 0.5} ${size * 0.6} L ${size * 0.65} ${size * 0.45} L ${size * 0.8} ${size * 0.7} Z" fill="#111"/>
  <!-- Sun/Moon circle -->
  <circle cx="${size * 0.75}" cy="${size * 0.35}" r="${size * 0.12}" fill="#111"/>
</svg>`;
}

// Function to create SVG line (scan/gallery line)
function createLineSVG(width = 66, height = 59) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}" 
        stroke="#1A1B1C" stroke-width="2" stroke-linecap="round"/>
  <circle cx="${width * 0.2}" cy="${height / 2}" r="3" fill="#1A1B1C"/>
  <circle cx="${width * 0.8}" cy="${height / 2}" r="3" fill="#1A1B1C"/>
</svg>`;
}

// Generate images
const imagesToCreate = [
  // Result page diamonds
  { name: 'ResDiamond-large.png', svg: createDiamondSVG(482, '#A0A4AB', 1), width: 482, height: 482 },
  { name: 'ResDiamond-medium.png', svg: createDiamondSVG(444, '#A0A4AB', 1), width: 444, height: 444 },
  { name: 'ResDiamond-small.png', svg: createDiamondSVG(405, '#A0A4AB', 1), width: 405, height: 405 },
  
  // Testing page diamonds
  { name: 'Diamond-light-large.png', svg: createDiamondSVG(762, '#A0A4AB', 1), width: 762, height: 762 },
  { name: 'Diamond-medium-medium.png', svg: createDiamondSVG(682, '#A0A4AB', 1), width: 682, height: 682 },
  { name: 'Diamond-dark-small.png', svg: createDiamondSVG(602, '#A0A4AB', 1), width: 602, height: 602 },
  
  // Icons
  { name: 'camera-icon.png', svg: createCameraIconSVG(136), width: 136, height: 136 },
  { name: 'gallery-icon.png', svg: createGalleryIconSVG(136), width: 136, height: 136 },
  
  // Camera aperture icon for permissions page
  { name: 'icons/camera-aperture.png', svg: createCameraApertureSVG(180), width: 180, height: 180 },
  
  // Lines
  { name: 'ResScanLine.png', svg: createLineSVG(66, 59), width: 66, height: 59 },
  { name: 'ResGalleryLine.png', svg: createLineSVG(66, 59), width: 66, height: 59 },
];

// Generate PNG images using sharp
console.log('Generating PNG images...\n');

async function generateImages() {
  for (const { name, svg, width, height } of imagesToCreate) {
    const filePath = path.join(publicDir, name);
    // Ensure directory exists for nested paths
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    try {
      // Convert SVG to PNG
      await sharp(Buffer.from(svg))
        .resize(width, height, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(filePath);
      
      console.log(`✓ Created ${name}`);
    } catch (error) {
      console.error(`✗ Error creating ${name}:`, error.message);
    }
  }
  
  console.log('\nImage generation complete!');
}

generateImages().catch(console.error);

