import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../context/SidebarContext";
import { FaPlus, FaMinus } from "react-icons/fa";
import IncomeModal from "../components/IncomeModal";
import ExpenseModal from "../components/ExpenseModal";

const Transactions = () => {
  const { isSidebarOpen } = useSidebar();
  const [transactions, setTransactions] = useState([]);
  const [isIncomeModalOpen, setIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) {
      setError("User not found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/transactions/${userEmail}`);
        setTransactions(response.data);
      } catch (err) {
        console.error("❌ Error fetching transactions:", err);
        setError("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userEmail]);

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="p-5"
        style={{
          marginLeft: isSidebarOpen ? "240px" : "80px",
          width: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 80px)",
          transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
          minHeight: "100vh",
          background: "#FAF9F6", // Soft background color
        }}
      >
        <h1 className="mb-5 text-center font-weight-bold " style={{ fontSize: "2.5rem" }}>
          Transactions
        </h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered rounded">
              <thead
                className="thead-dark"
                style={{
                  backgroundColor: "#2C3E50", // Deep blue background
                  color: "#ECF0F1", // White text color
                  fontWeight: "bold",
                }}
              >
                <tr>
                  <th className="text-center">Type</th>
                  <th className="text-center">Source</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((item) => (
                    <tr
                      key={item._id}
                      className={item.type === "income" ? "table-success" : "table-danger"}
                      style={{
                        fontSize: "1.2rem",
                      }}
                    >
                      <td className="text-center font-weight-bold">
                        {item.type === "income" ? "Income" : "Expense"}
                      </td>
                      <td className="text-center">{item.source}</td>
                      <td className="text-center">₹{item.amount}</td>
                      <td className="text-center">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="text-center">{item.paymentMethod}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Floating Buttons */}
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            zIndex: "1000",
          }}
        >
          <button
            className="btn btn-lg rounded-circle shadow"
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: "#A3D8D5",
              color: "#1D5A6A",
              border: "none",
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s",
            }}
            onClick={() => setIncomeModalOpen(true)}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            <FaPlus />
          </button>

          <button
            className="btn btn-lg rounded-circle shadow"
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: "#F1C6B1",
              color: "#1D5A6A",
              border: "none",
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s",
            }}
            onClick={() => setExpenseModalOpen(true)}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            <FaMinus />
          </button>
        </div>

        {/* Modals */}
        <IncomeModal isOpen={isIncomeModalOpen} onClose={() => setIncomeModalOpen(false)} />
        <ExpenseModal isOpen={isExpenseModalOpen} onClose={() => setExpenseModalOpen(false)} />
      </div>
    </div>
  );
};

export default Transactions;
