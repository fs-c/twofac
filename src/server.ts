import { config as configure } from 'dotenv';
configure();

import * as logger from 'debug';
const debug = logger('server');

import * as Koa from 'koa';
import { join } from 'path';

const app = new Koa();

app.proxy = true;
app.keys = [ process.env.SESSION_SECRET ];

import * as log from 'koa-logger';
app.use(log());

import * as compress from 'koa-compress';
app.use(compress());

import * as session from 'koa-session';
import * as bodyParser from 'koa-bodyparser';
app.use(bodyParser());
app.use(session({}, app));

import flash from './middleware/flash';
app.use(flash());

import passport from './auth';
app.use(passport.initialize());
app.use(passport.session());

import * as serve from 'koa-static';
app.use(serve(join(__dirname, '/public')));

import * as views from 'koa-views';
app.use(async (ctx, next) => {
  await views(
    join(__dirname, '/views'), {
      extension: 'ejs',
      options: {
        node: process.version,
        back: ctx.request.get('referer' || '/'),
        version: require('../package.json').version,
      },
    },
  )(ctx, next);
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    app.emit('error', err); // Preserve default behavior.

    ctx.status = ctx.status || 500;
    await ctx.render('status', {
      message: err.message,
    });
  }
});

import router from './router';
app.use(router.routes());
app.use(router.allowedMethods());

const port = parseInt(process.env.PORT, 10) || 8080;
export const server = app.listen(port);
debug('server listening on %o', port);

import * as mongoose from 'mongoose';

const { DB_URL, DB_PASS, DB_USER } = process.env;

if (DB_URL && DB_PASS && DB_USER) {
  mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_URL}`)
    .then(() => debug('connected to database'))
    .catch((err) => debug('database connection error: %O', err.message));
} else {
  throw new Error('Missing database connection parameters.');
}
