import * as Router from 'koa-router';

import { ifLoggedOn } from '../router';
import generate from '../totp/generate';

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
