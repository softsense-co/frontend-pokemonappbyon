import React from "react";
// import { Link } from "react-router-dom";

const HLogin = () => {
  return (
    <div className="hero min-h-full flex flex-col justify-center  px-6 py-12 lg:px-8 ">
      <img
        className="mx-auto h-20 w-auto"
        src="../../img/logo.png"
        alt="Your Company"
      />
      <h1 className="text-5xl font-bold mb-4">Login now!</h1>
      <p className="text-base mb-6">Pokemon Need To Login</p>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl ">
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Email</span>
            </label>
            <input
              type="text"
              placeholder="email"
              className="input input-bordered input-ghost text-black"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered input-ghost text-black"
            />
          </div>
          <a href="/#" className="font-semibold text-s text-black">
            Forgot Password
          </a>
          <div className="form-control mt-6">
            <button className="btn btn-primary text-black">Login</button>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            you don't have an account? click to{" "}
            <a
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HLogin;
