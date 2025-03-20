import React from "react";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../context/SidebarContext";

const Settings = () => {
  const { isSidebarOpen } = useSidebar();

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
        <h2>Settings</h2>
        <p>Welcome to your expense tracker settings!</p>
      </div>
    </div>
  );
};

export default Settings;
