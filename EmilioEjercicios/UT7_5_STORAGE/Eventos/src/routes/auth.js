import { Router } from 'express';
import { register, login, authenticate } from '../controllers/auth.js';
// import { authenticate } from '../middlewares/auth.js';

const router = Router();
router.use((req, res, next) => {
    console.log(`Request method: ${req.method}, Request URL: ${req.originalUrl}`);
    next();
});

// actividad Eventos-Usuarios
router.get('/validate', authenticate);

router.post('/register', register);
router.post('/login', login);



export default router;