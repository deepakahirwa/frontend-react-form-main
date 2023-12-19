import React, { useId } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Dashboard = ({ onLogout }) => {
  const [user, setUser] = useState('');
  const [paymentStatus, setPayment] = useState(false)
  let userId = localStorage.getItem('currentUser');

  const fetchUser = async () => {
    axios.get(`http://localhost:8800/api/user/${userId}`)
    .then((res) => { 
      setUser(res.data);
      setPayment(res.data.payment);
      console.log(res.data);
    }).catch((err) => { console.log(err)})
    console.log(userId);
     
  }; 

  useEffect(()=>{
    console.log(userId)
    
    if(userId){
      fetchUser();
    }
  }, [userId]);

  const handleLogout = () => {
    console.log('User logged out');
    setUser(''); 
    userId = localStorage.getItem('currentUser');
    localStorage.setItem('currentUser', '');
    onLogout();
  };

  const handlePayment = async () =>{
    const updateUser = {
      userId : userId,
    }
    axios.put(`http://localhost:8800/api/user/${userId}`, updateUser)
    .then((res) => {
      setPayment(true);
      console.log(res);
    }).catch((err) => { console.log(err)})
  }
  return (
    <div className='dashboard-container'>
      <h2 className='signup-heading'>{user.name}</h2>
    <div className='dashboard'>
      
      <div className='dashboard-details'>
      <p>payment : </p>
      <p> {paymentStatus === false ? "not done" : "done"}</p>
      </div>

      <div className='dashboard-details'>
      <p>batch : </p> 
      <p> {user.batch}</p>
      </div>

      <div className='dashboard-details'>
      <p>phone : </p> 
      <p>{user.phone}</p>
      </div>
      


      <div className='dashboard-details'>
      {!paymentStatus && <button className = "signup-button" type="button" onClick={handlePayment}>
        Pay
      </button>
      }
 
      <button className = "signup-button logout-button"  type="button" onClick={handleLogout}>
        Logout
      </button>
      
      </div>

    </div>
    </div>
  );
};

export default Dashboard;
