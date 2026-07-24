import express from 'express';
import { loginUser, getDashboard, logoutUser, getHint } from '../controllers/authController.js';
import { validateLogin } from '../middleware/validateInput.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', validateLogin, loginUser);
router.post('/logout', requireAuth, logoutUser);
router.get('/dashboard', requireAuth, getDashboard);
router.get('/hint', getHint);

export default router;
