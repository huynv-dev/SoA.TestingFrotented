import fs from 'fs';
import path from 'path';
import { getPageData } from '../lib/api';

const IMAGES_DIR = path.join(process.cwd(), 'public/static/images');

// Ensure the images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// List of required images based on the API data
const requiredImages = [
  // Base images
  'hero-image.png',
  'bg-map.png',
  'map.png',
  'ice-cream.png',
  'bg-explore.png',
  'sample-badge.svg',
  'arrow-right-1.svg',
  'arrow-up-blue.svg',
  'arrow-up-white.svg',
  'chat.svg',

  // Activity icons
  'online-classes.svg',
  'ethical-hunting.svg',
  'gastronomic-experiences.svg',
  'online-classes-pin.svg',
  'ethical-hunting-pin.svg',
  'gastronomic-experiences-pin.svg',
  'mountant-1.svg',
  'fishing-1.svg',
  'dinhvi-1.svg',
  'mountant.svg',
  'fishing.svg',
  'dinhvi.svg',
  'mountant-pin.svg',
  'fishing-pin.svg',
  'navigate-pin.svg',

  // Feature icons
  'authenticity.svg',
  'respect.svg',
  'diversity.svg',
  'personalization.svg',
  'comfort.svg',
];

async function main() {
  try {
    // Get the API data to check for any additional required images
    const pageData = await getPageData();

    // Add category-based images from the API data
    const categories = [
      ...pageData.bloc_1.cases.map(c => c.category),
      ...pageData.bloc_3.cases.map(c => c.category),
    ];

    // Add category-based image filenames
    categories.forEach(category => {
      const filename = `${category.toLowerCase().replace(/\s+/g, '-')}.png`;
      if (!requiredImages.includes(filename)) {
        requiredImages.push(filename);
      }
    });

    // Check for missing images
    const missingImages = requiredImages.filter(
      image => !fs.existsSync(path.join(IMAGES_DIR, image))
    );

    if (missingImages.length > 0) {
      console.log('The following images are missing and need to be added to public/static/images/:');
      missingImages.forEach(image => console.log(`- ${image}`));
    } else {
      console.log('All required images are present.');
    }

    // Create placeholder SVGs for missing icons
    missingImages
      .filter(image => image.endsWith('.svg'))
      .forEach(image => {
        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="12" cy="12" r="3"/></svg>`;
        fs.writeFileSync(path.join(IMAGES_DIR, image), svgContent);
        console.log(`Created placeholder SVG for ${image}`);
      });

  } catch (error) {
    console.error('Error preparing images:', error);
    process.exit(1);
  }
}

main(); 