import React, { useState } from "react";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="hero min-h-full flex flex-col justify-center  px-6 py-12 lg:px-8 ">
      <img
        className="mx-auto h-20 w-auto"
        src="../../img/logo.png"
        alt="Your Company"
      />
      <h1 className="text-5xl font-bold mb-4">Poke Register !!</h1>
      {/* <p className="text-base mb-6">Pokemon Need To Login NOW</p> */}
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl mb-16 ">
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Username</span>
              </label>
              <input
                type="text"
                // value={name}
                placeholder="username"
                // name="name"
                className="input input-bordered input-ghost text-black"
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
              <button className="btn btn-primary text-black">Sign Up</button>
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
