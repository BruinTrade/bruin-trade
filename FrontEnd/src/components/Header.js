import React from "react";
import classes from "./Header.module.css";
import logo from "../assets/Logo.png";
import search_icon from "../assets/search.png";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <img className={classes.logo} src={logo} alt="Logo" />
      <input className={classes.input} />
      <button className={classes.search_button}>
        <img
          className={classes.search_icon}
          src={search_icon}
          alt="search_icon"
        />
      </button>
      <button className={classes.sign_up}>Sign Up</button>
      <button className={classes.login_button}>Login</button>
    </header>
  );
};

export default Header;
