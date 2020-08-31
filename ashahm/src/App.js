import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>COMMUNITY BARTER SITE</h1>
        <img src="/pictures/cblogo.JPG" className="cblogo" alt= "logo" />
        <div className='styled'>
	  <ul>
		 <li><a href="/">Home</a></li>
          <li><a href="/about">About this site</a></li>
          % if authenticated:
          <li><a href="/accountSettings">Account Settings</a></li>
          % end
      </ul>
    </div>
      </header>
    </div>
  );
}

export default App;
