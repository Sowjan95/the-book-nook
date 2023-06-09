
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.js";

function  LoginPage(props) {
  const auth = useAuth();
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");
  const[email, setEmail] = useState("");
 
  let [authMode, setAuthMode] = useState("signin");

  // functions
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch("/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        }),
      });
      if (response.ok) {
        console.log("signed up");
        window.location.replace('/user-profile');
      }
    } catch (error) {
      console.error("Server error while creating a new user", error);
    }
  };
  

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await auth.authenticate(email, password);
      console.log("logged in");
      window.location.replace('/user-profile');

    } catch (error) {
      console.error("Server error while logging in", error);
    }
  };

  if (authMode === "signin") {
    return (
    <div className="Auth-form-container">

      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Login</h3>
      </div>

      <div className="text-center text-black">
        Not registered yet?{" "}
        <span className="navbarcolor " onClick={changeAuthMode}>
          Sign Up
        </span>
      </div>
      
      <form className="Auth-form col-7 mx-auto" onSubmit={handleLogin}>
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mt-1"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            value={password}
            minLength={7}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mt-1"
            placeholder="Enter password"
          />
        </div>
        <div className="d-grid gap-2 mt-3 col-4 mx-auto">
          <button type="submit" className="btn btn-primary justify-content-center">
            Login
          </button>
        </div>
      </form>

      </div>
    )
  }

  return (
  <div className="Auth-form-container">

    <div className="Auth-form-content justify-content-center">
      <h3 className="Auth-form-title">Sign up</h3>
    </div>

    <div className="text-center text-black">
      Already registered?{" "}
      <span className="navbarcolor" onClick={changeAuthMode}>
        Login
      </span>
    </div>
    
    <form className="Auth-form col-7 mx-auto" onSubmit={handleSignup}>
      <div className="form-group mt-3">
        <label>Full Name</label>
        <input
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control mt-1"
          placeholder="e.g Jane Doe"
        />
      </div>

      <div className="form-group mt-3">
        <label>Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mt-1"
          placeholder="Email Address"
        />
      </div>

      <div className="form-group mt-3">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mt-1"
          placeholder="Password"
        />
      </div>
      
      <div className="d-grid gap-2 mt-3 col-4 mx-auto">
      <button type="submit" className="btn btn-primary text-center" >
        Sign Up
      </button>
      </div>

    </form>
  </div>

  )
}
export default LoginPage;
