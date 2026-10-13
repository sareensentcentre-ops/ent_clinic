import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Website Booking Endpoint
app.post('/api/website-booking', (req, res) => {
  const { name, phone, treatment, department, date, slot_time } = req.body || {};

  if (date) {
    const [y, m, d] = date.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    if (dateObj.getDay() === 0) {
      return res.status(400).json({
        success: false,
        error: 'Clinic is closed on Sundays. Please select a date from Monday to Saturday.',
      });
    }
  }

  const token = `SAR-${Math.floor(100000 + Math.random() * 900000)}`;

  res.json({
    success: true,
    message: 'Appointment booking confirmed',
    token,
    booking: {
      name: name || '',
      phone: phone || '',
      treatment: treatment || department || '',
      date: date || '',
      slot_time: slot_time || '',
      token,
      createdAt: new Date().toISOString(),
    },
  });
});

// Serve static assets in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
