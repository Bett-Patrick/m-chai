import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
import path from 'path';

const dataPath = path.resolve(__dirname, 'src/data/data.json');

async function readData() {
  const file = await fs.readFile(dataPath, 'utf-8');
  return JSON.parse(file);
}

async function writeData(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

export default defineConfig({
  plugins: [react()],
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url?.startsWith('/api/')) {
        return next();
      }

      if (req.url === '/api/farmers' && req.method === 'GET') {
        try {
          const data = await readData();
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ farmers: data.farmers }));
        } catch (error) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Unable to read farmer data' }));
        }
        return;
      }

      if (req.url === '/api/delivery' && req.method === 'POST') {
        try {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { farmerId, kilos, date } = JSON.parse(body);
              const data = await readData();
              const farmer = data.farmers.find(f => f.id === farmerId);
              if (!farmer) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Farmer not found' }));
                return;
              }

              const currentRate = data.exchangeRates.find(r => r.current)?.rate || 20;
              farmer.balance = Number((farmer.balance + kilos).toFixed(1));
              farmer.value = farmer.value + Math.round(kilos * currentRate);
              await writeData(data);

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ farmers: data.farmers, farmer }));
            } catch (error) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Unable to record delivery', details: error.message }));
            }
          });
        } catch (error) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Request error', details: error.message }));
        }
        return;
      }

      next();
    });
  }
});
