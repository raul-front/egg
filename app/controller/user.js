'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller 用户管理
 */
class UserController extends Controller {
  /**
   * @summary 获取用户列表
   * @description 获取用户信息(分页/模糊)  获取用户信息
   * @router get /users
   * @request query integer *offset eg:0 开始位置，默认0
   * @request query integer *limit eg:10 单页数量，默认10
   * @request query string name 按名称搜索字符串
   * @request query string phone 按手机号搜索
   * @request query boolean is_all eg:false 是否全部返回
   * @response 200 queryUserResponse 用户列表
   */
  async index() {
    const { ctx, service } = this;
    const payload = ctx.query;
    const res = await service.user.list(payload);
    ctx.result(res);
  }

  /**
   * @summary 获取单个用户
   * @description 获取用户信息
   * @router get /users/{id}
   * @request path string *id eg:1 用户id
   * @response 200 getUserResponse 用户信息
   */
  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.user.show(id);
    ctx.result(res);
  }

  /**
   * @summary 创建用户
   * @description 创建用户
   * @router post /users
   * @request body createUserRequest *body
   * @response 200 createdResponse 创建成功
   */
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    ctx.validate(ctx.rule.createUserRequest, payload);
    await service.user.create(payload);
    ctx.success();
  }

  /**
   * @summary 修改用户
   * @description 获取用户信息
   * @router put /users
   * @request path string *id
   * @request body createUserRequest *body
   * @response 200 updatedResponse 修改成功
   */
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    ctx.validate(ctx.rule.updateUserRequest, payload);
    await service.user.update(id, payload);
    ctx.success();
  }

  /**
   * @summary 删除单个用户
   * @description 删除单个用户
   * @router delete /users/{id}
   * @request path string *id eg:1 用户ID
   * @response 200 removedResponse 创建成功
   */
  async remove() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.user.remove(id);
    ctx.success();
  }

  /**
   * @summary 批量删除角色
   * @description 批量删除角色
   * @router delete /users
   * @request body batchRemoveRequest *ids
   * @response 200 batchRemovedResponse 批量删除成功
   */
  async removes() {
    const { ctx, service } = this;
    const { ids } = ctx.request.body;
    const payload = ids.split(',') || [];
    await service.user.removes(payload);
    ctx.success();
  }

  /**
   * @summary 关注
   */
  async following() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.user.following(id);
    ctx.success();
  }
  /**
   * @summary 取消关注
   */
  async unfollowing() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.user.unfollowing(id);
    ctx.success();
  }
  /**
   * @summary 获取某用户关注人列表
   */
  async listFollowing() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.user.listFollowing(id);
    ctx.result(res);
  }
  /**
   * @summary 获取某用户粉丝列表
   */
  async listFollowers() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.user.listFollowers(id);
    ctx.result(res);
  }

  /**
   * @summary 关注的话题列表
   */
  async listFollowingTopics() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.user.listFollowingTopics(id);
    ctx.result(res);
  }
  /**
   * @summary 关注话题
   */
  async followTopics() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.user.followTopics(id);
    ctx.success();
  }
  /**
   * @summary 取消关注话题
   */
  async unFollowTopics() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.user.unFollowTopics(id);
    ctx.success();
  }

  /**
   * @summary 获取用户问题列表
   */
  async listQuestions() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.user.listQuestions(id);
    ctx.result(res);
  }

  /**
   * @summary 获取某用户点赞的答案
   */
  async listLikingAnswers() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.user.listLikingAnswers(id);
    ctx.result(res);
  }
  /**
   * @summary 点赞答案
   */
  async likeAnswer() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.user.likeAnswer(id);
    ctx.success();
  }
  /**
   * @summary 取消点赞答案
   */
  async unlikeAnswer() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.user.unlikeAnswer(id);
    ctx.success();
  }
  /**
   * @summary 获取某用户踩的答案
   */
  async listDislikingAnswers() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.user.listDislikingAnswers(id);
    ctx.result(res);
  }
  /**
   * @summary 踩答案
   */
  async dislikeAnswer() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.user.dislikeAnswer(id);
    ctx.success();
  }
  /**
   * @summary 取消踩答案
   */
  async undislikeAnswer() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.user.undislikeAnswer(id);
    ctx.success();
  }

  /**
   * @summary 获取某用户踩的答案
   */
  async listCollectingAnswers() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.user.listCollectingAnswers(id);
    ctx.result(res);
  }
  /**
   * @summary 踩答案
   */
  async collectAnswer() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.user.collectAnswer(id);
    ctx.success();
  }
  /**
   * @summary 取消踩答案
   */
  async uncollectAnswer() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.user.uncollectAnswer(id);
    ctx.success();
  }

}

module.exports = UserController;
