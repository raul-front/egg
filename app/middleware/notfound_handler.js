'use strict';

module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      ctx.status = 404; // 这里不设置时后变成 200, 所以在error_handle中捕获不到404，需要在这里单独处理
      ctx.body = {
        code: -1,
        message: 'Not Found',
      };
    }
  };
};
