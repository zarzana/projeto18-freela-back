import { Router } from 'express';
import { readAccessToken } from '../middleware/cookieMiddleware.js';
import { verifyAcessToken } from '../middleware/jwtMiddleware.js';
import { getUserById, getUserCats } from '../controllers/userController.js';

const router = Router();

// router.get('/api/user/:id', readAccessToken, verifyAcessToken, getUserById);
router.get('/api/user/cats', readAccessToken, verifyAcessToken, getUserCats);

export default router;