import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

function generateModelsPlugin() {
  return {
    name: 'generate-models-json',
    buildStart() {
      const modelsDir = path.resolve(__dirname, 'public/models');
      if (!fs.existsSync(modelsDir)) return;
      
      const models = [];
      const dirs = fs.readdirSync(modelsDir, { withFileTypes: true });
      for (const dirent of dirs) {
        if (dirent.isDirectory()) {
          const indexPath = path.join(modelsDir, dirent.name, 'index.html');
          if (fs.existsSync(indexPath)) {
            const display_name = dirent.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            models.push({
              id: dirent.name,
              name: display_name,
              path: `/models/${dirent.name}/index.html`
            });
          }
        }
      }
      
      const outPath = path.resolve(__dirname, 'public/models.json');
      fs.writeFileSync(outPath, JSON.stringify(models, null, 2));
      console.log(`[Success] Generated public/models.json with ${models.length} models.`);
    }
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), generateModelsPlugin()],
  server: {
    port: 3000,
    open: true
  }
});
