import React from "react";
import "./index.css";
import Home from "./Routes/Home";
import Project from "./Routes/Project";
import About from "./Routes/About";
import Login from "./Routes/Login";
import Regist from "./Routes/Regist";
import DetailPoke from "./Routes/DetailPoke";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regist />} />
        <Route path="/detail/:name" element={<DetailPoke />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
