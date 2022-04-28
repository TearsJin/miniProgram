// pages/setting/setting.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  changeStudyRow(e) {
    let changeRow = parseInt(e.detail.value.studyRow)
    let changeCol = parseInt(e.detail.value.studyCol)
    wx.cloud.callFunction({
      name: 'setting',
      data: {
        strInterval: 'changeRow',
        msg: {
          row: changeRow,
          col: changeCol
        }
      }
    }).then(res => {
      wx.redirectTo({
        url: '../study/study'
      })
      console.log(res)
    })
  },

  changeRoom(e) {
    wx.cloud.callFunction({
      name: 'setting',
      data: {
        strInterval: "changeRoom",
        msg: {
          room: e.detail.value.room
        }
      }
    }).then(res => {
      wx.redirectTo({
        url: '../test/test'
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化导航栏
    const bar = require('../../utils/bar.js')
    bar.barInit(this)
  }
})