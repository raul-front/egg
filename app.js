'use strict';
module.exports = app => {
  app.beforeStart(async () => {
    console.log('========Init Data=========');
    const ctx = app.createAnonymousContext();
    // await ctx.model.User.dropCollection();
    // 创建初始化数据
    const user = await ctx.service.user.findByPhone('18919015125');
    if (!user) {
      await ctx.service.user.create({
        phone: '18919015125',
        password: '123456',
        name: 'raul',
      });
    }
  });
  // app.once('server', server => {
  //   // websocket
  // });
  // app.on('error', (err, ctx) => {
  //   // report error
  // });
  // app.on('request', ctx => {
  //   // log receive request
  // });
  // app.on('response', ctx => {
  //   // ctx.starttime is set by framework
  //   const used = Date.now() - ctx.starttime;
  //   // log total cost
  // });
};
