const express = require("express");
const router = express.Router();
const AddIncome = require("../models/Addincome"); // ✅ Check the path to the model

router.post("/add", async (req, res) => {
    try {
      console.log("📩 Received payload in backend:", req.body); // ✅ Log received data
  
      const { email, source, amount, date, notes, paymentMethod } = req.body;
  
      if (!email || !source || !amount || !date) {
        return res.status(400).json({ error: "All fields are required!" });
      }
  
      const newIncome = new AddIncome({
        email, // ✅ Ensure email is added
        source,
        amount,
        date,
        notes,
        paymentMethod,
      });
  
      await newIncome.save();
      console.log("✅ Income saved in DB:", newIncome); // ✅ Log saved data
  
      res.status(201).json({ message: "Income added successfully!", income: newIncome });
    } catch (err) {
      console.error("❌ Error adding income:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
module.exports = router;
