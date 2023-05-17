import { HttpStatus } from 'http-status-ts';
import { Request, Response } from 'express';
import log from '../../../utils/logger';
import ReqHandler from '../../../core/request';
import { AuthDto } from '../dto/auth.dto';
import { sign } from '../services/auth.service';
import hider from '../../../utils/hider';

export const authRequestHandler = ReqHandler((req: Request, res: Response) => {
    const { email, password } = req.body as unknown as AuthDto;
    log.info({ email, password: hider(password) }, 'Testing Auth route');
    const user = sign({ email });
    return res.status(HttpStatus.OK).send({ message: 'Everything is ok', user });
});
