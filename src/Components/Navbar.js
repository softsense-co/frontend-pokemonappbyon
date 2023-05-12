import { Link } from "react-router-dom";
import "./NavbarStyles.css";
import { FaBars, FaTimes } from "react-icons/fa";
import React, { useState } from "react";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [color, setColor] = useState(false);
  const changeColor = () =>{
    if(window.scrollY >=100){
      setColor(true);
    }else{
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
  <div className={color ? "header header-bg" : "header"}>
      <Link to="/">
      <div className="logo-container">
          <img src="../img/logo.png" alt="" className="h-32" />
          <h1>Poke-Dex</h1>
        </div>
      </Link>
      <ul className={click ? "nav-menu.active" : "nav-menu"}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/project">Pokemon</Link>
        </li>
        <li>
          <Link to="/about">My Pokemon</Link>
        </li>
        <li>
          <Link to="/login" >Login</Link>
        </li>
      </ul>
      <div className="poke" onClick={handleClick}>
        {click ? (
          <FaTimes size={20} style={{ color: "black" }} />
        ) : (
          <FaBars size={20} style={{ color: "black" }} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
