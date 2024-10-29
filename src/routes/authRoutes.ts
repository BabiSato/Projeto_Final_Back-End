import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

router.get('/users', register);
router.post('/users', login);

export default router;