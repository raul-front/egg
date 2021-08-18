'use strict';

const moment = require('moment');
const crypto = require('crypto');

/**
 * 函数中有以下变量：
 * this 是 helper 对象，在其中可以调用其他 helper 方法
 * this.ctx => context 对象
 * this.app => application 对象
 */

module.exports = {
  formatMonth: t => (t ? moment(t).format('YYYY-MM') : ''),
  formatDate: t => (t ? moment(t).format('YYYY-MM-DD') : ''),
  formatMinute: t => (t ? moment(t).format('YYYY-MM-DD HH:mm') : ''),
  formatSecond: t => (t ? moment(t).format('YYYY-MM-DD HH:mm:ss') : ''),

  crypto: data => crypto.createHmac('sha256', 'secret').update(data).digest('hex'),

  copy: data => JSON.parse(JSON.stringify(data)),

  // 排序
  sortJson(arr, key, order = 'asc') {
    if (order === 'asc') {
      return arr.sort((a, b) => {
        return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
      });
    }
    return arr.sort((a, b) => {
      return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0;
    });

  },

  // 保留小数位数，结果为字符串
  // 与formatFloat()不同的是，结果为字符串，保留了末尾的0
  formatDecimals(value, decimals = 2) {
    value = parseFloat(value);
    if (Number.isNaN(value)) {
      value = 0;
    }
    return value.toFixed(decimals);
  },
  // 最多保留decimals位小数，末尾四舍五入，parseFloat显示时，末尾的0不会显示，如：'33.596' 转换为 33.6
  // toFixed保留位数时会四舍五入，返回结果为字符串
  // parseFloat()处理toFixed()结果只是取消了末尾的0
  formatFloat(value, decimals = 2) {
    value = parseFloat(value);
    if (Number.isNaN(value)) {
      value = 0;
    }
    return parseFloat(value.toFixed(decimals));
  },
  formatInt(value) {
    value = parseInt(value);
    if (Number.isNaN(value)) {
      value = 0;
    }
    return value;
  },

  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },

  // 获取mongo查询参数
  getListQueryForMongo(search, allowFields = []) {
    console.log(search, allowFields);
  },
};
