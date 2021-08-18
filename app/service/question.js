'use strict';

const Service = require('egg').Service;

class QuestionService extends Service {
  // common function
  async find(id) {
    const question = await this.ctx.model.Question.findById(id).select('+description').populate('questioner topics');
    if (!question) this.ctx.error(404, 'question not found');
    return question;
  }
  async findByTitle(value) {
    return await this.ctx.model.Question.findOne({ title: value });
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
      query.name = { $regex: search.name }; // 模糊匹配
    }
    if (search.access) {
      query.access = search.access;
    }

    if (!is_all) {
      res = await ctx.model.Question.find(query).skip(offset).limit(limit)
        .select('+description')
        .sort({ createdAt: -1 })
        .exec();
    } else {
      res = await ctx.model.Question.find(query)
        .select('+description')
        .sort({ createdAt: -1 })
        .exec();
    }
    count = await ctx.model.Question.count(query).exec();

    return { count, items: res };
  }
  async show(id) {
    return await this.find(id);
  }
  async create(payload) {
    const { ctx } = this;
    const question = await this.findByTitle(payload.title);
    if (question) ctx.error(423, '该问题已存在');
    payload.questioner = ctx.state.userId;
    return await ctx.model.Question.create(payload);
  }
  async update(id, data) {
    const { ctx } = this;
    await this.find(id); // 检查是否存在
    return await ctx.model.Question.findByIdAndUpdate(id, data);
  }
  async remove(id) {
    const { ctx } = this;
    await this.find(id);
    return await ctx.model.Question.findByIdAndRemove(id);
  }

}

module.exports = QuestionService;
