import express from 'express';
import authRoutes from '../modules/auth/auth.routes';

const registerRoutes = (app: express.Application): void => {
    app.use('/auth', authRoutes);
};

export default registerRoutes;
