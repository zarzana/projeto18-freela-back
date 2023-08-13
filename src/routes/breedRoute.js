import { Router } from 'express';
import { getBreedCategories, getBreeds } from '../controllers/breedController.js';

const router = Router();

router.get('/api/breed', getBreeds);
router.get('/api/breed/category', getBreedCategories);

export default router;