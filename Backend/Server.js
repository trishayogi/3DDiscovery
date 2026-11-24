const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
//Middleware
app.use(cors());
app.use(express.json())
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" })
})
// Database connection
connectDB();

const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/userRotue")
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Backend is running on ${PORT}`)
})