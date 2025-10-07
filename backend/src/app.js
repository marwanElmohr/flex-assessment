import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import reviewsRouter from './routes/reviews.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '../public');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(PUBLIC_DIR));

app.use('/api/reviews', reviewsRouter);

export default app;
