import React from "react";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../context/SidebarContext";

const Income = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="p-4"
        style={{
          marginLeft: isSidebarOpen ? "240px" : "80px",
          width: isSidebarOpen ? "calc(100% - 250px)" : "calc(100% - 80px)",
          transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
          minHeight: "100vh",
          background: "#F4F1DE",
        }}
      >
        <h2>Income</h2>
        <p>Adjust your preferences here.</p>
      </div>
    </div>
  );
};

export default Income;
