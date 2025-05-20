import { Router } from 'express';
import { getBalance } from '../controllers/balance.controller';

const router = Router();

// balance endpoint
router.get('/api/balance', getBalance);

export default router; 