import express from 'express';
import { loginUser, getDashboard, logoutUser, getHint, getFailureHint } from '../controllers/authController.js';
import { validateLogin } from '../middleware/validateInput.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { loginRateLimit } from '../middleware/loginRateLimit.js';

const router = express.Router();

router.post('/login', loginRateLimit, validateLogin, loginUser);
router.post('/logout', requireAuth, logoutUser);
router.get('/dashboard', requireAuth, getDashboard);
router.get('/hint', getHint);
router.get('/hint/failure', getFailureHint);

export default router;
