import React, { useState } from 'react';
import axios from "axios";
import '../App.css';
import { Link } from 'react-router-dom';
 

const SignUpForm = ({ onLogin, onSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [batch, setBatch] = useState('');
 
  const handleRegister = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:8800/api/auth/signup', {name, password, email, batch, phone});
      console.log("success");
      console.log(res);
    } catch(err){
      console.log(err);
    }
    onSignUp();
  };

  return (
    <div className='signup-container'>
      <h2 className='sigup-heading'>Sign Up</h2>
      <form className='signup-form'>
        <div className='signup-details'>
        <label className='signup-label'>Name:</label>
        <input className='signup-details-input' type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>


        <div className='signup-details'>
        <label>Email:</label>
        <input className='signup-details-input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        </div>

        <div className='signup-details'>
        <label>Password:</label>
        <input className='signup-details-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
  
        </div>

        <div className='signup-details'>
        <label>Phone:</label>
        <input className='signup-details-input' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

        </div>
        
        <div className='signup-details'>
        <label>Batch:</label>
        <select className='signup-button' value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option value="6-7 AM">6-7 AM</option>
          <option value="7-8 AM">7-8 AM</option>
          <option value="8-9 AM">8-9 AM</option>
          <option value="5-6 PM">5-6 PM</option>
        </select>
        </div>

        <div className='signup-details'>
        <button className='signup-button' type="button" onClick={handleRegister}>
          Register
        </button>
        <Link to={'/signin'}> Already has account</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
