import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Routes
import authRoutes from './Auth/auth.routes';
import productRoutes from './Modules/Products/product.routes'; // Add Product routes
import cartRoutes from "./Modules/Cart/cart.routes";
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Crucial for cookies
}));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes); // Product API
app.use("/api/v1/cart", cartRoutes);
export default app;