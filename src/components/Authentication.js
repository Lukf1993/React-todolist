import React from 'react';
import './App.css';

function Authentication() {

  return(
    <div>
      <input id='email' type='text' placeholder='email'></input>
      <input id='password' type='password' placeholder='password'></input>
      <button id='sing-in'>Sing In</button>
      <button id='sing-out'>Sing Out</button>
    </div>
  )
};

export default Authentication;

