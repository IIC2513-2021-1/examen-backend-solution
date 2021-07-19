const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('api.base', '/', async (ctx) => {
  const usersCount = await ctx.orm.user.count();
  ctx.body = {
    message: 'Bienvenidos a la API del examen del curso IIC2513',
    usersCount,
  };
});

module.exports = router;
