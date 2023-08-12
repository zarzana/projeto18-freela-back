import { Router } from 'express';
import { signup } from '../controllers/auth/signupAuthController.js';
import { login } from '../controllers/auth/loginAuthController.js';
import { loginValidator, signupValidator } from '../middleware/authValidators.js';
import { refreshSession } from '../controllers/auth/refreshAuthController.js';
import { logout } from '../controllers/auth/logoutAuthController.js';
import { refreshTokenAbsent, refreshTokenPresent } from '../middleware/cookieValidators.js';

const router = Router();

router.post('/auth/signup', refreshTokenAbsent, signupValidator, signup);
router.post('/auth/login', refreshTokenAbsent, loginValidator, login);
router.post('/auth/token', refreshTokenPresent, refreshSession);
router.post('/auth/logout', refreshTokenPresent, logout);

export default router;