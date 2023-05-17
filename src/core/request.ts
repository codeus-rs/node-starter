import { Request, Response, NextFunction } from 'express';
import log from '../utils/logger';
import ApiError from './error';
import { errorCodeMessage } from './errorCodes';
import PrettyError from 'pretty-error';

const pe = new PrettyError();

const ReqHandler = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await fn(req, res, next);
    } catch (err) {
        if (err instanceof ApiError) {
            const customError: string = errorCodeMessage[err.code];
            const path = err?.stack?.split(' at ').at(1)?.trim().replace('\n', '');
            log.error({ code: err.code, message: customError, path });
            return res.status(err.statusCode).send({ code: err.code, message: 'Custom error' });
        } else {
            pe.render(err as Error, true, true);
            return res.status(500).send({ code: 9999, message: 'Unknown error' });
        }
    }
};

export default ReqHandler;
