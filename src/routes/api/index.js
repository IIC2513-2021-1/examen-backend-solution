require('dotenv').config();

const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
const { setCurrentUser } = require('../../middlewares/auth');
const auth = require('./auth');
const companies = require('./companies');

const router = new KoaRouter();

router.get('api.base', '/', async (ctx) => {
  const usersCount = await ctx.orm.user.count();
  ctx.body = {
    message: 'Bienvenidos a la API del examen del curso IIC2513',
    usersCount,
  };
});

router.use('/auth', auth.routes());

router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }));
router.use(setCurrentUser);

router.use('/companies', companies.routes());

module.exports = router;
