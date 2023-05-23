import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationItems.css";

const NavigationItems = () => {
  let token = false;
  if (localStorage.getItem("token")) token = true;
  return (
    <div>
      <nav className="gheader">
        <div className="logo-list-container">
          <a className="logo" href="/">
            MyCharts
          </a>
          <ul className="navigation-list">
            <li>
<<<<<<< HEAD
=======
              <NavigationItem link="/newchart">New Chart</NavigationItem>
            </li>
            <li>
>>>>>>> 94f45b26d55fe8fbb68ce24470ce192c447c114e
              <NavigationItem link="/newchart" auth={!token}>
                New Chart
              </NavigationItem>
            </li>
          </ul>
        </div>
        <div className="login-container">
          {token ? (
            <NavigationItem link="/logout">Logout</NavigationItem>
          ) : (
            <NavigationItem link="/login">Login</NavigationItem>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavigationItems;
