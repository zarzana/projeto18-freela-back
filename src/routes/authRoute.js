import { Router } from 'express';
import { signup } from '../controllers/auth/signupAuthController.js';
import { login } from '../controllers/auth/loginAuthController.js';
import { loginValidator, signupValidator } from '../middleware/authMiddleware.js';
import { refreshSession } from '../controllers/auth/refreshAuthController.js';
import { logout } from '../controllers/auth/logoutAuthController.js';
import { clearCookies, refreshTokenAbsent, readRefreshToken } from '../middleware/cookieMiddleware.js';
import { validateRefreshToken } from '../middleware/jwtMiddleware.js';

const router = Router();

router.post('/api/auth/signup', refreshTokenAbsent, signupValidator, signup);
router.post('/api/auth/login', refreshTokenAbsent, loginValidator, login);
router.post('/api/auth/token', readRefreshToken, validateRefreshToken, refreshSession);
router.post('/api/auth/logout', readRefreshToken, clearCookies, validateRefreshToken, logout);

export default router;