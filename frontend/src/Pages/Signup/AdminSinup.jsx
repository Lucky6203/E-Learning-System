import React, { useState } from "react";
import "./Styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import Images from "../Images/Grammar-correction.svg";
import Header from "../Home/Header/Header";
import { Eye, EyeOff } from "lucide-react";


const AdminSignup = () => {
  // State to hold admin input and errors
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [err, setErr] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const newErrors = {};

    if (!Username.trim()) {
      newErrors.username = 'Username is required';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(Password)) {
      newErrors.password = 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare data object to send to the backend
    // const data = {
    //   Username,
    //   Password,
    // };

    const data = {
      username: Username, // Change "Username" to "username"
      password: Password, // Change "Password" to "password"
    };

    try {
      // Send data to backend
      const response = await fetch(`/api/admin/signup`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      setErr(responseData.message);

      if (response.ok) {
        console.log("Admin Registration successful");
        navigate("/adminLogin");
      } else {
        setErrors(responseData.errors || {});
      }
    } catch (error) {
      setErr("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="section">
        <article className="article">
          <div className="header">
            <h3 className="head">Admin Signup</h3>
            <h4 className="Sub-head">Create an admin account</h4>
          </div>

          <div className="inpts">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="input-x input-4"
                placeholder="Username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <div className="error-message">{errors.username}</div>
              )}

              {/* <input
                type="password"
                className="input-x input-7"
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )} */}

<div className="relative w-64" style={{width:"365px"}}>
  <input
    type={showPassword ? "text" : "password"}
    className="input-x input-7"
    placeholder="Password"
    value={Password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    className="absolute inset-y-0 right-2 flex items-center text-gray-500" style={{marginTop:"14px"}}
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
  {errors.password && (
    <div className="error-message">{errors.password}</div>
  )}
</div>


              <div className="signupage">
                <span>Already have an admin account? </span>
                <NavLink to="/adminLogin" style={{ color: "green" }} className="link">
                  Login
                </NavLink>
              </div>

              <div className="btn">
                <button type="submit" className="btn-4">Signup</button>
              </div>
            </form>
            {err && <div className="error-message">{err}</div>}
          </div>
        </article>

        <div className="right-part">
          <img src={Images} alt="" className="imgs" />
        </div>
      </div>
      <p className='text-sm text-red-400 absolute bottom-3 left-3'>* Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.</p>
    </>
  );
};

export default AdminSignup;
