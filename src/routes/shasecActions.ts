import * as Router from 'koa-router';

import { ifLoggedOn } from '../router';
import generate from '../totp/generate';
import { User, SharedSecret } from '../models/User';

const router = new Router();
export default router;

router.post('/generate', async (ctx, next) => {
  const { sharedSecret } = ctx.request.body;

  if (!sharedSecret) {
    return ctx.throw(new Error('No shared secret provided.'));
  }

  const code = generate(sharedSecret);

  return await ctx.render('status', {
    status: 'success',
    message: 'Generated code: ' + code,
  });
});

router.post('/add', ifLoggedOn, async (ctx, next) => {
  const { alias, sharedSecret } = ctx.request.body;

  if (!alias || !sharedSecret) {
    return ctx.throw(new Error('Missing parameter(s).'));
  }

  const { user } = ctx.state;

  for (const secret of user.sharedSecrets) {
    if (secret.alias === alias) {
      return ctx.throw(new Error('Aliases must be unique.'));
    }
  }

  user.sharedSecrets.push(new SharedSecret({ alias, string: sharedSecret }));
  await user.save();

  await ctx.render('status', { status: 'success', message: 'Added shasec.' });
});

router.get('/delete/:alias', ifLoggedOn, async (ctx, next) => {
  const { user } = ctx.state;
  const { alias } = ctx.params;

  for (const secret of user.sharedSecrets) {
    if (secret.alias === alias) {
      secret.remove();
      await user.save();
      return await ctx.render('status', {
        status: 'success',
        message: 'Removed secret',
      });
    }
  }

  ctx.throw(new Error('Alias not found.'));
});
