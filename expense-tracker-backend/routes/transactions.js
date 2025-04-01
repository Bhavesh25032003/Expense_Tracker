const express = require("express");
const router = express.Router();
const IncomeModel = require("../models/Addincome");
const ExpenseModel = require("../models/Addexpense");

// ✅ Route to fetch ALL transactions (income & expense) for a specific user
router.get("/:email", async (req, res) => {
    try {
        const email = req.params.email;
        if (!email) {
            return res.status(400).json({ error: "Email is required!" });
        }

        // ✅ Fetch income and expenses for the user
        const incomes = await IncomeModel.find({ email });
        const expenses = await ExpenseModel.find({ email });

        // ✅ Add 'type' property to each transaction and merge them
        const incomeTransactions = incomes.map(income => ({ ...income.toObject(), type: 'income' }));
        const expenseTransactions = expenses.map(expense => ({ ...expense.toObject(), type: 'expense' }));

        // ✅ Merge and sort by date (newest first)
        const transactions = [...incomeTransactions, ...expenseTransactions].sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json(transactions);
    } catch (err) {
        console.error("❌ Error fetching transactions:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
