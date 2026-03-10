import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './Auth/auth.routes';
 
const app = express();
 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true // Crucial for cookies
}));
 
app.use('/api/v1/auth', authRoutes);
 
export default app;