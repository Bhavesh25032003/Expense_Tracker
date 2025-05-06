import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaChartLine, FaWallet, FaBell, FaLayerGroup, FaUsers, FaMobileAlt } from "react-icons/fa";

const Features = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  return (
    <section className="text-center py-5" style={{ backgroundColor: "#F8F9FA", padding: "60px 20px" }} id="features">
      <div className="container">
        {/* Heading */}
        <h2 className="fw-bold mb-4" style={{ color: "#222831", fontSize: "2.4rem" }} data-aos="fade-up">
          Why Choose <span style={{ color: "#0B666A" }}>Xpensify?</span>
        </h2>
        <p className="mb-5" style={{ fontSize: "1.2rem", color: "#393E46", maxWidth: "700px", margin: "0 auto" }} data-aos="fade-up">
          Smart, simple, and effective. Our features help you manage your expenses effortlessly.
        </p>

        {/* Feature Grid */}
        <div className="row gy-4">
          {/* First Row - 3 Features */}
          <div className="col-md-4" data-aos="flip-left">
            <div className="card border-0 shadow-sm p-4 h-100 d-flex flex-column align-items-center text-center" style={{ borderRadius: "12px" }}>
              <FaChartLine size={50} color="#0B666A" className="mb-3" />
              <h4 className="fw-semibold" style={{ color: "#2C3333" }}>Real-Time Tracking</h4>
              <p className="text-muted">Get instant insights on your expenses with real-time tracking.</p>
            </div>
          </div>

          <div className="col-md-4" data-aos="flip-up">
            <div className="card border-0 shadow-sm p-4 h-100 d-flex flex-column align-items-center text-center" style={{ borderRadius: "12px" }}>
              <FaWallet size={50} color="#0B666A" className="mb-3" />
              <h4 className="fw-semibold" style={{ color: "#2C3333" }}>Budget Planning</h4>
              <p className="text-muted">Set monthly budgets and track spending easily.</p>
            </div>
          </div>

          <div className="col-md-4" data-aos="flip-right">
            <div className="card border-0 shadow-sm p-4 h-100 d-flex flex-column align-items-center text-center" style={{ borderRadius: "12px" }}>
              <FaBell size={50} color="#0B666A" className="mb-3" />
              <h4 className="fw-semibold" style={{ color: "#2C3333" }}>Smart Alerts</h4>
              <p className="text-muted">Receive alerts when nearing your budget limits.</p>
            </div>
          </div>

          {/* Second Row - 2 Features */}
          <div className="col-md-6" data-aos="flip-left">
            <div className="card border-0 shadow-sm p-4 h-100 d-flex flex-column align-items-center text-center" style={{ borderRadius: "12px" }}>
              <FaLayerGroup size={50} color="#0B666A" className="mb-3" />
              <h4 className="fw-semibold" style={{ color: "#2C3333" }}>Expense Categorization</h4>
              <p className="text-muted">Organize your expenses by category for better financial tracking.</p>
            </div>
          </div>

          <div className="col-md-6" data-aos="flip-right">
            <div className="card border-0 shadow-sm p-4 h-100 d-flex flex-column align-items-center text-center" style={{ borderRadius: "12px" }}>
              <FaUsers size={50} color="#0B666A" className="mb-3" />
              <h4 className="fw-semibold" style={{ color: "#2C3333" }}>Multi-User Collaboration</h4>
              <p className="text-muted">Easily share budgets and manage expenses with family, friends, or teams.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
