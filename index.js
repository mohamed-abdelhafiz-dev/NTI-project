require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const audioRoutes = require("./routes/audio.routes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/audios", audioRoutes);

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

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
