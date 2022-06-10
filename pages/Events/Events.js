// pages/Events/Events.js
const bar = require('../../utils/bar.js')
const eventsUtils = require('../../utils/eventsUtils.js')
import {
  zFill
} from '../../utils/util'
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
      // 需要做一些处理
      for (let i = 0; i < res.length; i++) {
        res[i].startTimeH = zFill(String(res[i].startTimeH), 2)
        res[i].startTimeM = zFill(String(res[i].startTimeM), 2)
        if (res[i].isSub) {
          res[i].subTimeH = zFill(String(res[i].subTimeH), 2)
          res[i].subTimeM = zFill(String(res[i].subTimeM), 2)
        }
      }
      this.setData({
        allEvents: res,
        dateDisplay : true,
      })
    })
  },
})