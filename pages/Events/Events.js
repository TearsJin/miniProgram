// pages/Events/Events.js
const bar = require('../../utils/bar.js')
const eventsUtils = require('../../utils/eventsUtils.js')

Page({



  /**
   * 页面的初始数据
   */
  data: {

  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bar.barInit(this);
    eventsUtils.eventsInit(this).then(res =>{
      this.setData({
        allEvents: res,
      })
    })
  },
})