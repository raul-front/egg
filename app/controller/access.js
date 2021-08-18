'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller 登录/注册
 */
class AccessController extends Controller {
  /**
   * @summary 用户登入
   * @description 用户登入
   * @router post /login
   * @request body loginRequest *body
   * @response 200 loginResponse 登录成功
   */
  async login() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    ctx.validate(ctx.rule.loginRequest, payload);
    const res = await service.access.login(payload);
    ctx.result(res);
  }

  /**
   * @summary 用户登出
   * @description 用户登出
   * @router post /logout
   * @response 200 successResponse 登出成功
   */
  async logout() {
    const { ctx, service } = this;
    await service.access.logout();
    ctx.success();
  }
}

module.exports = AccessController;
