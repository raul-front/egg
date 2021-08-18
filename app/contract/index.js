'use strict';

module.exports = {
  // 检查path中的id
  checkIdRequest: {
    id: { type: 'string', description: 'id 唯一键', required: true, example: '1' },
  },
  // 获取列表数据请求
  listRequest: {
  },
  // 批量删除的请求
  batchRemoveRequest: {
    ids: { type: 'string', description: 'id连接的字符串', required: true, example: '1,2,3' },
  },


  errorResponse: {
    code: { type: 'integer', required: true, example: -1 },
    message: { type: 'string', example: '错误信息' },
  },
  successResponse: {
    code: { type: 'integer', required: true, example: 0 },
    message: { type: 'string', required: true, example: 'ok' },
  },
  createdResponse: {
    code: { type: 'integer', required: true, example: 0 },
    message: { type: 'string', required: true, example: 'ok' },
  },
  updatedResponse: {
    code: { type: 'integer', required: true, example: 0 },
    message: { type: 'string', required: true, example: 'ok' },
  },
  removedResponse: {
    code: { type: 'integer', required: true, example: 0 },
    message: { type: 'string', required: true, example: 'ok' },
  },
  batchRemovedResponse: {
    code: { type: 'integer', required: true, example: 0 },
    message: { type: 'string', required: true, example: 'ok' },
  },

};
