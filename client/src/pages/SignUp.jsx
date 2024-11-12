import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //Click on button refreshes, preventDefault prevents automatic refreshing of the page
    console.log(formData);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-slate-800 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
      </form>

      <div className="flex items-center gap-4 max-w-lg justify-center mt-5">
        <p>Have an acccount already?</p>
        <span className="text-1xl text-blue-700">Sign In</span>
      </div>
    </div>
  );
};

export default SignUp;
