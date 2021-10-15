import * as pino from 'pino';

const log = pino({
    timestamp: () => `,"time":"${new Date(Date.now()).toUTCString()}"`,
    prettyPrint: {
        levelFirst: true,
        colorize: true,
    },
});

export default log;
