/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1598924968259_1043';

  config.pageSize = 10;

  config.security = {
    csrf: false,
  };
  config.bodyParser = {
    jsonLimit: '1mb', // 默认 100kb
    formLimit: '1mb',
  };

  config.jwt = {
    secret: 'jsonwebtoken_secret',
    expires: '10h', // 有效时间
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/zhihu-api',
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  };

  // 接口文档地址：http://localhost:7001/swagger-ui.html#/
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: '我的egg项目接⼝',
      description: '我的egg项目接⼝ swagger-ui for egg',
      version: '1.0.0',
    },
    schemes: [ 'http', 'https' ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    enableSecurity: false,
    enableValidate: true, // 当前版本不支持校验
    routerMap: false, // 会根据controller中的注释信息自动生成路由
    enable: true,
  };

  // add your middleware config here
  config.middleware = [
    'errorHandler',
    'notfoundHandler',
    'auth',
  ];
  // 只对 /api 前缀的 url 路径生效
  // config.errorHandler = {
  //   // match: '/api',
  // };
  config.auth = {
    match: '/api',
    // ignore: [ '/login', '/swagger-ui.html' ],
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
