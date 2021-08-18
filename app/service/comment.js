'use strict';

const Service = require('egg').Service;

class CommentService extends Service {
  // common function
  async find(questionId, answerId, id) {
    const { ctx } = this;
    const comment = await ctx.model.Comment.findById(id).populate('commentator replyTo');
    if (!comment) ctx.error(404, '评论不存在');
    if (questionId && questionId !== comment.questionId.toString()) {
      ctx.error(404, '该问题下没有此评论');
    }
    if (answerId && answerId !== comment.answerId.toString()) {
      ctx.error(404, '该答案下没有此评论');
    }
    return comment;
  }

  // async checkCommentator(ctx, next) {
  //   const { comment } = ctx.state;
  //   if (comment.commentator.toString() !== ctx.state.user._id) { ctx.throw(403, '没有权限'); }
  //   await next();
  // }

  async list(payload) {
    const { ctx } = this;
    let { offset, limit, is_all, ...search } = payload;
    let res = [];
    let count = 0;
    offset = Number(offset) || 0;
    limit = Number(limit) || this.config.pageSize;
    is_all = Boolean(is_all);

    const query = {};
    if (search.name) {
      query.name = { $regex: search.name };
    }
    if (search.access) {
      query.access = search.access;
    }

    if (!is_all) {
      res = await ctx.model.Comment.find(query).skip(offset).limit(limit)
        .populate('commentator replyTo')
        .sort({ createdAt: -1 })
        .exec();
    } else {
      res = await ctx.model.Comment.find(query)
        .populate('commentator replyTo')
        .sort({ createdAt: -1 })
        .exec();
    }
    count = await ctx.model.Comment.count(query).exec();

    return { count, items: res };
  }
  async show(questionId, answerId, id) {
    const comment = await this.find(questionId, answerId, id);
    return comment;
  }
  async create(payload) {
    const { ctx } = this;
    return await ctx.model.Comment.create(payload);
  }
  async update(questionId, answerId, id, data) {
    const { ctx } = this;
    const comment = await this.find(questionId, answerId, id);
    if (comment.commentator.id.toString() !== ctx.state.userId) { ctx.error(403, '没有权限'); }
    return await ctx.model.Comment.findByIdAndUpdate(id, data);
  }
  async remove(questionId, answerId, id) {
    const { ctx } = this;
    const comment = await this.find(questionId, answerId, id);
    if (comment.commentator.id.toString() !== ctx.state.userId) { ctx.error(403, '没有权限'); }
    return await ctx.model.Comment.findByIdAndRemove(id);
  }

}

module.exports = CommentService;
