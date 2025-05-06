import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../context/SidebarContext";
import { FaPlus, FaMinus } from "react-icons/fa";
import IncomeModal from "../components/IncomeModal";
import ExpenseModal from "../components/ExpenseModal";

const Transactions = () => {
  const { isSidebarOpen } = useSidebar(); // Sidebar logic remains unchanged
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isIncomeModalOpen, setIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const transactionsPerPage = 6; // Number of transactions to display per page

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
        const sortedTransactions = response.data.sort((a, b) => {
          // Combine date and time into a single Date object for comparison
          const dateTimeA = new Date(`${a.date} ${a.time || "00:00:00"}`);
          const dateTimeB = new Date(`${b.date} ${b.time || "00:00:00"}`);
          return dateTimeB - dateTimeA; // Sort in descending order
        });
        setTransactions(sortedTransactions);
      } catch (err) {
        console.error("❌ Error fetching transactions:", err);
        setError("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userEmail]);

  // Calculate the transactions to display on the current page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < Math.ceil(transactions.length / transactionsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh", background: "#F4F1DE" }}>
      <Sidebar /> {/* Sidebar logic remains unchanged */}

      {/* Heading at the top */}
      <div
        style={{
          marginLeft: isSidebarOpen ? "240px" : "80px", // Adjust layout based on sidebar state
          transition: "margin-left 0.3s ease-in-out",
          padding: "20px",
        }}
      >
        <h1 className="text-center fw-bold">Recent Transactions</h1>
      </div>

      {/* Table Section */}
      <div
        className="d-flex justify-content-center"
        style={{
          marginLeft: isSidebarOpen ? "240px" : "80px", // Adjust layout based on sidebar state
          width: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 80px)",
          padding: "30px 0", // Add padding for spacing
        }}
      >
        <div className="table-responsive shadow-lg rounded" style={{ width: "80%" }}>
          {loading ? (
            <div className="text-center py-5">Loading...</div>
          ) : error ? (
            <div className="alert alert-danger text-center">{error}</div>
          ) : (
            <>
              <table className="table table-striped table-hover align-middle">
                <thead
                  className="table-dark"
                  style={{
                    backgroundColor: "#2C3E50",
                    color: "#ECF0F1",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    textAlign: "center",
                  }}
                >
                  <tr>
                    <th className="text-center">Type</th>
                    <th className="text-center">Source</th>
                    <th className="text-center">Amount</th>
                    <th className="text-center">Date</th>
                    <th className="text-center">Time</th>
                    <th className="text-center">Payment Method</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.length > 0 ? (
                    currentTransactions.map((item, index) => (
                      <tr
                        key={item._id}
                        style={{
                          fontSize: "1.2rem",
                          backgroundColor: index % 2 === 0 ? "#F9F9F9" : "#FFFFFF", // Alternating row colors
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E8F6F3")}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            index % 2 === 0 ? "#F9F9F9" : "#FFFFFF")
                        }
                      >
                        <td
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            height: "100%", // Ensure the content takes up the full height of the cell
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: item.type === "income" ? "#7ced96" :"#ec8181", // Green for income, red for expense
                              color: "#FFFFFF", // White text color
                              borderRadius: "5px", // Rounded corners
                              padding: "5px 10px", // Padding inside the box
                              display: "inline-block", // Make it a box
                              minWidth: "80px", // Minimum width for consistent size
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)} {/* Capitalize first letter */}
                          </span>
                        </td>
                        <td className="text-center">{item.source}</td>
                        <td className="text-center">₹{item.amount.toLocaleString()}</td>
                        <td className="text-center">
                          {new Date(item.date).toLocaleDateString()}
                        </td>
                        <td className="text-center">{item.time || "N/A"}</td>
                        <td className="text-center">{item.paymentMethod}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted" style={{ fontSize: "1.2rem" }}>
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div
                className="d-flex justify-content-between align-items-center mt-4"
                style={{
                  backgroundColor: "#2C3E50", // Dark background for contrast
                  color: "#ECF0F1", // Light text color
                  padding: "10px 20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                }}
              >
                <button
                  className="btn"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  style={{
                    backgroundColor: currentPage === 1 ? "#BDC3C7" : "#28A745", // Disabled: gray, Active: green
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "5px",
                    padding: "8px 16px",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Previous
                </button>
                <span
                  className="fw-bold"
                  style={{
                    fontSize: "1.1rem",
                    color: "#ECF0F1", // Light text color
                  }}
                >
                  Page {currentPage} of {Math.ceil(transactions.length / transactionsPerPage)}
                </span>
                <button
                  className="btn"
                  onClick={handleNextPage}
                  disabled={currentPage === Math.ceil(transactions.length / transactionsPerPage)}
                  style={{
                    backgroundColor:
                      currentPage === Math.ceil(transactions.length / transactionsPerPage)
                        ? "#BDC3C7"
                        : "#28A745", // Disabled: gray, Active: green
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "5px",
                    padding: "8px 16px",
                    cursor:
                      currentPage === Math.ceil(transactions.length / transactionsPerPage)
                        ? "not-allowed"
                        : "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Floating Buttons */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 1000,
        }}
      >
        <button
          className="btn btn-lg rounded-circle"
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#A3D8D5",
            color: "#1D5A6A",
            fontSize: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setIncomeModalOpen(true)}
        >
          <FaPlus />
        </button>

        <button
          className="btn btn-lg rounded-circle"
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#F1C6B1",
            color: "#1D5A6A",
            fontSize: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setExpenseModalOpen(true)}
        >
          <FaMinus />
        </button>
      </div>

      {/* Modals */}
      <IncomeModal isOpen={isIncomeModalOpen} onClose={() => setIncomeModalOpen(false)} />
      <ExpenseModal isOpen={isExpenseModalOpen} onClose={() => setExpenseModalOpen(false)} />
    </div>
  );
};

export default Transactions;