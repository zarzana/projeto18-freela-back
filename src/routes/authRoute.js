import { Router } from 'express';
import { signup } from '../controllers/auth/signupAuthController.js';
import { login } from '../controllers/auth/loginAuthController.js';
import { loginValidator, signupValidator } from '../middleware/authValidators.js';

const router = Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);

export default router;