// index.js
// 获取应用实例
const app = getApp()
const cloudUtils = require('../../utils/cloudUtils')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  go(){
    wx.cloud.callFunction({
      name : 'dbOperate',
      data:{
        strInterval : 'create',
        data:{}
      },
      success:(res)=>{
        cloudUtils.customUtils.createCustom().then(res =>{
            wx.redirectTo({
              url: '../Help/Help',
          })
        })
      },
      fail: (res) =>{
        wx.redirectTo({
          url: '../test/test',
        })
      }
    })

  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
  }
},
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
