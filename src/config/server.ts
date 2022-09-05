import * as multer from 'multer';
import * as cors from 'cors';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import env, { fileSize, isDevMode } from './environment';
import log from '../utils/logger';

export const upload: multer.Multer = multer({
    limits: {
        fileSize: fileSize * 1024 * 1024,
    },
});

const whitelist = [env.CLIENT];
export const corsConfig: cors.CorsOptions = {
    origin: (origin, callback) => {
        log.info('🌐 Origin: ', origin);
        if (isDevMode || origin === undefined || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

export const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: isDevMode ? 0 : 100,
});

export default {
    upload,
    corsConfig,
    limiter,
};
