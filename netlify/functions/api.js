import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import leadsRouter from '../../api/routes/leads.js';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (sin /api porque el redirect ya lo incluye)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes (sin /api porque el redirect ya lo incluye)
app.use('/leads', leadsRouter);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found', path: req.path });
});

export const handler = serverless(app);
