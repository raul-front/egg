'use strict';

module.exports = {
  user: {
    _id: { type: 'string', description: 'id 唯一键' },
    phone: { type: 'string', description: '手机' },
    name: { type: 'string', description: '用户姓名' },
    avatar: { type: 'string', description: '头像' },
  },
  queryUserResponse: {
    count: { type: 'integer', description: '总数' },
    items: { type: 'array', itemType: 'user' },
  },
  getUserResponse: {
    id: { type: 'string', description: 'id 唯一键' },
    phone: { type: 'string', description: '手机' },
    name: { type: 'string', description: '用户姓名' },
    avatar: { type: 'string', description: '头像' },
    createdAt: { type: 'string', description: '创建时间' },
    updatedAt: { type: 'string', description: '修改时间' },
  },

  // loginResponse: {
  //   _id: { type: 'string', description: 'id 唯一键' },
  //   phone: { type: 'string', description: '手机' },
  //   name: { type: 'string', description: '用户姓名' },
  //   avatar: { type: 'string', description: '头像' },
  //   token: { type: 'string', description: 'Token' },
  // },
};
