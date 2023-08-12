import { Router } from 'express';
import authRoute from './authRoute.js';
import breedRoute from './breedRoute.js';
import catRoute from './catRoute.js';

const router = Router();
router.use(authRoute);
router.use(breedRoute);
router.use(catRoute);

export default router;