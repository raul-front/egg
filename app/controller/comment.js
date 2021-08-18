'use strict';
const Controller = require('egg').Controller;

class CommentController extends Controller {
  /**
   * @summary 获取
   */
  async index() {
    const { ctx, service } = this;
    ctx.result(await service.comment.list(ctx.query));
  }

  /**
   * @summary 获取单个
   */
  async show() {
    const { ctx, service } = this;
    const { questionId, answerId, id } = ctx.params;
    const res = await service.comment.show(questionId, answerId, id);
    ctx.result(res);
  }

  /**
   * @summary 创建
   */
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    ctx.validate({
      content: { type: 'string', required: true },
      rootCommentId: { type: 'string', required: false },
      replyTo: { type: 'string', required: false },
    }, payload);
    const { questionId, answerId } = ctx.params;
    const commentator = ctx.state.userId;
    await service.comment.create({ ...payload, questionId, answerId, commentator });
    ctx.success();
  }

  /**
   * @summary 修改
   */
  async update() {
    const { ctx, service } = this;
    const { questionId, answerId, id } = ctx.params;
    const payload = ctx.request.body || {};
    ctx.validate({
      content: { type: 'string', required: false },
    }, payload);
    await service.comment.update(questionId, answerId, id, payload);
    ctx.success();
  }

  /**
   * @summary 删除
   */
  async remove() {
    const { ctx, service } = this;
    const { questionId, answerId, id } = ctx.params;
    await service.comment.remove(questionId, answerId, id);
    ctx.success();
  }

}

module.exports = CommentController;
