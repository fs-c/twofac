import * as Router from 'koa-router';

const router = new Router();
export default router;

type INext = () => Promise<any>;

export function ifLoggedOn(ctx: Router.IRouterContext, next: INext) {
  if (ctx.isAuthenticated()) {
    return next();
  } else {
    ctx.redirect('/login');
  }
}

export function redirectIfLoggedOn(
  ctx: Router.IRouterContext,
  next: INext,
) {
  if (ctx.isAuthenticated()) {
    ctx.redirect('/');
  } else {
    return next();
  }
}

import generate from './totp/generate';
router.get('/', async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    const codes: any = {};
    const { user } = ctx.state;

    for (const secret of user.sharedSecrets) {
      codes[secret.alias] = generate(secret.string);
    }

    await ctx.render('index', { user, codes});
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
