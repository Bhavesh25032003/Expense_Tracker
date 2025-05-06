import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="text-center py-4" style={{ backgroundColor: "#2C3333", color: "#F8F9FA" }}>
      <div className="container">
        <p className="mb-2 fw-bold" style={{ fontSize: "1.2rem" }}>
          Xpensify &copy; {new Date().getFullYear()} | All Rights Reserved
        </p>
        <p style={{ fontSize: "0.9rem" }}>
          <a href="#" className="text-decoration-none text-light me-3">Privacy Policy</a>
          <a href="#" className="text-decoration-none text-light me-3">Terms of Service</a>
          <a href="#" className="text-decoration-none text-light">Contact</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
