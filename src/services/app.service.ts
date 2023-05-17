import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import registerRoutes from '../routes';
import log from '../utils/logger';
import { corsConfig, upload, limiter } from '../config/server';

const app: express.Application = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
        limit: '25mb',
        parameterLimit: 25000,
    }),
);
app.use(cors(corsConfig));
app.use(helmet());
app.use(upload.any());
app.use(limiter);
app.use(cookieParser());
app.use((req, _res, next) => {
    const ip = req.ips.length > 1 ? req.ips.join(' -> ') : req.ip;
    log.info(`💬 Request: [${req.method}: ${req.url}]   IP: [${ip}]`);
    log.info('📦 Body: %o', req.body);
    log.info('📦 Query: %o', req.query);
    next();
});

registerRoutes(app);
export default app;
