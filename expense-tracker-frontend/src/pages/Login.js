import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }

    // ✅ Check if email format is valid
    if (!isValidEmail(email)) {
      setError("Invalid email format! Please enter a valid email.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // ✅ Store JWT token & user details in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userEmail", email);
console.log("✅ Stored Email in localStorage:", localStorage.getItem("userEmail")); 



      alert("Login successful!");

      // ✅ Redirect to dashboard after login
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#E3FDFD" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}>
        <h3 className="text-center fw-bold" style={{ color: "#2C3333" }}>Login</h3>

        {error && <div className="alert alert-danger text-center py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
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

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-dark w-100 py-2">Login</button>

          {/* Forgot Password Link Below the Button */}
          <div className="mt-3 text-center">
            <a href="/forgot-password" className="text-decoration-none fw-semibold" style={{ color: "#0B666A" }}>
              Forgot Password?
            </a>
          </div>
        </form>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <a href="/register" className="fw-semibold text-decoration-none" style={{ color: "#0B666A" }}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;