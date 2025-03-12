import { createContext, useState, useContext } from "react";

// Create Context
const SidebarContext = createContext();

// Custom Hook to use the Sidebar Context
export const useSidebar = () => useContext(SidebarContext);

// Provider Component
export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
