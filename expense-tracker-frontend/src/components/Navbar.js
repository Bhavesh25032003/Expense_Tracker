import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Ensure Bootstrap JS is imported

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleSmoothScroll = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Close the mobile menu after clicking a link
      const navbarToggler = document.querySelector(".navbar-toggler");
      const navbarCollapse = document.querySelector(".navbar-collapse");

      if (navbarToggler && navbarCollapse.classList.contains("show")) {
        navbarToggler.click(); // Simulate a click to close the menu
        setIsMenuOpen(false);
      }
    };

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => link.addEventListener("click", handleSmoothScroll));

    return () => {
      navLinks.forEach((link) => link.removeEventListener("click", handleSmoothScroll));
    };
  }, []);

  // Inline styles for blur effect
  const navbarStyle = {
    padding: "14px 20px",
    backdropFilter: isMenuOpen ? "blur(10px)" : "none",
    backgroundColor: isMenuOpen ? "rgba(255, 255, 255, 0.7)" : "white",
    transition: "backdrop-filter 0.3s ease, background-color 0.3s ease"
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top shadow-sm" style={navbarStyle}>
      <div className="container">
        {/* Logo and Brand Name */}
        <a className="navbar-brand fw-bold d-flex align-items-center text-dark" href="#">
          <img src="./logo_xpensify.jpg" alt="Xpensify Logo" width="45" height="45" className="me-2 rounded-circle shadow-sm" />
          <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "#2C3333" }}>Xpensify</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Full Menu (Desktop & Mobile) */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto text-center">
            <li className="nav-item">
              <a className="nav-link fw-semibold mx-lg-3" href="#features">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold mx-lg-3" href="#testimonials">Testimonials</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold mx-lg-3" href="#contact">Contact Us</a>
            </li>
          </ul>

          {/* Buttons - Move inside menu on mobile */}
          <div className="d-lg-flex d-block text-center">
            <a href="/login" className="btn btn-outline-dark rounded-pill me-lg-2 px-4 py-2 w-lg-auto w-100 mb-2 mb-lg-0">Login</a>
            <a href="/register" className="btn btn-dark rounded-pill px-4 py-2 w-lg-auto w-100">Register</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
