'use strict';
const Controller = require('egg').Controller;

class topicController extends Controller {
  /**
   * @summary 获取
   */
  async index() {
    const { ctx, service } = this;
    ctx.result(await service.topic.list(ctx.query));
  }

  /**
   * @summary 获取单个
   */
  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.topic.show(id);
    ctx.result(res);
  }

  /**
   * @summary 创建
   */
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    ctx.validate(ctx.rule.createTopicRequest, payload);
    await service.topic.create(payload);
    ctx.success();
  }

  /**
   * @summary 修改
   */
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    ctx.validate(ctx.rule.createTopicRequest, payload);
    await service.topic.update(id, payload);
    ctx.success();
  }

  /**
   * @summary 获取话题粉丝列表
   */
  async listFollowers() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.topic.listFollowers(id);
    ctx.result(res);
  }

  /**
   * @summary 获取话题的问题列表
   */
  async listQuestions() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.topic.listQuestions(id);
    ctx.result(res);
  }

}

module.exports = topicController;
