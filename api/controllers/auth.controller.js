import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {

  const { username, email, password } = req.body;

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashPassword });

  try {

    //Don't go to the next line until all of the await function is done
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });

  } catch (error) {

    // console.error("Error creating user:", error);

    // res.status(500).json({ message: "Failed to create user", error: error.message });

    next(error);

  }

  // res.json(newUser);

}