'use strict';

module.exports = {
  createTopicRequest: {
    name: { type: 'string', required: true, description: '名称', example: 'football' },
    avatar_url: { type: 'string', required: false, description: '图标', example: '' },
    introduction: { type: 'string', required: false, description: '简介', example: '简介' },
  },
};
