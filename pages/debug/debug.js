// pages/debug.js
const subscribeUtil = require('../../utils/subscribe').subscribeUtil
Page({
  onLoad: function (options) {
    subscribeUtil.subscribeInit(this)

  }, 
})