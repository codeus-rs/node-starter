import 'dotenv/config';
import log from './utils/logger';
import env from './config/environment';
import app from './app';
// Import here before application initialization
let server: any;

const startServer = (port: number) =>
    new Promise((resolve, reject) => {
        server = app.listen(port);
        server.once('listening', resolve);
        server.once('error', reject);
    });

const main = async () => {
    try {
        // CONNECT TO DB
        log.info('📡 Connected to the database.');

        server = await startServer(env.PORT);
        log.info(`📡  Connected successfully on port ${env.PORT}`);

        if (process.send) process.send('ready');
    } catch (error) {
        log.error((error as ErrorEvent).message);
        process.exit(1);
    }
};
main()
    .then(() => log.info('Server is running.'))
    .catch((err) => log.error('Ooops! Something went wrong. :(\n', err));

process.on('SIGTERM', () => {
    log.info('Received SIGTERM. Gracefully shutting down server...');

    // DISCONNECT FROM DB
    if (server) server.close(() => log.info('Server closed.'));
});

process.on('error', () => {
    console.log('ERROR:');
    process.exit(1);
});
