import React from "react";
import "./index.css";
import Home from "./Routes/Home";
import Project from "./Routes/Project";
import About from "./Routes/About";
import Login from "./Routes/Login";
import Regist from "./Routes/Regist";
import DetailPoke from "./Routes/DetailPoke";
import { isLoggedIn } from '../src/Components/LoginPage/auth'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={isLoggedIn() ? <Project /> : <Navigate to="/" />} />
        <Route path="/about" element={isLoggedIn() ? <About /> : <Navigate to="/" />} />
        <Route path="/login" element={isLoggedIn() ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Regist />} />
        <Route path="/detail/:id" element={<DetailPoke />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
