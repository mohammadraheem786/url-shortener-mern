import { cookieOptions } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import wrapAsync from "../utils/wrapAsync.js";

// Register Controller
export const registerController = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const token = await registerUser({ name, email, password });

  res.cookie("token", token, cookieOptions);
  res.status(201).json({ message: "User registered successfully", token });
});

// Login Controller
export const loginController = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  const { token, user } = await loginUser({ email, password });

  // Remove password before sending to client
  const safeUser = { ...user._doc };
  delete safeUser.password;

  res.cookie("token", token, cookieOptions);
  res.status(200).json({ message: "Login successful", user: safeUser, token });
});

// Logout Controller
export const logout_user = wrapAsync(async (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "Logout success" });
});

// Get Current User
export const get_current_user = wrapAsync(async (req, res) => {
  res.status(200).json({ user: req.user });
});
