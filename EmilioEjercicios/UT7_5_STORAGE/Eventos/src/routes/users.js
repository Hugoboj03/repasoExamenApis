import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { getAllUsers, profile } from '../controllers/users.js';

const router = Router();
router.use((req, res, next) => {
    console.log(`Request method: ${req.method}, Request URL: ${req.originalUrl}`);
    next();
});

router.get('/', authenticate, getAllUsers);
// router.get('/', getAllUsers);
router.get('/user/profile', authenticate, profile);

export default router;