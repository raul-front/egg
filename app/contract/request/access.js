'use strict';

module.exports = {
  loginRequest: {
    phone: { type: 'string', required: true, description: '手机号', example: '18919015125', format: /^1[34578]\d{9}$/ },
    password: { type: 'string', required: true, description: '密码', example: '123456' },
  },
};
