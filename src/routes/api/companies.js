const KoaRouter = require('koa-router');
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const CompanySerializer = new JSONAPISerializer('companies', {
  attributes: ['name', 'founder', 'foundedAt', 'description', 'imageUrl', 'summary', 'summaryStats'],
  keyForAttribute: 'camelCase',
  transform(record) {
    const { milestones, stat } = record;
    if (milestones) {
      const { title, happenedAt, excerpt } = milestones[0];
      // eslint-disable-next-line no-param-reassign
      record.summary = { title, happenedAt, excerpt };
    }
    if (stat) {
      const { crewedFlightOn, maxAltitude, vehicleType } = stat;
      // eslint-disable-next-line no-param-reassign
      record.summaryStats = { crewedFlightOn, maxAltitude, vehicleType };
    }
    return record;
  },
});

const MilestoneSerializer = new JSONAPISerializer('milestones', {
  attributes: ['title', 'happenedAt', 'excerpt'],
  keyForAttribute: 'camelCase',
});

const StatsSerializer = new JSONAPISerializer('stats', {
  attributes: [
    'flightsQuantity',
    'vehicleType',
    'maxAltitude',
    'hasEscapeSystem',
    'crewedFlightOn',
    'requiresPilot',
    'passengersQuantity',
    'landingType',
  ],
  keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

router.get('api.companies.list', '/', async (ctx) => {
  const companies = await ctx.orm.company.findAll();
  ctx.body = CompanySerializer.serialize(companies);
});

router.get('api.companies.show', '/:id', async (ctx) => {
  const company = await ctx.orm.company.findByPk(ctx.params.id, {
    include: [ctx.orm.milestone, ctx.orm.stats],
    order: [
      ['milestones', 'happenedAt', 'DESC'],
    ],
  });
  if (!company) {
    ctx.throw(404, "The company you are looking for doesn't exist");
  }
  ctx.body = CompanySerializer.serialize(company);
});

router.get('api.companies.milestones', '/:id/milestones', async (ctx) => {
  const company = await ctx.orm.company.findByPk(ctx.params.id, {
    include: ctx.orm.milestone,
    order: [
      ['milestones', 'happenedAt', 'ASC'],
    ],
  });
  if (!company) {
    ctx.throw(404, "The company you are looking for doesn't exist");
  }
  ctx.body = MilestoneSerializer.serialize(company.milestones);
});

router.get('api.companies.stats', '/:id/stats', async (ctx) => {
  const company = await ctx.orm.company.findByPk(ctx.params.id, {
    include: ctx.orm.stats,
  });
  if (!company) {
    ctx.throw(404, "The company you are looking for doesn't exist");
  }
  ctx.body = StatsSerializer.serialize(company.stat);
});

module.exports = router;
