import { Router } from 'express';
import { readAccessToken } from '../middleware/cookieMiddleware.js';
import { verifyAcessToken } from '../middleware/jwtMiddleware.js';
import { postCatValidator } from '../middleware/catMiddleware.js';
import { postCat } from '../controllers/catController.js';

const router = Router();

router.post('/cat', readAccessToken, verifyAcessToken, postCatValidator, postCat);

export default router;