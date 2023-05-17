import express from 'express';
import { authRequestHandler } from './controllers/auth.controller';

const router = express.Router();

router.post('/test', authRequestHandler);

export default router;
