
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from '../../store.jsx';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserLogin((prevData) => ({ ...prevData, [name]: value }));
  };




const handleSubmit = async (event) => {
      event.preventDefault();
    const userData = {
      email: userLogin.email,
      password: userLogin.password,
    };
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/login",userData);

        localStorage.setItem('token', response.data.data.token);
        dispatch(login({ userType: response.data.data.type, userId: response.data.data.userId }));
        toast.success("Login successful!");
        navigate("/home");
        
      } catch (err) {
        toast.error("Login failed. Please try again.");
      } 
    };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={(event)=>handleSubmit(event)} className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <input
            type="email"
            id="email"
            name="email"
            value={userLogin.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            id="password"
            name="password"
            value={userLogin.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
