import pino from 'pino';

const log = pino({
    name: 'logger',
    timestamp: true,
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        },
    },
});

export default log;
