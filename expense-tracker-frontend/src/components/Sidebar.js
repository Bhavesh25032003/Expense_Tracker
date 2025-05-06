import React from "react";
import { FaBars, FaHome, FaWallet, FaShoppingCart, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";  // Import useNavigate
  

const Sidebar = () => {
  const navigate = useNavigate();

  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  return (
    <div
      className="d-flex flex-column shadow"
      style={{
        position: "fixed",
        left: "0",
        top: "0",
        width: isSidebarOpen ? "240px" : "80px",
        height: "100vh",
        background: "#F8EDEB",
        color: "#3A506B",
        transition: "width 0.3s ease",
        padding: "15px",
        overflowX: "hidden",
        display: "flex",
      }}
    >
      {/* Sidebar Header */}
      <div className="d-flex align-items-center px-2 mb-3">
        {/* Toggle Button - Always Visible */}
        <button
          className="btn btn-sm d-flex align-items-center justify-content-center"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            marginTop: "4px",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            color: "#3A506B",
            transition: "transform 0.3s ease",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaBars />
        </button>

        {/* Sidebar Logo & Title */}
        <span
          className="fw-bold ms-3"
          style={{
            fontSize: "25px",
            whiteSpace: "nowrap",
            textAlign: "left",
            opacity: isSidebarOpen ? "1" : "0",
            transition: "opacity 0.3s ease",
          }}
        >
          Xpensify
        </span>
      </div>

      {/* Sidebar Menu Items */}
      <ul className="list-unstyled w-100">
        <SidebarItem icon={<FaHome />} text="Home" path="/dashboard" />
        <SidebarItem icon={<FaWallet />} text="Income" path="/income" />
        <SidebarItem icon={<FaShoppingCart />} text="Expenses" path="/expenses" />
        <SidebarItem icon={<FaHistory />} text="Transactions" path="/transactions" />
      </ul>

      {/* Logout Button - Stays at Bottom */}
      <div className="mt-auto w-100">
        <button
          className="btn w-100 d-flex align-items-center"
          style={{
            background: "#FF6B6B",
            border: "none",
            color: "white",
            padding: "12px",
            borderRadius: "6px",
            fontWeight: "bold",
            transition: "background 0.3s",
            justifyContent: isSidebarOpen ? "start" : "center",
            gap: isSidebarOpen ? "10px" : "0px",
            fontSize: "16px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#E85A4F")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#FF6B6B")}
          onClick={() => navigate("/")}
        >
          <FaSignOutAlt size={20} /> {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, text, path }) => {
  const { isSidebarOpen } = useSidebar();
  return (
    <li className="d-flex align-items-center">
      <Link
        to={path}
        className="d-flex align-items-center w-100 px-3 py-2"
        style={{
          textDecoration: "none",
          color: "#3A506B",
          fontSize: "16px",
          fontWeight: "500",
          borderRadius: "6px",
          transition: "background 0.3s",
          justifyContent: isSidebarOpen ? "start" : "center",
          gap: "12px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#FFB4A2")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <span style={{ fontSize: "20px", width: "30px", textAlign: "center" }}>{icon}</span>
        {isSidebarOpen && <span>{text}</span>}
      </Link>
    </li>
  );
};

export default Sidebar;
