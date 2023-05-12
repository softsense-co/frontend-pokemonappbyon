import "./HeroStyles.css";
import IntroImg from "../img/bg3.png";
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <div className="mask">
        <img className="into-img" src={IntroImg} alt="IntroImg" />
      </div>
      <div className="content  ">
        <p>POKEMON</p>
        <h1>Pokemon Go</h1>
        <div>
          <Link to="/project" className="btn rounded-full text-black">
            Pokemon
          </Link>
          <Link to="/about" className="btn rounded-full text-black">
            My Pokemon
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
