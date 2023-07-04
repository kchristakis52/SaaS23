import React from "react";

const Logout = (props) => {
  localStorage.removeItem("token");
  window.location.href = "http://localhost:4007/";
};

export default Logout;
