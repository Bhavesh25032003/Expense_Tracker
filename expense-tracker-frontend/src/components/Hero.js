import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const Hero = () => {
  const navigate = useNavigate();  // Initialize navigation function

  return (
    <section 
      className="text-center d-flex align-items-center justify-content-center" 
      style={{ 
        minHeight: "98vh",  
        background: "linear-gradient(to bottom, #E3FDFD, #CBF1F5)", 
        color: "#2C3333", 
        padding: "40px 20px"  
      }}
    >
      <div className="container">
        <h1 className="fw-bold" style={{ fontSize: "2.8rem", color: "#222831" }}>
            Xpensify: Know Your Spend, <div>Grow Your Savings!</div>
        </h1>
        <p className="mt-3" style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto", color: "#393E46" }}>
            Take control of your spending with 
            <span 
              style={{ fontWeight: "600", color: "#0B666A", cursor: "pointer" }} 
              onClick={() => window.location.reload()}
            > Xpensify</span> – the smarter way to track, save, and stay financially stress-free!
        </p>
        <div className="mt-4">
          <button 
            className="btn btn-dark me-3 px-4 py-2 rounded-pill"
            style={{ fontSize: "1.1rem", transition: "all 0.3s ease-in-out" }}
            onClick={() => navigate("/register")}  // Redirect to register page
          >
            Get Started
          </button>
          <button 
            className="btn btn-outline-dark px-4 py-2 rounded-pill"
            style={{ fontSize: "1.1rem", transition: "all 0.3s ease-in-out" }}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
