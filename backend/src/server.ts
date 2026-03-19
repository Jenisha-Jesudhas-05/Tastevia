import dotenv from 'dotenv';
dotenv.config(); 

import app from './app.js';
import prisma from './lib/prisma.js'; 

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Backend running at http://localhost:${PORT}`);
    });

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
    process.exit(1); 
  }
}

startServer();
