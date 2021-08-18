'use strict';
const Controller = require('egg').Controller;
/**
 * @Controller 角色管理
 */
class RoleController extends Controller {
  async test() {
    const { service } = this;
    for (let i = 1; i <= 100; i++) {
      await service.role.create({
        name: 'role' + i,
        access: 'access' + (i < 50 ? '1' : '2'),
      });
    }
  }

  /**
   * @summary 获取角色列表
   * @description 获取角色信息(分页/模糊)  获取角色信息
   * @router get /roles
   * @request query integer *offset eg:0 开始位置，默认0
   * @request query integer *limit eg:10 单页数量，默认10
   * @request query string name 按名称搜索字符串
   * @request query boolean is_all eg:false 是否全部返回
   * @response 200 queryRoleResponse 角色列表
   */
  async index() {
    const { ctx, service } = this;
    ctx.result(await service.role.list(ctx.query));
  }

  /**
   * @summary 获取单个角色
   * @description 获取角色信息
   * @router get /roles/{id}
   * @request path string *id eg:1 角色id
   * @response 200 getRoleResponse 角色信息
   */
  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.role.show(id);
    ctx.result(res);
  }

  /**
   * @summary 创建角色
   * @description 创建角色
   * @router post /roles
   * @request body createRoleRequest *body
   * @response 200 createdResponse 创建成功
   */
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    ctx.validate(ctx.rule.createRoleRequest, payload);
    await service.role.create(payload);
    ctx.success();
  }

  /**
   * @summary 修改角色
   * @description 获取角色信息
   * @router put /roles
   * @request path string *id
   * @request body createRoleRequest *body
   * @response 200 updatedResponse 修改成功
   */
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    ctx.validate(ctx.rule.createRoleRequest, payload);
    await service.role.update(id, payload);
    ctx.success();
  }

  /**
   * @summary 删除单个角色
   * @description 删除单个角色
   * @router delete /roles/{id}
   * @request path string *id eg:1 角色id
   * @response 200 removedResponse 删除成功
   */
  async remove() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.role.remove(id);
    ctx.success();
  }

  /**
   * @summary 批量删除角色
   * @description 批量删除角色
   * @router delete /roles
   * @request body batchRemoveRequest *ids
   * @response 200 batchRemovedResponse 批量删除成功
   */
  async removes() {
    const { ctx, service } = this;
    const { ids } = ctx.request.body;
    const payload = ids.split(',') || [];
    await service.role.removes(payload);
    ctx.success();
  }
}

module.exports = RoleController;
