'use strict';

module.exports = {
  createAnswerRequest: {
    content: { type: 'string', required: true, description: '内容', example: '' },
  },
  updateAnswerRequest: {
    title: { type: 'string', required: false, description: '内容', example: '' },
  },
};
