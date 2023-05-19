import "./HeroStyles.css";
import IntroImg from "../img/bg3.png";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../Components/LoginPage/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Hero = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = isLoggedIn();

  const onPressListPokemonsIsUserLoggedIn = () => {
    if (isUserLoggedIn) {
      navigate("/listpokemons");
    } else {
      MySwal.fire({
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
      MySwal.fire({
        title: "Access Denied",
        text: "Please login to access this feature.",
        icon: "error",
      });
    }
  };

  return (
    <div className="hero">
      <div className="mask">
        <img className="into-img" src={IntroImg} alt="IntroImg" />
      </div>
      <div className="content  ">
        <p>POKEMON</p>
        <h1>Pokemon Go</h1>
        <div>
          <Link
            to="/project"
            className="btn rounded-xl text-black"
            onClick={onPressListPokemonsIsUserLoggedIn}
          >
            Pokemon
          </Link>
          <Link
            to="/about"
            className="btn rounded-xl text-black"
            onClick={onPressMyPokemonsIsUserLoggedIn}
          >
            My Pokemon
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
