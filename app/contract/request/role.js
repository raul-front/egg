'use strict';

module.exports = {
  createRoleRequest: {
    name: { type: 'string', required: true, description: '角色名称', example: '普通用户' },
    access: { type: 'string', required: false, description: '角色access', example: 'access' },
  },
};
