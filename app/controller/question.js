'use strict';
const Controller = require('egg').Controller;

class QuestionController extends Controller {
  /**
   * @summary 获取
   */
  async index() {
    const { ctx, service } = this;
    ctx.result(await service.question.list(ctx.query));
  }

  /**
   * @summary 获取单个
   */
  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.question.show(id);
    ctx.result(res);
  }

  /**
   * @summary 创建
   */
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    ctx.validate(ctx.rule.createQuestionRequest, payload);
    await service.question.create(payload);
    ctx.success();
  }

  /**
   * @summary 修改
   */
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    ctx.validate(ctx.rule.updateQuestionRequest, payload);
    await service.question.update(id, payload);
    ctx.success();
  }

  /**
   * @summary 删除
   */
  async remove() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.question.remove(id);
    ctx.success();
  }

}

module.exports = QuestionController;
