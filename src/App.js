import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Navigate, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUpForm from './components/signUpForm';
import SignInForm from './components/signInForm';
import Dashboard from './components/dashboard';

function App() { 
  const [isSignUp, setSignUp] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [isPaymentDone, setPaymentDone] = useState(false);

  useEffect(() => {
    const paymentStatus = localStorage.getItem('paymentStatus');
    const loginStatus = localStorage.getItem('currentUser');
    if(!loginStatus){
      setLoggedIn(false);
    }
    if (paymentStatus === 'done') {
      setPaymentDone(true);
    }
  }, []);

  const handleSignUp = () =>{
    setSignUp(true);
  }

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handlePaymentComplete = () => {
    setPaymentDone(true);
    localStorage.setItem('paymentStatus', 'done');
  };

  return (
    <Router>
      <Routes>
      <Route path="/signup" element={
        !isSignUp ? <SignUpForm onSignUp = {handleSignUp}/> : <Navigate to="/signin" />
      } 
      />
      <Route
        path="/signin"
        element={!isLoggedIn ? <SignInForm onLogin={handleLogin} /> : <Navigate to= "/dashboard"/>}
      />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <Dashboard onLogout={handleLogout}/>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route
        path="/"
        element={
          isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/signin" />
        }
      />
      </Routes>
    </Router>
  );
}

export default App;
