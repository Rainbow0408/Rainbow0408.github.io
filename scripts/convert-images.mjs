/**
 * 批量将 public/ 下的 jpg/png 图片转换为 webp 格式
 * 使用方式: node scripts/convert-images.mjs
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');
const QUALITY = 80; // WebP quality (80 is excellent balance)

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findImages(fullPath));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function convert() {
  const images = await findImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images to convert.\n`);

  let totalOriginal = 0;
  let totalWebp = 0;

  for (const imgPath of images) {
    const ext = extname(imgPath);
    const webpPath = imgPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const name = imgPath.replace(PUBLIC_DIR, '');

    try {
      const originalStats = await stat(imgPath);
      const originalSize = originalStats.size;

      await sharp(imgPath)
        .webp({ quality: QUALITY })
        .toFile(webpPath);

      const webpStats = await stat(webpPath);
      const webpSize = webpStats.size;

      totalOriginal += originalSize;
      totalWebp += webpSize;

      const reduction = ((1 - webpSize / originalSize) * 100).toFixed(1);
      console.log(`✓ ${name}  ${(originalSize / 1024).toFixed(0)}KB → ${(webpSize / 1024).toFixed(0)}KB  (-${reduction}%)`);
    } catch (err) {
      console.error(`✗ ${name}: ${err.message}`);
    }
  }

  console.log(`\n========================================`);
  console.log(`Total: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB → ${(totalWebp / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Overall reduction: ${((1 - totalWebp / totalOriginal) * 100).toFixed(1)}%`);
  console.log(`========================================`);
}

convert();
