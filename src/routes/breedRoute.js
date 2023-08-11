import { Router } from 'express';
import { getBreedCategories, getBreeds } from '../controllers/breedController.js';

const router = Router();

router.get('/breed', getBreeds);
router.get('/breed/category', getBreedCategories);

export default router;