import React from "react";

const HLogin = () => {
    return (
      <div className="hero min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-4">Login now!</h1>
        <p className="text-base mb-6">Pokemon Need To Login NOW</p>
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
                <span className="label-text text-black">Phone</span>
              </label>
              <input
                type="text"
                placeholder="phone"
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
              <label className="label">
                <a
                  href="/#"
                  className="label-text-alt link link-hover text-black"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary text-black">Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HLogin;
    