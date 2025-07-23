import express from 'express';
import { registerController, loginController, logout_user, get_current_user } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();
// Register route
router.post('/register', registerController);
// Login route
router.post('/login', loginController);
router.post("/logout", logout_user)
router.get("/me", authMiddleware,get_current_user)

// Export the router
export default router;
