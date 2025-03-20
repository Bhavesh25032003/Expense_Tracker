import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

const ExpenseModal = ({ isOpen, onClose }) => {
  const [expenseData, setExpenseData] = useState({
    category: "",
    amount: "",
    paymentMethod: "",
    date: "",
    notes: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({ ...expenseData, [name]: value });

    if (name === "amount" && value < 0) {
      setError("Amount cannot be negative!");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expenseData.amount || expenseData.amount <= 0) {
      setError("Please enter a valid expense amount.");
      return;
    }
    console.log("Expense Added:", expenseData);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      {/* Header with Gradient */}
      <Modal.Header
        closeButton
        className="text-center"
        style={{
          background: "linear-gradient(to right, #FF9A8B, #FF6A88, #FF99AC)",
          color: "white",
        }}
      >
        <Modal.Title
          style={{
            width: "100%",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          📉 Add Expense
        </Modal.Title>
      </Modal.Header>

      {/* Glassmorphism Modal Body */}
      <Modal.Body
        style={{
          backgroundColor: "rgba(255, 235, 230, 0.9)", // Soft Glassmorphism
          backdropFilter: "blur(12px)", // Blurred effect
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <Form onSubmit={handleSubmit}>
          {/* Expense Category */}
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Expense Category</Form.Label>
            <Form.Select
              name="category"
              value={expenseData.category}
              onChange={handleChange}
              required
              style={{
                borderRadius: "8px",
                border: "2px solid #FF6A88",
                padding: "10px",
              }}
            >
              <option value="">Select Category</option>
              <option value="Rent/Mortgage">🏠 Rent/Mortgage</option>
              <option value="Utilities">💡 Utilities</option>
              <option value="Groceries">🛒 Groceries</option>
              <option value="Transportation">🚗 Transportation</option>
              <option value="Insurance">📜 Insurance</option>
              <option value="Medical & Healthcare">🏥 Medical & Healthcare</option>
              <option value="Education">📚 Education</option>
              <option value="Dining Out">🍽️ Dining Out</option>
              <option value="Entertainment">🎬 Entertainment</option>
              <option value="Shopping">🛍️ Shopping</option>
              <option value="Travel">✈️ Travel</option>
              <option value="Subscriptions">📺 Subscriptions</option>
              <option value="Debt Payments">💳 Debt Payments</option>
              <option value="Taxes">💰 Taxes</option>
              <option value="Charity & Donations">🤲 Charity & Donations</option>
              <option value="Savings & Investments">📈 Savings & Investments</option>
              <option value="Miscellaneous">🔹 Miscellaneous</option>
            </Form.Select>
          </Form.Group>

          {/* Amount Input */}
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Amount</Form.Label>
            <InputGroup>
              <InputGroup.Text style={{ backgroundColor: "#FF6A88", color: "white" }}>₹</InputGroup.Text>
              <Form.Control
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={expenseData.amount}
                onChange={handleChange}
                required
                style={{
                  borderRadius: "8px",
                  border: "2px solid #FF6A88",
                  padding: "10px",
                }}
              />
            </InputGroup>
            {error && <small className="text-danger">{error}</small>}
          </Form.Group>

          {/* Payment Method */}
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Payment Method</Form.Label>
            <Form.Select
              name="paymentMethod"
              value={expenseData.paymentMethod}
              onChange={handleChange}
              required
              style={{
                borderRadius: "8px",
                border: "2px solid #FF6A88",
                padding: "10px",
              }}
            >
              <option value="">Select Method</option>
              <option value="UPI">📲 UPI (Google Pay, PhonePe, Paytm)</option>
              <option value="Debit Card">💳 Debit Card</option>
              <option value="Credit Card">💳 Credit Card</option>
              <option value="Net Banking">🏦 Net Banking</option>
              <option value="Cash">💵 Cash Payment</option>
              <option value="Wallets">📱 Mobile Wallets</option>
            </Form.Select>
          </Form.Group>

          {/* Date Picker */}
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={expenseData.date}
              onChange={handleChange}
              required
              style={{
                borderRadius: "8px",
                border: "2px solid #FF6A88",
                padding: "10px",
              }}
            />
          </Form.Group>

          {/* Notes */}
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Notes (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              rows={2}
              placeholder="Additional details..."
              value={expenseData.notes}
              onChange={handleChange}
              style={{
                borderRadius: "8px",
                border: "2px solid #FF6A88",
                padding: "10px",
              }}
            />
          </Form.Group>

          {/* Footer Buttons */}
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={onClose}
              style={{
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
                border: "2px solid #FF6A88",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#f1aeb5")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              disabled={!!error}
              style={{
                backgroundColor: "#FF6A88",
                border: "none",
                color: "white",
                fontWeight: "bold",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#f1aeb5")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#FF6A88")}
            >
              Add Expense
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ExpenseModal;
