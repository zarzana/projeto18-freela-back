import { Router } from 'express';
import { signup } from '../controllers/auth/signupAuthController.js';
import { login } from '../controllers/auth/loginAuthController.js';
import { loginValidator, signupValidator } from '../middleware/authValidators.js';
import { refreshSession } from '../controllers/auth/refreshAuthController.js';

const router = Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/token', refreshSession)

export default router;