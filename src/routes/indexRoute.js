import { Router } from 'express';
import authRoute from './authRoute.js';
import breedRoute from './breedRoute.js';

const router = Router();
router.use(authRoute);
router.use(breedRoute);

export default router;