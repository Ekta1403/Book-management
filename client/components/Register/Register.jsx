import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    F_name: "",
    L_name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("http://localhost:8000/api/auth/register", formData);
  //     console.log(formData);
  //   } catch (error) {

  //     console.log(error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4545/api/auth/register",
        formData
      );
      console.log("Registration successful", response.data);
      alert("Register Successfully");
    } catch (error) {
      if (error.response) {
        // Check for 409 Conflict error
        if (error.response.status === 409) {
          console.error("Conflict: Username or email already taken.");
          alert("Username or email already in use. Please try another one.");
        } else {
          console.error("Registration failed:", error.response.data);
        }
      } else {
        console.error("Error: ", error.message);
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    
    >
      <div className="p-4 bg-white rounded shadow" style={{ width: "500px" }}>
        <h2 className="text-center mb-3">Create Your Account</h2>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="First Name"
          name="F_name"
          onChange={handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Last Name"
          name="L_name"
          onChange={handleChange}
        />
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email..."
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password..."
          name="password"
          onChange={handleChange}
        />

        {/* Sign In Button */}
        <button
          className="btn  w-100 fw-bold"
          style={{ backgroundColor: "#7b2cbf", color: "white" }}
          onClick={handleSubmit}
        >
          Sign In
        </button>

        
        <div className="d-flex mt-3 text-secondary">
          Already got an account?
          <Link
            to="/login"
            className="text-decoration-none fw-bold "
            style={{ color: "#7b2cbf" }}
          >
            Log in
          </Link>
        </div>
        <div className="d-flex flex-wrap mt-3 text-secondary">
          By creating an account, you accept our{"   "}
          <a
            href="#"
            className="text-decoration-none fw-bold "
            style={{ color: "#7b2cbf" }}
          >
            -terms of service.
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
