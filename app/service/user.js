'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // common function
  async find(id) {
    const populateStr = 'locations business employments.company employments.job educations.school educations.major';
    const user = await this.ctx.model.User.findById(id)
      .select('+employments+educations')
      .populate(populateStr);
    if (!user) this.ctx.error(404, 'user not found');
    return user;
  }
  async findByPhone(value) {
    return await this.ctx.model.User.findOne({ phone: value }).select('+password');
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
    if (search.phone) {
      query.phone = { $regex: search.phone };
    }
    if (search.name) {
      query.name = { $regex: search.name };
    }

    if (!is_all) {
      res = await ctx.model.User.find(query).skip(offset).limit(limit)
        .sort({ createdAt: -1 })
        .exec();
    } else {
      res = await ctx.model.User.find(query)
        .sort({ createdAt: -1 })
        .exec();
    }
    count = await ctx.model.User.count(query).exec();

    return { count, items: res };
  }
  async show(id) {
    return await this.find(id);
  }

  async create(payload) {
    const { ctx } = this;
    const user = await this.findByPhone(payload.phone);
    if (user) ctx.error(409, '用户名已存在');
    payload.password = ctx.helper.crypto(payload.password);
    return await ctx.model.User.create(payload);
  }

  async update(id, payload) {
    const { ctx } = this;
    await this.find(id);
    return await ctx.model.User.findByIdAndUpdate(id, payload);
  }
  async remove(id) {
    const { ctx } = this;
    await this.find(id);
    return await ctx.model.User.findByIdAndRemove(id);
  }
  async removes(payload) {
    return this.ctx.model.User.remove({ _id: { $in: payload } });
  }

  // 关注
  async following(id) {
    const { ctx } = this;
    const userId = ctx.state.userId;
    const me = await ctx.model.User.findById(userId).select('+following');
    if (!me) ctx.error(404, 'user not found');
    if (!me.following.map(id => id.toString()).includes(id)) {
      me.following.push(id);
      await ctx.model.User.findByIdAndUpdate(userId, { following: me.following });
    }
  }
  // 取消关注
  async unfollowing(id) {
    const { ctx } = this;
    const userId = ctx.state.userId;
    const me = await ctx.model.User.findById(userId).select('+following');
    if (!me) ctx.error(404, 'user not found');
    const index = me.following.map(id => id.toString()).indexOf(id);
    if (index > -1) {
      me.following.splice(index, 1);
      await ctx.model.User.findByIdAndUpdate(userId, { following: me.following });
    }
  }
  // 获取关注人列表
  async listFollowing(id) {
    const user = await this.ctx.model.User.findById(id).select('+following').populate('following');
    if (!user) this.ctx.error(404, 'user not found');
    return user.following;
  }
  // 获取粉丝列表
  async listFollowers(id) {
    const users = await this.ctx.model.User.find({ following: id });
    return users;
  }

  // 关注话题列表
  async listFollowingTopics(id) {
    const { ctx } = this;
    const user = await this.ctx.model.User.findById(id).select('+followingTopics').populate('followingTopics');
    if (!user) ctx.error(404, 'user not found');
    return user.followingTopics;
  }
  // 关注话题
  async followTopics(id) {
    const { ctx } = this;
    const userId = ctx.state.userId;
    const me = await ctx.model.User.findById(userId).select('+followingTopics');
    if (!me) ctx.error(404, 'user not found');
    if (!me.followingTopics.map(id => id.toString()).includes(id)) {
      me.followingTopics.push(id);
      await ctx.model.User.findByIdAndUpdate(userId, { followingTopics: me.followingTopics });
    }
  }
  // 取消关注话题
  async unFollowTopics(id) {
    const { ctx } = this;
    const userId = ctx.state.userId;
    const me = await ctx.model.User.findById(userId).select('+followingTopics');
    if (!me) ctx.error(404, 'user not found');
    const index = me.followingTopics.map(id => id.toString()).indexOf(id);
    if (index > -1) {
      me.followingTopics.splice(index, 1);
      await ctx.model.User.findByIdAndUpdate(userId, { followingTopics: me.followingTopics });
    }
  }

  // 获取用户问题列表
  async listQuestions(id) {
    const questions = await this.ctx.model.Question.find({ questioner: id });
    return questions;
  }

  // 用户点赞答案的列表
  async listLikingAnswers(id) {
    const { ctx } = this;
    const user = await ctx.model.User.findById(id).select('+likingAnswers').populate('likingAnswers');
    if (!user) ctx.error(404, '用户不存在');
    return user.likingAnswers;
  }
  // 点赞
  async likeAnswer(id) {
    const { ctx } = this;
    const userId = ctx.state.userId;
    const me = await ctx.model.User.findById(userId).select('+likingAnswers');
    if (!me.likingAnswers.map(id => id.toString()).includes(id)) {
      me.likingAnswers.push(id);
      await ctx.model.User.findByIdAndUpdate(userId, { likingAnswers: me.likingAnswers });
      // 每次点赞时，voteCount + 1
      await ctx.model.Answer.findByIdAndUpdate(ctx.params.id, { $inc: { voteCount: 1 } });
    }
    // await next();
    // 需要取消踩
    await this.undislikeAnswer(id);
  }
  // 取消点赞
  async unlikeAnswer(id) {
    const { ctx } = this;
    const userId = ctx.state.userId;
    const me = await ctx.model.User.findById(userId).select('+likingAnswers');
    const index = me.likingAnswers.map(id => id.toString()).indexOf(id);
    if (index > -1) {
      me.likingAnswers.splice(index, 1);
      await ctx.model.User.findByIdAndUpdate(userId, { likingAnswers: me.likingAnswers });
      // 取消点赞时，voteCount - 1
      await ctx.model.Answer.findByIdAndUpdate(id, { $inc: { voteCount: 1 } });
    }
    return 'ok';
  }
  // 某用户踩列表
  async listDislikingAnswers(id) {
    const { ctx } = this;
    const user = await ctx.model.User.findById(id).select('+dislikingAnswers').populate('dislikingAnswers');
    if (!user) ctx.error(404, '用户不存在');
    return user.dislikingAnswers;
  }
  // 踩操作
  async dislikeAnswer(id) {
    const { ctx } = this;
    const userId = ctx.state.userId;
    const me = await ctx.model.User.findById(userId).select('+dislikingAnswers');
    if (!me.dislikingAnswers.map(id => id.toString()).includes(id)) {
      me.dislikingAnswers.push(id);
      await ctx.model.User.findByIdAndUpdate(userId, { dislikingAnswers: me.dislikingAnswers });
    }
    // await next();
    // 需要取消点赞
    await this.unlikeAnswer(id);
  }
  // 取消踩操作
  async undislikeAnswer(id) {
    const { ctx } = this;
    const userId = ctx.state.userId;
    const me = await ctx.model.User.findById(userId).select('+dislikingAnswers');
    const index = me.dislikingAnswers.map(id => id.toString()).indexOf(id);
    if (index > -1) {
      me.dislikingAnswers.splice(index, 1);
      await ctx.model.User.findByIdAndUpdate(userId, { dislikingAnswers: me.dislikingAnswers });
    }
  }

  // 某用户收藏的答案列表
  async listCollectingAnswers(id) {
    const { ctx } = this;
    const user = await ctx.model.User.findById(id).select('+collectingAnswers').populate('collectingAnswers');
    if (!user) ctx.error(404, '用户不存在');
    return user.collectingAnswers;
  }
  // 收藏答案操作
  async collectAnswer(id) {
    const { ctx } = this;
    const userId = ctx.state.userId;
    const me = await ctx.model.User.findById(userId).select('+collectingAnswers');
    if (!me.collectingAnswers.map(id => id.toString()).includes(id)) {
      me.collectingAnswers.push(id);
      await ctx.model.User.findByIdAndUpdate(userId, { collectingAnswers: me.collectingAnswers });
    }
  }
  // 取消收藏答案操作
  async uncollectAnswer(id) {
    const { ctx } = this;
    const userId = ctx.state.userId;
    const me = await ctx.model.User.findById(userId).select('+collectingAnswers');
    const index = me.collectingAnswers.map(id => id.toString()).indexOf(id);
    if (index > -1) {
      me.collectingAnswers.splice(index, 1);
      await ctx.model.User.findByIdAndUpdate(userId, { collectingAnswers: me.collectingAnswers });
    }
  }


}

module.exports = UserService;
