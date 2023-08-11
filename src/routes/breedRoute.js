import { Router } from 'express';
import { getBreeds } from '../controllers/breedController.js';

const router = Router();

router.get('/breed', getBreeds);

export default router;