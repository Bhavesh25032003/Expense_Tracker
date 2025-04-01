import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../context/SidebarContext";
import { FaPlus, FaMinus } from "react-icons/fa";
import IncomeModal from "../components/IncomeModal";  
import ExpenseModal from "../components/ExpenseModal";

const Dashboard = () => {
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
        <h2>Dashboard</h2>
        <p>Welcome to your expense tracker dashboard!</p>

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
                      backgroundColor: "#A3D8D5", // Pastel teal color
                      color: "#3A506B",
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
                      backgroundColor: "#F1C6B1", // Pastel peach color
                      color: "#3A506B",
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

export default Dashboard;
