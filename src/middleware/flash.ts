import { Context } from 'koa';
import * as logger from 'debug';

const debug = logger('flash');

export default function flash() {
  return (ctx: Context, next: () => Promise<any>) => {
    if (!ctx.session) {
        debug('session object does not exist');

        return next();
    }

    const prev = ctx.session.flash;

    if (prev) {
      debug('message found %j', prev);
      ctx.session.flash = null;
    } else {
      debug('no message found');
    }

    ctx.flash = {
      get: () => prev,
      set: (data: any) => ctx.session ? ctx.session.flash = data : null,
    };

    return next();
  };
}
