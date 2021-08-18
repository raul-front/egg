'use strict';

const Service = require('egg').Service;

class TopicService extends Service {
  // common function
  async find(id) {
    const topic = await this.ctx.model.Topic.findById(id).select('+introduction');
    if (!topic) this.ctx.error(404, 'topic not found');
    return topic;
  }
  async findByName(value) {
    return await this.ctx.model.Topic.findOne({ name: value });
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
      res = await ctx.model.Topic.find(query).skip(offset).limit(limit)
        .select('+introduction')
        .sort({ createdAt: -1 })
        .exec();
    } else {
      res = await ctx.model.Topic.find(query)
        .select('+introduction')
        .sort({ createdAt: -1 })
        .exec();
    }
    count = await ctx.model.Topic.count(query).exec();

    return { count, items: res };
  }
  async show(id) {
    return await this.find(id);
  }
  async create(payload) {
    const { ctx } = this;
    const topic = await this.findByName(payload.name);
    if (topic) ctx.error(423, '该话题已存在');
    return await ctx.model.Topic.create(payload);
  }
  async update(id, data) {
    const { ctx } = this;
    await this.find(id); // 检查是否存在
    return await ctx.model.Topic.findByIdAndUpdate(id, data);
  }

  async listFollowers(id) {
    await this.find(id); // 检查是否存在
    const users = await this.ctx.model.User.find({ followingTopics: id });
    return users;
  }

  async listQuestions(id) {
    await this.find(id); // 检查是否存在
    const users = await this.ctx.model.Question.find({ topics: id });
    return users;
  }

}

module.exports = TopicService;
