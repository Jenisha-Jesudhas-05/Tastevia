import express from 'express';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';

import authRoutes from './Auth/auth.routes.js';
import productRoutes from './Modules/Products/product.routes.js'; 
import cartRoutes from "./Modules/Cart/cart.routes.js";
import orderRoutes from "./Modules/Orders/order.routes.js";
import { requireAuth } from "./middleware/auth.middleware.js";
const app = express();
const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://tastevia-dining-app.vercel.app",
];

const allowedOrigins = process.env.CLIENT_URLS
  ? process.env.CLIENT_URLS.split(",").map((origin) => origin.trim())
  : defaultAllowedOrigins;

app.use(express.json());
app.use(cookieParser());
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const isVercelPreview =
      typeof origin === "string" && /^https:\/\/.*\.vercel\.app$/.test(origin);

    if (!origin || allowedOrigins.includes(origin) || isVercelPreview) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes); 
app.use("/api/v1/cart", requireAuth, cartRoutes);
app.use("/api/v1/orders", requireAuth, orderRoutes);
export default app;
