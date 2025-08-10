import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import apiRouter from './routes/index.js';
import { connectToDatabase } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.json({
    name: 'GLOBAL-SPHERE-AGRI-TECH API',
    status: 'ok',
    docs: '/api',
  });
});

app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

async function start() {
  try {
    if (process.env.MONGODB_URI) {
      try {
        await connectToDatabase();
        console.log('Connected to MongoDB');
      } catch (dbErr) {
        console.warn('Failed to connect to MongoDB, continuing without DB:', dbErr.message);
      }
    } else {
      console.log('MONGODB_URI not set, continuing without DB');
    }
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();