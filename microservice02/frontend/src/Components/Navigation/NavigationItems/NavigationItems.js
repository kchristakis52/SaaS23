import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css' ;

const NavigationItems = () => {
  let token = false;
  if (localStorage.getItem('token')) token = true;
  return (
    <nav className="navbar">
      <h1>My charts</h1>
      <nav className="navbar">
        <NavigationItem link="/">Home</NavigationItem>
        <NavigationItem link="https://github.com/ntua/SaaS23-20" target="_blank" rel="noreferrer">
      Github
    </NavigationItem>
        <NavigationItem link="/charts" auth={!token}>
          Endpoints
        </NavigationItem>
        <NavigationItem link="/login" auth={token}>
          Login
        </NavigationItem>
        <NavigationItem link="/logout" auth={!token}>
          Logout
        </NavigationItem>
      </nav>
    </nav>
  );
};

export default NavigationItems;
