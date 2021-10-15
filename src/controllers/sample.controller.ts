import * as express from 'express';
import log from '../utils/logger';

const router: express.Router = express.Router();

router.get('/', (req, res) => {
    try {
        log.info('From sample route %o', req);
        return res.status(200).send('Sample route');
    } catch (error) {
        return res.status(400).send(error);
    }
});

export default router;
