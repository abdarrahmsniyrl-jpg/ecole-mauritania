import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.json({
    message: 'مدرسة موريتانيا للإلكترونية',
    tagline: 'منارة العلم.. أصالة الشناقطة برؤية رقمية',
    version: '1.0.0',
    status: 'running'
  });
});

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log('مدرسة موريتانيا للإلكترونية - قيد التشغيل');
});

export default app;
