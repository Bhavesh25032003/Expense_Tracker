import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter Email | Step 2: Enter Code | Step 3: Reset Password
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendResetCode = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required!");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage("A reset code has been sent to your email.");
      localStorage.setItem("resetEmail", email);
      setStep(2); // Move to Step 2: Enter Reset Code
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (!resetCode || resetCode.length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resetCode }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage("Code verified successfully! Enter your new password.");
      setStep(3); // Move to Step 3: Reset Password
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Both password fields are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#E3FDFD" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}>
        <h3 className="text-center fw-bold mb-4" style={{ color: "#2C3333" }}>
          {step === 1 ? "Forgot Password" : step === 2 ? "Verify Code" : "Reset Password"}
        </h3>

        {error && <div className="alert alert-danger text-center py-2">{error}</div>}
        {message && <div className="alert alert-success text-center py-2">{message}</div>}

        {step === 1 && (
          <>
            <form onSubmit={handleSendResetCode}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Enter Your Email</label>
                <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-dark w-100 py-2" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Code"}
              </button>
            </form>

            {/* ✅ Added "Remember Password? Login" link */}
            <p className="mt-3 text-center">
              Remember your password?{" "}
              <a href="/login" className="fw-semibold text-decoration-none" style={{ color: "#0B666A" }}>
                Login
              </a>
            </p>
          </>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyCode}>
            <input type="text" className="form-control mb-3" placeholder="Enter 6-digit code" value={resetCode} onChange={(e) => setResetCode(e.target.value)} required maxLength={6} />
            <button type="submit" className="btn btn-dark w-100 py-2" disabled={loading}>{loading ? "Verifying..." : "Verify Code"}</button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <input type="password" className="form-control mb-3" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <input type="password" className="form-control mb-3" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="submit" className="btn btn-dark w-100 py-2" disabled={loading}>{loading ? "Resetting..." : "Reset Password"}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
