const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Installing image optimization packages...');
// Check if the packages are installed
try {
  require.resolve('imagemin');
  require.resolve('imagemin-mozjpeg');
  require.resolve('imagemin-pngquant');
  require.resolve('imagemin-webp');
} catch (e) {
  // If packages are missing, install them
  console.log('Installing required packages...');
  execSync('npm install --save-dev imagemin imagemin-mozjpeg imagemin-pngquant imagemin-webp');
}

// Now require the packages
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');

// Directories
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const IMAGE_DIRS = [
  path.join(PUBLIC_DIR, 'images'),
  path.join(PUBLIC_DIR, 'assets')
];

// Create WebP versions of all images
async function convertToWebp(directory) {
  try {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(directory, file.name);
      
      if (file.isDirectory()) {
        await convertToWebp(fullPath);
      } else if (/\.(jpe?g|png)$/i.test(file.name)) {
        console.log(`Converting to WebP: ${fullPath}`);
        const webpPath = fullPath.replace(/\.(jpe?g|png)$/i, '.webp');
        
        await imagemin([fullPath], {
          destination: path.dirname(webpPath),
          plugins: [
            imageminWebp({ quality: 75 })
          ]
        });
        
        // Rename output file
        const outputFile = path.join(
          path.dirname(webpPath),
          path.basename(fullPath).replace(/\.(jpe?g|png)$/i, '.webp')
        );
        
        if (fs.existsSync(outputFile)) {
          console.log(`Created: ${outputFile}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
  }
}

// Optimize all JPG and PNG images
async function optimizeImages(directory) {
  try {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(directory, file.name);
      
      if (file.isDirectory()) {
        await optimizeImages(fullPath);
      } else if (/\.jpe?g$/i.test(file.name)) {
        console.log(`Optimizing JPEG: ${fullPath}`);
        
        await imagemin([fullPath], {
          destination: path.dirname(fullPath),
          plugins: [
            imageminMozjpeg({ quality: 80 })
          ]
        });
      } else if (/\.png$/i.test(file.name)) {
        console.log(`Optimizing PNG: ${fullPath}`);
        
        await imagemin([fullPath], {
          destination: path.dirname(fullPath),
          plugins: [
            imageminPngquant({ quality: [0.65, 0.8] })
          ]
        });
      }
    }
  } catch (error) {
    console.error(`Error optimizing images in ${directory}:`, error);
  }
}

// Main function
async function main() {
  for (const dir of IMAGE_DIRS) {
    // Skip if directory doesn't exist
    if (!fs.existsSync(dir)) continue;
    
    console.log(`Processing directory: ${dir}`);
    
    // First optimize the original images
    await optimizeImages(dir);
    
    // Then create WebP versions
    await convertToWebp(dir);
  }
  
  console.log('Image optimization complete!');
}

main().catch(error => {
  console.error('Error in image optimization script:', error);
  process.exit(1);
}); 