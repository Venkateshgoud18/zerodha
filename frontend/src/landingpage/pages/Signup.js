import React, { useState } from "react";
import { Link } from "react-router-dom";  // Assuming you're using react-router for navigation

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      setMessage(data.message);
      setSuccess(data.success);
  
      if (data.success) {
        setFormData({ email: "", username: "", password: "" });
        // Redirect on successful signup:
        window.location.href = "http://localhost:3000";
      }
    } catch (err) {
      setMessage("Signup failed. Try again later.");
      setSuccess(false);
    }
  };
  

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Signup</button>
      </form>

      {message && (
        <p style={{ color: success ? "green" : "red" }}>{message}</p>
      )}

      <p>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
          Login
        </Link>
      </p>
    </div>
  );
}
