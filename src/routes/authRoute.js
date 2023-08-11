import { Router } from 'express';
import { signup } from '../controllers/auth/signupAuthController.js';
import { login } from '../controllers/auth/loginAuthController.js';
import { loginValidator, signupValidator } from '../middleware/authValidators.js';
import { refreshSession } from '../controllers/auth/refreshAuthController.js';
import { logout } from '../controllers/auth/logoutAuthController.js';

const router = Router();

router.post('/auth/signup', signupValidator, signup);
router.post('/auth/login', loginValidator, login);
router.post('/auth/token', refreshSession);
router.post('/auth/logout', logout);

export default router;