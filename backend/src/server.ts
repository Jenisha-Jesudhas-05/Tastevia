import dotenv from 'dotenv';
dotenv.config(); // Load env variables first

import app from './app';
import prisma from './lib/prisma'; // Use your adapter-based Prisma client

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // 1️⃣ Test Database Connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // 2️⃣ Start Express Server
    app.listen(PORT, () => {
      console.log(`🚀 Backend running at http://localhost:${PORT}`);
    });

    // Optional: Graceful shutdown on SIGINT / SIGTERM
    process.on('SIGINT', async () => {
      console.log('\n🛑 SIGINT received. Closing server...');
      await prisma.$disconnect();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\n🛑 SIGTERM received. Closing server...');
      await prisma.$disconnect();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1); // Exit if DB connection fails
  }
}

startServer();