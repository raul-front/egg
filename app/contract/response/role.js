'use strict';

module.exports = {
  role: {
    _id: { type: 'string', description: 'id 唯一键' },
    name: { type: 'string', description: '角色名称' },
    access: { type: 'integer', description: '角色access' },
    createdAt: { type: 'string', description: '创建时间' },
  },
  queryRoleResponse: {
    count: { type: 'integer', description: '总数' },
    items: { type: 'array', itemType: 'role' },
  },
  getRoleResponse: {
    _id: { type: 'string', description: 'id 唯一键' },
    name: { type: 'string', description: '角色名称' },
    access: { type: 'integer', description: '角色access' },
    createdAt: { type: 'string', description: '创建时间' },
    updatedAt: { type: 'string', description: '修改时间' },
  },
};
