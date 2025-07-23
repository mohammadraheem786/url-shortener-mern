import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../dao/user.dao.js";
import { signToken } from "../utils/helper.js";
import logger from "../utils/logger.js"; // Assume a logging utility (e.g., winston)

// Configuration for bcrypt (adjust salt rounds based on security needs)
const SALT_ROUNDS = 12; // Increased from 10 for better security

/**
 * Registers a new user with the provided details.
 * @param {Object} userData - Contains email, name, and password.
 * @returns {Promise<string>} JWT token for the newly created user.
 * @throws {Error} If user exists, hashing fails, or user creation fails.
 */
export const registerUser = async (userData) => {
  const { email, name, password } = userData;

  // Input validation
  if (!email || !name || !password) {
    throw new Error("Missing required fields: email, name, or password");
  }

  // Check for existing user
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    logger.warn(`Registration attempt for existing email: ${email}`);
    throw new Error("User already exists");
  }

  // Hash password with synchronous logging for debugging
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    logger.error("Password hashing failed", { error });
    throw new Error("Internal server error during password hashing");
  }
  if (!hashedPassword) {
    logger.error("Hashed password is undefined or empty");
    throw new Error("Internal server error during password hashing");
  }

  // Create user in database
  let createdUser;
  try {
    createdUser = await createUser({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    logger.error("User creation failed", { error, email });
    throw new Error("Internal server error during user creation");
  }
  if (!createdUser || !createdUser._id) {
    logger.error("User not created or invalid user object", { createdUser });
    throw new Error("Internal server error during user creation");
  }

  // Generate and return JWT token
  const token = await signToken({ _id: createdUser._id });
  return token;
};

/**
 * Authenticates a user and returns a JWT token.
 * @param {Object} credentials - Contains email and password.
 * @returns {Promise<string>} JWT token for the authenticated user.
 * @throws {Error} If user not found, password invalid, or internal error occurs.
 */
export const loginUser = async ({ email, password }) => {
  // Input validation
  if (!email || !password) {
    throw new Error("Missing required fields: email or password");
  }

  // Find user in database
  let user;
  try {
    user = await findUserByEmail(email);
  } catch (error) {
    logger.error("Error finding user", { error, email });
    throw new Error("Internal server error during user lookup");
  }
  if (!user) {
    logger.warn("Login attempt with non-existent email", { email });
    throw new Error("User not found");
  }

  // Validate password
  let isPasswordValid;
  try {
    logger.debug("Comparing passwords", { email });
    isPasswordValid = await bcrypt.compare(password, user.password);
    logger.debug("Password comparison result", { isPasswordValid });
  } catch (error) {
    logger.error("Password comparison failed", { error, email });
    throw new Error("Internal server error during password validation");
  }
  if (!isPasswordValid) {
    logger.warn("Invalid password attempt", { email });
    throw new Error("Invalid Credentials");
  }

  // Generate and return JWT token
  const token = signToken({ _id: user._id });
  return {token,user};
};
