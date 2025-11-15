const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const todoRouter = require("./routes/todoRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use("/api/todo", todoRouter);

// Start server
const PORT =process.env.PORT ||5000
app.listen(PORT, () => {
  console.log(` Server running on http://192.168.0.191:${PORT}`);
});
