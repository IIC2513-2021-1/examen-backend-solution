const KoaRouter = require('koa-router');
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const CompanySerializer = new JSONAPISerializer('companies', {
  attributes: ['name', 'founder', 'foundedAt', 'description', 'imageUrl'],
  keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

router.get('api.companies.list', '/', async (ctx) => {
  const companies = await ctx.orm.company.findAll();
  ctx.body = CompanySerializer.serialize(companies);
});

router.get('api.companies.show', '/:id', async (ctx) => {
  const company = await ctx.orm.company.findByPk(ctx.params.id);
  if (!company) {
    ctx.throw(404, "The company you are looking for doesn't exist");
  }
  ctx.body = CompanySerializer.serialize(company);
});

module.exports = router;
