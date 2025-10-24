const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'src/assets/img';

function convertToWebp(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      convertToWebp(filePath); // recursive for subfolders
    } else if (/\.(jpe?g|png)$/i.test(file)) {
      const outputPath = filePath.replace(/\.(jpe?g|png)$/i, '.webp');

      if (!fs.existsSync(outputPath)) {
        sharp(filePath)
          .webp({ quality: 80 })
          .toFile(outputPath)
          .then(() => console.log(`✅ Converted: ${outputPath}`))
          .catch((err) => console.error(`❌ Error: ${filePath}`, err));
      }
    }
  });
}

convertToWebp(inputDir);
