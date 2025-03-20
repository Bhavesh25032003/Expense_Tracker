import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../context/SidebarContext";
import { FaPlus, FaMinus } from "react-icons/fa";
import IncomeModal from "../components/IncomeModal";  
import ExpenseModal from "../components/ExpenseModal";

const Income = () => {
  const { isSidebarOpen } = useSidebar();
  
  const [isIncomeModalOpen, setIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="p-4"
        style={{
          marginLeft: isSidebarOpen ? "240px" : "80px",
          width: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 80px)",
          transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
          minHeight: "100vh",
          background: "#F4F1DE",
          position: "relative",
        }}
      >
        <h2>Income</h2>
        <p>Welcome to your Income Page</p>

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
          {/* Add Income Button */}
          <button
            className="btn btn-lg rounded-circle shadow"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#f1aeb5",
              color: "#3A506B",
              border: "none",
              fontSize: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setIncomeModalOpen(true)}
          >
            <FaPlus />
          </button>

          {/* Add Expense Button */}
          <button
            className="btn btn-lg rounded-circle shadow"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#F8EDEB",
              color: "#3A506B",
              border: "none",
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
    </div>
  );
};

export default Income;
