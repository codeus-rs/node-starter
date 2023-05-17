import { AuthDto } from '../dto/auth.dto';
import log from '../../../utils/logger';
import hider from '../../../utils/hider';
import ApiError from '../../../core/error';
import { ErrorCodes } from '../../../core/errorCodes';
import { HttpStatus } from 'http-status-ts';
import { sign } from './cryoto.service';

export const testService = (data?: AuthDto) => {
    if (data) {
        const { email, password } = data;
        log.info({ email, password: hider(password) }, 'Testing Auth route');
        return sign({ email });
    }
    throw new ApiError(HttpStatus.UNAUTHORIZED, ErrorCodes.AUTH);
};
