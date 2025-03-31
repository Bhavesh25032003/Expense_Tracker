const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  email: { type: String, required: true }, // ✅ Store the logged-in user's email
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String },
});

const ExpenseModel = mongoose.model("Addexpense", ExpenseSchema);

module.exports = ExpenseModel;
