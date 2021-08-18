'use strict';

module.exports = {
  createUserRequest: {
    phone: { type: 'string', required: true, description: '手机号', example: '18919015125', format: /^1[34578]\d{9}$/ },
    password: { type: 'string', required: true, description: '密码', example: '123456' },
    name: { type: 'string', required: true, description: '姓名', example: 'Raul' },
  },
  updateUserRequest: {
    password: { type: 'string', required: false, description: '密码', example: '123456' },
    name: { type: 'string', required: false, description: '姓名', example: 'Raul' },
    phone: { type: 'string', required: false, description: '手机号', example: '18919015125', format: /^1[34578]\d{9}$/ },
    avatar_url: { type: 'string', required: false },
    gender: { type: 'string', required: false },
    headline: { type: 'string', required: false },
    locations: { type: 'array', itemType: 'string', required: false },
    business: { type: 'string', required: false },
    employments: { type: 'array', itemType: 'object', required: false },
    educations: { type: 'array', itemType: 'object', required: false },
  },
};
