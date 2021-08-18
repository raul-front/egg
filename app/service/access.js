'use strict';

const Service = require('egg').Service;
const jwt = require('jsonwebtoken');

class AccessService extends Service {
  async login(payload) {
    const { ctx, service } = this;
    const user = await service.user.findByPhone(payload.phone);
    if (!user) {
      ctx.error(404, '该手机号用户不存在');
    }
    if (ctx.helper.crypto(payload.password) !== user.password) {
      ctx.error(423, '密码错误');
    }

    // 生成Token令牌
    const token = jwt.sign({
      id: user._id,
    }, this.config.jwt.secret, {
      expiresIn: this.config.jwt.expires,
    });

    return { token, user };
  }

  async logout() {
  }

  // 获取当前用户信息
  async current() {
    const { ctx, service } = this;
    const id = ctx.state.userId;
    const user = await service.user.find(id);
    return user;
  }
}

module.exports = AccessService;
