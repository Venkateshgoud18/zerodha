import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
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
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // to send and receive cookies
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message);
      setSuccess(data.success);

      if (data.success) {
        // You can redirect or do something on successful login
        // For example:
        // window.location.href = "/dashboard";
      }
    } catch (err) {
      setMessage("Login failed. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>

      {message && (
        <p style={{ color: success ? "green" : "red" }}>{message}</p>
      )}
    </div>
  );
}
