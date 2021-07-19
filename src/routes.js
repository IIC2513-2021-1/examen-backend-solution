const KoaRouter = require('koa-router');
const api = require('./routes/api');
const index = require('./routes/index');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/api', api.routes());

module.exports = router;
