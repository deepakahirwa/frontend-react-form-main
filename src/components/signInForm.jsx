import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const SignInForm = ({ onLogin }) => {

  const nav = useNavigate();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {

    e.preventDefault();
    try {
      
      const res = await axios.post('http://localhost:8800/api/auth/signin', 
        JSON.stringify({ email : email, password : password }),
        {headers:{"Content-Type" : "application/json"}});
      console.log(res);
      localStorage.setItem('currentUser', JSON.stringify(res.data._id));
      onLogin();
    } catch (err) {
        console.log(err)
    } 
    
  };

  return ( 
    <div className='signup-container'>
      <h2 className='sigup-heading'>Sign In</h2>
      <form className='signin-form'>
        <div className='signup-details'>
        <label className='signup-label'>Email:</label>
        <input className='signup-details-input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        </div>

        <div className='signup-details'>
        <label className='signup-label'>Password:</label>
        <input className='signup-details-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        </div>

        <div className='signup-details'>
        <button className='signup-button' type="button" onClick={handleSignIn}>
          Sign In
        </button>
        <Link to={'/signup'}> Create new account</Link>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
