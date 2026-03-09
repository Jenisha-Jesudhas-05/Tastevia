// src/server.ts
import express from "express";

const app = express();
const PORT = 5000;

// Simple route to test the server
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});