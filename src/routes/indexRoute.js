import { Router } from 'express';
import authRoute from './authRoute.js';
import breedRoute from './breedRoute.js';
import catRoute from './catRoute.js';
import userRoute from './userRoute.js';

const router = Router();
router.use(authRoute);
router.use(breedRoute);
router.use(catRoute);
router.use(userRoute);

export default router;