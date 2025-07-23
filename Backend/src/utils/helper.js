import jwt from "jsonwebtoken";
import { nanoid } from 'nanoid';
import { cookieOptions } from '../config/config.js';

export const generateNanoid = (length) => nanoid(length);

export const signToken = (payload) => {
  try {
    const tokenPayload = typeof payload === 'object' && payload._id ? { _id: payload._id } : payload;
    return jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1h" });
  } catch (error) {
    throw new Error(`Error signing token: ${error.message}`);
  }
};

export const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};