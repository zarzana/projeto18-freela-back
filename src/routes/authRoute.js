import { Router } from 'express';
import { signup } from '../controllers/auth/signupAuthController.js';
import { signupValidator } from '../middleware/authValidators.js';

const router = Router();

router.post('/signup', signupValidator, signup);

export default router;