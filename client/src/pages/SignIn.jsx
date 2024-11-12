import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user); //Refering to the current state of the user defined in store.js in redux

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //Click on button refreshes, preventDefault prevents automatic refreshing of the page

    try {
      dispatch(signInStart()); // Start Loading
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      //If sign up error
      if (data.success == false) {
        // setLoading(false);
        // setError(data.message); //Message one gets from middleware in index.js
        dispatch(signInFailure(data.message));
        return;
      }

      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data.rest)); // Dispatch the success action with the correct data
      navigate("/"); // Redirect after successful sign-in
    } catch (error) {
      //Any other error is there
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        <button className="bg-red-800 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          {/* Conditional Rendering in React */}
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>

      <div className="flex items-center gap-4 max-w-lg justify-center mt-5">
        <p>No account?</p>
        <Link to={"/sign-up"}>
          <span className="text-1xl text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 m">{error}</p>}
    </div>
  );
};

export default SignIn;
