import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token; // Make sure this matches the key set in cookie


  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = await verifyToken(token); // should return user id or payload
    const user = await findUserById(decoded);

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const userObj = user.toObject();
    delete userObj.password;
    req.user = userObj;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      error: error.message, // ✅ fixed the syntax here
    });
  }
};
