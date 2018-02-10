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

router.get('/', async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    await ctx.render('index');
  } else {
    await ctx.render('public');
  }
});

import userActions from './routes/userActions';
router.use(userActions.routes());
router.use(userActions.allowedMethods());
