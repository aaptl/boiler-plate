import * as express from 'express';

import defaultRouter from './default/default.route';

const router = express.Router();

router.use('/', defaultRouter);

export default router;
