import { Router } from 'express';
import { readAccessToken } from '../middleware/cookieMiddleware.js';
import { verifyAcessToken } from '../middleware/jwtMiddleware.js';
import { postCatValidator } from '../middleware/catMiddleware.js';
import { getCat, getCatById, postCat } from '../controllers/catController.js';

const router = Router();

router.post('/api/cat', readAccessToken, verifyAcessToken, postCatValidator, postCat);
router.get('/api/cat', getCat);
router.get('/api/cat/:id', readAccessToken, verifyAcessToken, getCatById);

export default router;