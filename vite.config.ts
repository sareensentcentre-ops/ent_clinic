import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function apiBookingPlugin(): Plugin {
  const handler = (req: any, res: any, next: any) => {
    if (req.url && (req.url === '/api/website-booking' || req.url.startsWith('/api/website-booking?'))) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
      }

      if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}');

            // Check if Sunday
            if (data.date) {
              const [y, m, d] = data.date.split('-').map(Number);
              const dateObj = new Date(y, m - 1, d);
              if (dateObj.getDay() === 0) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 400;
                res.end(JSON.stringify({
                  success: false,
                  error: 'Clinic is closed on Sundays. Please select a date from Monday to Saturday.'
                }));
                return;
              }
            }

            const token = `SAR-${Math.floor(100000 + Math.random() * 900000)}`;
            const responseData = {
              success: true,
              message: 'Appointment booking confirmed',
              token,
              booking: {
                name: data.name || '',
                phone: data.phone || '',
                treatment: data.treatment || data.department || '',
                date: data.date || '',
                slot_time: data.slot_time || '',
                token,
                createdAt: new Date().toISOString(),
              },
            };
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(responseData));
          } catch (e) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 400;
            res.end(JSON.stringify({ success: false, error: 'Invalid JSON body' }));
          }
        });
        return;
      }
    }
    next();
  };

  return {
    name: 'api-website-booking-plugin',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiBookingPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
