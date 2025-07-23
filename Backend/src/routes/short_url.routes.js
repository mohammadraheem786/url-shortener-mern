import express from 'express';
import { createShortUrl } from '../controllers/short.url.controllers.js';
import { attachUser } from '../utils/attachUser.js';
const router = express.Router();

router.post("/" ,createShortUrl);

export default router;