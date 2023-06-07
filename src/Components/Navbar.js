import { Link } from "react-router-dom";
import "./NavbarStyles.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../Components/LoginPage/auth";
import { logout } from "../Components/LoginPage/Logout";
import Swal from "sweetalert2";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 10) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  const navigate = useNavigate();
  const isUserLoggedIn = isLoggedIn();

  const onPressLogin = () => {
    navigate("/login");
  };

  const onPressListPokemonsIsUserLoggedIn = () => {
    if (isUserLoggedIn) {
      navigate("/listpokemons");
    } else {
      Swal.fire({
        title: "Access Denied",
        text: "Please login to access this feature.",
        icon: "error",
      });
    }
  };

  const onPressMyPokemonsIsUserLoggedIn = () => {
    if (isUserLoggedIn) {
      navigate("/mypokemons");
    } else {
      Swal.fire({
        title: "Access Denied",
        text: "Please login to access this feature.",
        icon: "error",
      });
    }
  };

  const renderAuthBtn = () => {
    if (isUserLoggedIn) {
      return (
        <button onClick={handleLogout} className="btn text-black">
          Logout
        </button>
      );
    } else {
      return (
        <button onClick={onPressLogin} className="btn text-black">
          Login
        </button>
      );
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={color ? "header header-bg" : "header"}>
      <Link to="/">
        <div className="logo-container">
          <img src="../img/logo.png" alt="" className="h-32" />
          <h1>Poke-Dex</h1>
        </div>
      </Link>
      <ul className="nav-menu">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/project"
            className="nav-link"
            onClick={onPressListPokemonsIsUserLoggedIn}
          >
            Pokemon
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="nav-link"
            onClick={onPressMyPokemonsIsUserLoggedIn}
          >
            My Pokemon
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/login" className="navbar-end">
            {renderAuthBtn()}
          </Link>
        </li>
      </ul>
      <div className="menu" onClick={handleClick}>
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
