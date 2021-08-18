'use strict';

module.exports = {
  createQuestionRequest: {
    title: { type: 'string', required: true, description: '标题', example: '' },
    description: { type: 'string', required: true, description: '描述', example: '' },
  },
  updateQuestionRequest: {
    title: { type: 'string', required: false, description: '标题', example: '' },
    description: { type: 'string', required: false, description: '描述', example: '' },
  },
};
