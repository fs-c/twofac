import { config as configure } from 'dotenv';
configure();

import * as logger from 'debug';
const debug = logger('server');

import * as Koa from 'koa';
import { join } from 'path';

const app = new Koa();

let secret = process.env.SESSION_SECRET;
if (!secret) {
  debug('no session secret provided');

  secret = '';
}

app.proxy = true; // Trust first proxy.
app.keys = [secret];

// Dev-style request logging.
import * as log from 'koa-logger';
app.use(log());

// Gzip compression.
import * as compress from 'koa-compress';
app.use(compress());

// Persistent session data, request body parsing.
import * as session from 'koa-session';
import * as bodyParser from 'koa-bodyparser';
app.use(bodyParser());
app.use(session({}, app));

// Simple flash data functionality.
import flash from './middleware/flash';
app.use(flash());

// Serve static assets.
import * as mount from 'koa-mount';
import * as serve from 'koa-static';
app.use(mount(`/${process.env.ROOT}/`, serve(join(__dirname, '/public'))));

// Auth flow.
import passport from './auth';
app.use(passport.initialize());
app.use(passport.session());

// Render views, always pass some metadata.
import * as views from 'koa-views';
app.use(async (ctx, next) => {
  const protocol = process.env.PROTOCOL || 'https';

  await views(join(__dirname, '/views'), {
    extension: 'ejs',
    options: {
      node: process.version,
      back: ctx.request.get('referer') || '/',
      version: require('../package.json').version,
      base: `${protocol}://${ctx.host}/${process.env.ROOT || ''}`,
    },
  })(ctx, next);
});

// Convenience success status wrapper in the context.
app.use(async (ctx, next) => {
  ctx.success = async (data: any) => {
    let obj: any = { status: 'success' };

    if (typeof data === 'string') {
      obj.message = data;
    } else if (typeof data === 'object') {
      obj = Object.assign(obj, data); // Merge objects.
    } else {
      obj = data;
    }

    return await ctx.render('status', obj);
  };

  await next();
});

// Handle errors.
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

// All app routes.
import router from './router';
app.use(router.routes());
app.use(router.allowedMethods());

// Start server.
const port = parseInt(process.env.PORT || '8080', 10);
export const server = app.listen(port);
debug('server listening on %o', port);

const { DB_URL, DB_PASS, DB_USER } = process.env;
if (!(DB_URL && DB_PASS && DB_USER)) {
  throw new Error('Missing database connection parameters.');
}

// Connect to database.
import * as mongoose from 'mongoose';

mongoose
  .connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_URL}`)
  .then(() => debug('connected to database'))
  .catch((err) => debug('database connection error: %O', err.message));
