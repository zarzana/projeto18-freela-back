import { Router } from 'express';
import { signup } from '../controllers/auth/signupAuthController.js';
import { login } from '../controllers/auth/loginAuthController.js';
import { loginValidator, signupValidator } from '../middleware/authMiddleware.js';
import { refreshSession } from '../controllers/auth/refreshAuthController.js';
import { logout } from '../controllers/auth/logoutAuthController.js';
import { clearCookies, refreshTokenAbsent, readRefreshToken } from '../middleware/cookieMiddleware.js';

const router = Router();

router.post('/auth/signup', refreshTokenAbsent, signupValidator, signup);
router.post('/auth/login', refreshTokenAbsent, loginValidator, login);
router.post('/auth/token', readRefreshToken, refreshSession);
router.post('/auth/logout', readRefreshToken, clearCookies, logout);

export default router;