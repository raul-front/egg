'use strict';
const Controller = require('egg').Controller;

class AnswerController extends Controller {
  /**
   * @summary 获取
   */
  async index() {
    const { ctx, service } = this;
    ctx.result(await service.answer.list(ctx.query));
  }

  /**
   * @summary 获取单个
   */
  async show() {
    const { ctx, service } = this;
    const { questionId, id } = ctx.params;
    const res = await service.answer.show(questionId, id);
    ctx.result(res);
  }

  /**
   * @summary 创建
   */
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    payload.questionId = ctx.params.questionId;
    ctx.validate(ctx.rule.createAnswerRequest, payload);
    await service.answer.create(payload);
    ctx.success();
  }

  /**
   * @summary 修改
   */
  async update() {
    const { ctx, service } = this;
    const { questionId, id } = ctx.params;
    const payload = ctx.request.body || {};
    ctx.validate(ctx.rule.updateAnswerRequest, payload);
    await service.answer.update(questionId, id, payload);
    ctx.success();
  }

  /**
   * @summary 删除
   */
  async remove() {
    const { ctx, service } = this;
    const { questionId, id } = ctx.params;
    await service.answer.remove(questionId, id);
    ctx.success();
  }

}

module.exports = AnswerController;
