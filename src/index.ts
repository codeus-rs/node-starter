import 'dotenv/config';
import log from './utils/logger';
import env from './config/environment';
// Import here before application initialization
import app from './services/app.service';

try {
    app.listen(env.PORT, (): void => {
        log.info(`📡  Connected successfully on port ${env.PORT}`);
    });
} catch (error) {
    log.error((error as ErrorEvent).message);
}

if (process.send) process.send('ready');
