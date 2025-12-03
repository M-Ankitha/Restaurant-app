import React, { useState } from "react";
import api from "../API";

import { useNavigate } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res = await api.post("/auth/register",{name,email,password});
      onRegister(res.data.user,res.data.token);
      navigate("/");
    }catch(err){
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
