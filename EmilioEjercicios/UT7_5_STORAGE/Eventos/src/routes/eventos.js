import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { getAllEvents, getOneEvent, postOneEvent, deleteOneEvent} from '../controllers/eventos.js';

const router = Router();

router.use((req, res, next) => {
  console.log(`Request method: ${req.method}, Request URL: ${req.originalUrl}`);
  next();
});

router.get('/', authenticate, getAllEvents);
router.get('/:eventoId', authenticate, getOneEvent);
router.post('/', authenticate, postOneEvent);
// router.post('/', postOneEvent);
router.delete('/:eventoId', authenticate, deleteOneEvent);
// router.delete('/:eventoId', deleteOneEvent);


export default router;