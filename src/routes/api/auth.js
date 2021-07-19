require('dotenv').config();

const KoaRouter = require('koa-router');
const jwtgenerator = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');

const router = new KoaRouter();

function generateToken(user) {
  return new Promise((resolve, reject) => {
    const {
      email, firstName, id: sub, lastName,
    } = user;
    jwtgenerator.sign(
      {
        sub, email, firstName, lastName,
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 30 },
      (err, tokenResult) => (err ? reject(err) : resolve(tokenResult)),
    );
  });
}

router.post('api.auth.login', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  const [userRecord] = await ctx.orm.sequelize.query(
    "SELECT * from users WHERE email = '" + email + "'", // eslint-disable-line prefer-template
    {
      type: QueryTypes.SELECT,
    },
  );

  if (!userRecord) ctx.throw(404, `No user found with ${email}`);
  const user = await ctx.orm.user.findByPk(userRecord.id);
  const authenticated = await user.checkPassword(password);
  if (!authenticated) ctx.throw(401, 'Invalid password');

  try {
    const token = await generateToken(user);
    ctx.status = 201;
    // follow OAuth RFC6749 response standard
    // https://datatracker.ietf.org/doc/html/rfc6749#section-5.1
    ctx.body = {
      access_token: token,
      token_type: 'Bearer',
    };
  } catch (error) {
    ctx.throw(500);
  }
});

module.exports = router;
