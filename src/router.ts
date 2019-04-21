import * as Router from 'koa-router';

const router = new Router();
export default router;

type INext = () => Promise<any>;

// TODO: With an empty root this will produce /// which works on most servers
// but it's suboptimal.
const prefix = process.env.ROOT ? `/${process.env.ROOT}/` : '/';
router.prefix(prefix);

// Redirect to login if not logged in, otherwise allow.
export function ifLoggedOn(ctx: Router.IRouterContext, next: INext) {
  if (ctx.isAuthenticated()) {
    return next();
  } else {
    ctx.redirect(prefix + 'login');
  }
}

// Redirect to root if logged on.
export function redirectIfLoggedOn(ctx: Router.IRouterContext, next: INext) {
  if (ctx.isAuthenticated()) {
    ctx.redirect(prefix);
  } else {
    return next();
  }
}

import generate from './totp/generate';
router.get('/', async (ctx, next) => {
  // Render public index if not logged on,
  // generate codes and render private one otherwise.
  if (ctx.isAuthenticated()) {
    const codes: any = {};
    const { user } = ctx.state;

    for (const secret of user.sharedSecrets) {
      codes[secret.alias] = generate(secret.string);
    }

    await ctx.render('index', { user, codes });
  } else {
    await ctx.render('public');
  }
});

import userActions from './routes/userActions';
router.use(userActions.routes());
router.use(userActions.allowedMethods());

import shasecActions from './routes/shasecActions';
router.use('/secret', shasecActions.routes());
router.use('/secret', shasecActions.allowedMethods());
