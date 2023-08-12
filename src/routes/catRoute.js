import { Router } from 'express';
import { readAccessToken } from '../middleware/cookieMiddleware.js';
import { verifyAcessToken } from '../middleware/jwtMiddleware.js';
import { postCatValidator } from '../middleware/catMiddleware.js';
import { getCat, postCat } from '../controllers/catController.js';

const router = Router();

router.post('/cat', readAccessToken, verifyAcessToken, postCatValidator, postCat);
router.get('/cat', getCat);

export default router;