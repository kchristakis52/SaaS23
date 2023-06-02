import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationItems.css";

const NavigationItems = () => {
  let token = false;
  const username = encodeURIComponent(localStorage.getItem("username"));
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
              <NavigationItem
                link={`$/ newchart?username=${username}`}
                auth={!token}
              >
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
