require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // ✅ Ensures form data parsing

// Connect to MongoDB using the MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));

const incomeRoutes = require("./routes/income"); // ✅ Check the path!
app.use("/api/income", incomeRoutes); // ✅ Make sure this is present

const expenseRoutes = require("./routes/expense"); // ✅ Check the path!
app.use("/api/expense", expenseRoutes); // ✅ Make sure this is present

const transactionsRoute = require("./routes/transactions"); // ✅ Import new transactions route
app.use("/transactions", transactionsRoute); // ✅ Use the transactions route

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
