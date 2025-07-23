import { cookieOptions } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import wrapAsync from "../utils/wrapAsync.js"; // Ensure this is imported correctly

export const registerController = wrapAsync(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const token = await registerUser({ name, email, password });
    res.cookie("token", token, cookieOptions);
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(400).json({ message: error.message }); // Specific error message
  }
});

export const loginController = wrapAsync(async (req, res) => {
  try {
    const { email, password } = req.body;
    const {token,user} = await loginUser({ email, password });
    req.user = user; // Attach user to request object if needed
    res.cookie("token", token, cookieOptions);
    res.status(200).json("Login successful");
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(400).json({ message: error.message }); // Specific error message
  }
});

export const logout_user = wrapAsync( async (req, res) => {
    res.clearCookie("accessToken", cookieOptions)
    res.status(200).json({message:"logout success"})
})

export const get_current_user = wrapAsync( async (req, res) => {
    res.status(200).json({user:req.user})
})