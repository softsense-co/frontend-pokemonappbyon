import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/auth/register", {
        name: name,
        email: email,
        password: password,
      });
      console.log(response); // Menampilkan respons dari server
      localStorage.setItem("authToken", true);

      Swal.fire("Success", "Registration successful!", "success").then(() => {
        setIsRegistered(true);
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Registration failed!", "error");
    }
  };

  if (isRegistered) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className="hero min-h-full flex flex-col justify-center px-6 py-12 lg:px-8"
      style={{ backgroundImage: 'url("../../img/bg3.png")' }}
    >
      <img
        className="mx-auto h-20 w-auto"
        src="../../img/logo.png"
        alt="Your Company"
      />
      <h1 className="text-5xl font-bold mb-4">Poke Register !!</h1>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl mb-16 mt-5" style={{ background: 'linear-gradient(to right, #98EECC, #2CD3E1)' }}>
        <div className="card-body">
          <p className="text-xl mb-6 text-center font-bold">
            Pokemon Need To Register
          </p>
          <form onSubmit={handleSubmit}>
          <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered input-ghost text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                name="name"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered input-ghost text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Password</span>
              </label>
              <input
                type="password"
                placeholder="********"
                value={password}
                className="input input-bordered input-ghost text-black"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn" type="submit">
                Sign Up
              </button>
            </div>
            <p className="mt-0 text-center text-sm text-gray-500">
              you have an account? click to{" "}
              <a
                href="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
