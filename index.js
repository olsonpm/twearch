'use strict';

module.exports = {
  getRequestListener: (...args) => require('./server').getApp(...args).callback()
};
