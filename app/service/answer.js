'use strict';

const Service = require('egg').Service;

class AnswerService extends Service {
  // common function
  async find(id) {
    const answer = await this.ctx.model.Answer.findById(id).select('+question').populate('answerer');
    if (!answer) this.ctx.error(404, 'answer not found');
    return answer;
  }
  async checkAnswerExist(questionId, id) {
    const { ctx } = this;
    const answer = await ctx.model.Answer.findById(id).select('+answerer');
    if (!answer) ctx.error(404, '答案不存在');
    // 只有删改查答案时候检查此逻辑，赞、踩答案时候不检查
    if (questionId && questionId !== answer.questionId) {
      ctx.throw(404, '该问题下没有此答案');
    }
    ctx.state.answer = answer;
  }

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
      res = await ctx.model.Answer.find(query).skip(offset).limit(limit)
        .select('+description')
        .sort({ createdAt: -1 })
        .exec();
    } else {
      res = await ctx.model.Answer.find(query)
        .select('+description')
        .sort({ createdAt: -1 })
        .exec();
    }
    count = await ctx.model.Answer.count(query).exec();

    return { count, items: res };
  }
  async show(questionId, id) {
    const answer = await this.find(id);
    if (questionId && questionId !== answer.questionId) {
      this.ctx.throw(404, '该问题下没有此答案');
    }
    return answer;
  }
  async create(payload) {
    const { ctx } = this;
    payload.answerer = ctx.state.userId;
    return await ctx.model.Answer.create(payload);
  }
  async update(questionId, id, data) {
    const { ctx } = this;
    await this.checkAnswerExist(questionId, id);
    return await ctx.model.Answer.findByIdAndUpdate(id, data);
  }
  async remove(questionId, id) {
    const { ctx } = this;
    await this.checkAnswerExist(questionId, id);
    return await ctx.model.Answer.findByIdAndRemove(id);
  }

}

module.exports = AnswerService;
