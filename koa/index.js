const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const respond = require('koa-respond');
const logger = require('koa-logger');

const routes = require('./routes/index');

const app = new Koa();

app.use(logger());
app.use(BodyParser({
    onerror: (err, ctx) => {
      ctx.throw(422, 'body parse error');
    },
}));
app.use(respond());
app.use(routes);

app.listen(3000);