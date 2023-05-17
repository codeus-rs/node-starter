import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import ReqHandler from '../../../core/request';
import { AuthDto } from '../dto/auth.dto';
import { testService } from '../services/auth.service';

export const authRequestHandler = ReqHandler((req: Request, res: Response) => {
    const dataToSend = testService(req.body as unknown as AuthDto);
    return res.status(StatusCodes.OK).send({ message: 'Everything is ok', user: dataToSend });
});
