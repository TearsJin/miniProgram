// pages/setting/setting.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  selectSetting(e){
    let settingDisplayList = new Array()
    let settingListChosen  = new Array()
    settingDisplayList = this.data.settingDisplayList
    settingListChosen  = this.data.settingListChosen 
    for(let i = 0;i < settingDisplayList.length; i++){
      settingDisplayList[i] = "none"
      settingListChosen[i] = ""
    }
    settingDisplayList[parseInt(e.target.id)] = "initial"
    settingListChosen[parseInt(e.target.id)] = "settingListChosen"
    this.setData({
      settingDisplayList: settingDisplayList,
      settingListChosen: settingListChosen
    })
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

    // 初始化list
    let settingDisplayList = ["initial", "none"]
    let settingListChosen = ["settingListChosen",""]
    this.setData({
      settingDisplayList: settingDisplayList,
      settingListChosen: settingListChosen
    })
    /*
      0 -> 课表
      1 -> 水电费
    */
  }
})