import * as express from 'express';
import sampleController from '../controllers/sample.controller';

const registerRoutes = (app: express.Application): void => {
    app.use('/sample', sampleController);
};

export default registerRoutes;
