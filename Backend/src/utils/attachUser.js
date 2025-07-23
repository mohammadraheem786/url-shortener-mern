import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "./helper.js";

export const attachUser = async (req, res, next) => {
  try {
    
    const token =
      req.cookies.token;
    if (!token) {
      return next();
    }

      const decoded = await verifyToken(token);
    // console.log("Decoded token:", decoded);

    const user = await findUserById(decoded._id);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: " + error.message });
  }
};