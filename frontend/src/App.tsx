import React, { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [code, setCode] = useState('');

  function signUp() {
    axios.post('http://localhost:5000/auth/signIn', {
      email,
      password
    })
    .then(function (response) {
      console.log(response);
    })
    // .catch(function (error) {
    //   console.log(error.message);
    // });
  }
  
  function emailChecked(){
    axios.post('http://localhost:5000/auth/emailChecked', {
      email,
      password,
      emailCode: code,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      <input type="text" value={email} onChange={(e) => {
        setEmail(e.target.value)
      }} />
      <input type="password" value={password} onChange={(e) => {
        setPassword(e.target.value)
      }} />
      <button onClick={signUp}>SIGN UP</button>
      <input type="text" value={code} onChange={(e) => {
        setCode(e.target.value)
      }} />
      <button onClick={emailChecked}>sign </button>
    </div>
  );
}

export default App;
