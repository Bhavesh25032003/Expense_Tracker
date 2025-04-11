import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate(); // Redirect after successful registration

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  const validatePassword = (password) => {
    const validations = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordValidations(validations);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!Object.values(passwordValidations).every(Boolean)) {
      setError("Password does not meet all requirements!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      toast.success("Registration successful! Redirecting to login...");
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect after 3 seconds
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#E3FDFD" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}>
        <h3 className="text-center fw-bold" style={{ color: "#2C3333" }}>Register</h3>

        {error && <div className="alert alert-danger text-center py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter your username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }} 
              onFocus={() => setShowPasswordRules(true)} 
              onBlur={() => setShowPasswordRules(false)}
              required 
            />
            
            {showPasswordRules && (
              <div className="position-absolute bg-white shadow p-2 rounded" style={{ width: "100%", top: "100%", left: "0", zIndex: 1000 }}>
                <ul className="list-unstyled mb-0 small">
                  <li style={{ color: passwordValidations.length ? "green" : "red" }}>• Minimum 8 characters</li>
                  <li style={{ color: passwordValidations.uppercase ? "green" : "red" }}>• At least one uppercase letter</li>
                  <li style={{ color: passwordValidations.lowercase ? "green" : "red" }}>• At least one lowercase letter</li>
                  <li style={{ color: passwordValidations.digit ? "green" : "red" }}>• At least one digit</li>
                  <li style={{ color: passwordValidations.specialChar ? "green" : "red" }}>• At least one special character (!@#$%^&*)</li>
                </ul>
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Confirm your password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-dark w-100 py-2">Register</button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <a href="/login" className="fw-semibold text-decoration-none" style={{ color: "#0B666A" }}>
            Login
          </a>
        </p>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Register;