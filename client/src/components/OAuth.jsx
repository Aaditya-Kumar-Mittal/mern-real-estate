import React from "react";
import { FcGoogle } from "react-icons/fc"; // Import Google icon
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      // console.log(result);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,  // Change from 'photoUrl' to 'photoURL'
        }),
      });

      const data = await res.json();

      dispatch(signInSuccess(data));

      navigate("/");
    } catch (error) {
      console.log("Could not sign In with Google!");
    }
  };
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 	bg-slate-950 text-white p-3 rounded-lg hover:opacity-75"
      onClick={handleGoogleClick}
    >
      Continue with Google <FcGoogle size={24} />
    </button>
  );
};

export default OAuth;
