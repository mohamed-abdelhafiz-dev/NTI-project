require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase()
  .then(() => {
    console.log("Database connected successfully 🎉");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

