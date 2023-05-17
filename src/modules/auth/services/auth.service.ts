import { StatusCodes } from 'http-status-codes';
import { AuthDto } from '../dto/auth.dto';
import log from '../../../utils/logger';
import hider from '../../../utils/hider';
import ApiError from '../../../core/error';
import { ErrorCodes } from '../../../core/errorCodes';
import { sign } from './cryoto.service';

export const testService = (data?: AuthDto) => {
    if (data) {
        const { email, password } = data;
        log.info({ email, password: hider(password) }, 'Testing Auth route');
        return sign({ email });
    }
    throw new ApiError(StatusCodes.UNAUTHORIZED, ErrorCodes.AUTH);
};
