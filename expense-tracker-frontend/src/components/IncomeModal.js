import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";

const IncomeModal = ({ isOpen, onClose }) => {
  const [incomeData, setIncomeData] = useState({
    email: localStorage.getItem("userEmail") || "", // ✅ Get email from localStorage
    sourceCategory: "",
    amount: "",
    paymentMethod: "",
    date: "",
    time: "",
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

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    console.log("Retrieved Email from localStorage:", userEmail); // ✅ Debug log
    if (userEmail) {
      setIncomeData((prev) => ({ ...prev, email: userEmail }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      console.error("❌ No user email found! Please log in.");
      return;
    }

    const currentTime = new Date().toLocaleTimeString();

    const payload = {
      email: userEmail,
      source: incomeData.sourceCategory || incomeData.source, // ✅ Ensures correct field name
      amount: Number(incomeData.amount),
      date: incomeData.date,
      time: currentTime,
      notes: incomeData.notes,
      paymentMethod: incomeData.paymentMethod,
    };

    console.log("Payload being sent:", payload); // ✅ Debugging payload

    try {
      await axios.post("http://localhost:5000/api/income/add", payload);
      onClose(); // Close modal after success
    } catch (error) {
      console.error("❌ Error adding income:", error);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      {/* Header with Gradient */}
      <Modal.Header
        closeButton
        className="text-center"
        style={{
          background: "linear-gradient(to right, #A3D8D5,rgb(13, 240, 225), #A3D8D5)", // Pastel Teal Gradient
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
          backgroundColor: "rgba(163, 216, 213, 0.9)", // Soft pastel teal glass effect
          backdropFilter: "blur(12px)",
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
                border: "2px solid #A3D8D5", // Pastel Teal Border
                padding: "10px",
                transition: "0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#A3D8D5")}
              onBlur={(e) => (e.target.style.borderColor = "#A3D8D5")}
            >
              <option value="">Select Source</option>
              <option value="Salary/Wages">💼 Salary/Wages</option>
              <option value="Freelance Work">💻 Freelance Work</option>
              <option value="Business Profits">📈 Business Profits</option>
              <option value="Investments">📊 Investments</option>
              <option value="Rental Income">🏠 Rental Income</option>
              <option value="Interest Earned">🏦 Interest Earned</option>
              <option value="Bonuses & Commissions">🎯 Bonuses & Commissions</option>
              <option value="Pension & Retirement Funds">🛡 Pension & Retirement Funds</option>
              <option value="Government Benefits">🏛 Government Benefits</option>
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
              <InputGroup.Text style={{ backgroundColor: "#A3D8D5"}}>₹</InputGroup.Text>
              <Form.Control
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={incomeData.amount}
                onChange={handleChange}
                required
                style={{
                  borderRadius: "8px",
                  border: "2px solid #A3D8D5", // Pastel Teal Border
                  padding: "10px",
                  transition: "0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#A3D8D5")}
                onBlur={(e) => (e.target.style.borderColor = "#A3D8D5")}
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
                border: "2px solid #A3D8D5", // Pastel Teal Border
                padding: "10px",
                transition: "0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#A3D8D5")}
              onBlur={(e) => (e.target.style.borderColor = "#A3D8D5")}
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
                border: "2px solid #A3D8D5", // Pastel Teal Border
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
                border: "2px solid #A3D8D5", // Pastel Teal Border
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
                border: "2px solid rgb(13, 240, 225)",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "rgb(218, 209, 209)")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              disabled={!!error}
              style={{
                backgroundColor: "rgb(13, 240, 225)",
                border: "none",
                color: "white",
                fontWeight: "bold",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#A3D8D5")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "rgb(13, 240, 225)")}
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
