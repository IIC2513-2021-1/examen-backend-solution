const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  ctx.redirect(ctx.router.url('api.base'));
});

module.exports = router;
