import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

const IncomeModal = ({ isOpen, onClose }) => {
  const [incomeData, setIncomeData] = useState({
    sourceCategory: "",
    amount: "",
    paymentMethod: "",
    date: "",
    notes: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({ ...incomeData, [name]: value });

    if (name === "amount" && value < 0) {
      setError("Amount cannot be negative!");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!incomeData.amount || incomeData.amount <= 0) {
      setError("Please enter a valid income amount.");
      return;
    }
    console.log("Income Added:", incomeData);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      {/* Header with Gradient */}
      <Modal.Header
        closeButton
        className="text-center"
        style={{
          background: "linear-gradient(to right, #F8B195, #F67280, #F6A89E)",
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
          💰 Add Income
        </Modal.Title>
      </Modal.Header>

      {/* Glassmorphism Modal Body */}
      <Modal.Body
        style={{
          backgroundColor: "rgba(255, 230, 220, 0.9)", // Soft pastel peach glass effect
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <Form onSubmit={handleSubmit}>
          {/* Income Category */}
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Source Category</Form.Label>
            <Form.Select
              name="sourceCategory"
              value={incomeData.sourceCategory}
              onChange={handleChange}
              required
              style={{
                borderRadius: "8px",
                border: "2px solid #F6A89E",
                padding: "10px",
                transition: "0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#F67280")}
              onBlur={(e) => (e.target.style.borderColor = "#F6A89E")}
            >
              <option value="">Select Source</option>
              <option value="Salary/Wages">💼 Salary/Wages</option>
              <option value="Freelance Work">💻 Freelance Work</option>
              <option value="Business Profits">📈 Business Profits</option>
              <option value="Investments">📊 Investments</option>
              <option value="Rental Income">🏠 Rental Income</option>
              <option value="Interest Earned">🏦 Interest Earned</option>
              <option value="Bonuses & Commissions">🎯 Bonuses & Commissions</option>
              <option value="Pension & Retirement Funds">🛡️ Pension & Retirement Funds</option>
              <option value="Government Benefits">🏛️ Government Benefits</option>
              <option value="Side Hustles">🛒 Side Hustles</option>
              <option value="Gifts & Donations Received">🎁 Gifts & Donations Received</option>
              <option value="Tax Refunds">💰 Tax Refunds</option>
              <option value="Royalties">📖 Royalties</option>
              <option value="Scholarships & Grants">🎓 Scholarships & Grants</option>
              <option value="Other">🔹 Other</option>
            </Form.Select>
          </Form.Group>

          {/* Amount Input */}
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Amount</Form.Label>
            <InputGroup>
              <InputGroup.Text style={{ backgroundColor: "#F67280", color: "white" }}>₹</InputGroup.Text>
              <Form.Control
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={incomeData.amount}
                onChange={handleChange}
                required
                style={{
                  borderRadius: "8px",
                  border: "2px solid #F6A89E",
                  padding: "10px",
                  transition: "0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#F67280")}
                onBlur={(e) => (e.target.style.borderColor = "#F6A89E")}
              />
            </InputGroup>
            {error && <small className="text-danger">{error}</small>}
          </Form.Group>

          {/* Payment Method */}
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Payment Method</Form.Label>
            <Form.Select
              name="paymentMethod"
              value={incomeData.paymentMethod}
              onChange={handleChange}
              required
              style={{
                borderRadius: "8px",
                border: "2px solid #F6A89E",
                padding: "10px",
                transition: "0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#F67280")}
              onBlur={(e) => (e.target.style.borderColor = "#F6A89E")}
            >
              <option value="">Select Payment Method</option>
              <option value="Cash">💵 Cash</option>
              <option value="Bank Transfer">🏦 Bank Transfer</option>
              <option value="Credit Card">💳 Credit Card</option>
              <option value="UPI">📱 UPI</option>
              <option value="Cheque">📄 Cheque</option>
              <option value="Other">🔹 Other</option>
            </Form.Select>
          </Form.Group>

          {/* Date Picker */}
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={incomeData.date}
              onChange={handleChange}
              required
              style={{
                borderRadius: "8px",
                border: "2px solid #F6A89E",
                padding: "10px",
                transition: "0.3s",
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
              value={incomeData.notes}
              onChange={handleChange}
              style={{
                borderRadius: "8px",
                border: "2px solid #F6A89E",
                padding: "10px",
                transition: "0.3s",
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
                border: "2px solid #F67280",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#F67280")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              disabled={!!error}
              style={{
                backgroundColor: "#F67280",
                border: "none",
                color: "white",
                fontWeight: "bold",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#f1aeb5")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#FF6A88")}              
            >
              Add Income
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default IncomeModal;
