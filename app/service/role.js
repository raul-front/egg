'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  // common function
  async find(id) {
    const role = await this.ctx.model.Role.findById(id);
    if (!role) this.ctx.error(404, 'role not found');
    return role;
  }
  async findByName(value) {
    return await this.ctx.model.Role.findOne({ name: value });
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
      res = await ctx.model.Role.find(query).skip(offset).limit(limit)
        .sort({ createdAt: -1 })
        .exec();
    } else {
      res = await ctx.model.Role.find(query)
        .sort({ createdAt: -1 })
        .exec();
    }
    count = await ctx.model.Role.count(query).exec();

    return { count, items: res };
  }
  async show(id) {
    return await this.find(id);
  }
  async create(payload) {
    const { ctx } = this;
    const role = await this.findByName(payload.name);
    if (role) ctx.error(423, '该角色已存在');
    return await ctx.model.Role.create(payload);
  }
  async update(id, data) {
    const { ctx } = this;
    await this.find(id); // 检查是否存在
    return await ctx.model.Role.findByIdAndUpdate(id, data);
  }

  async remove(id) {
    const { ctx } = this;
    await this.find(id);
    // 不做存在判断时，不存在 findByIdAndRemove 任然返回true
    return await ctx.model.Role.findByIdAndRemove(id);
  }
  async removes(ids) {
    return await this.ctx.model.Role.remove({ _id: { $in: ids } });
  }
}

module.exports = RoleService;
