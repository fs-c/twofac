import * as Router from 'koa-router';
import * as passport from 'koa-passport';

import { ifLoggedOn, redirectIfLoggedOn } from '../router';

const router = new Router();
export default router;

const prefix = process.env.ROOT ? `/${process.env.ROOT}/` : '/';

router.get('/login', redirectIfLoggedOn, async (ctx, next) => {
  await ctx.render('public/login', { message: ctx.flash.get() });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: prefix,
  failureRedirect: prefix + 'login',
}));

router.get('/signup', redirectIfLoggedOn, async (ctx, next) => {
  await ctx.render('public/signup', { message: ctx.flash.get() });
});

router.post('/signup', async (ctx, next) => {
  const { password, second } = ctx.request.body;

  if (password !== second) {
    ctx.flash.set('Passwords did not match.');
    ctx.redirect(prefix + 'signup');
  }

  return await next();
}, passport.authenticate('local-signup', {
  successRedirect: prefix,
  failureRedirect: prefix + 'signup',
}));

router.get('/logout', ifLoggedOn, async (ctx, next) => {
  ctx.logout();
  ctx.redirect(prefix);
});
