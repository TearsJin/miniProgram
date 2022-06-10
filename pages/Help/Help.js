// pages/Help/Help.js

const bar = require('../../utils/bar.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  displayList(e){
    let id = parseInt(e.target.id)
    let helpListDisplayBtn = this.data.helpListDisplayBtn
    let helpBodyDisplay = this.data.helpBodyDisplay
    helpBodyDisplay[id] = (helpListDisplayBtn[id] == "True")?"none": "initial"
    helpListDisplayBtn[id] = (helpListDisplayBtn[id] == "True")?"False" : "True"
    this.setData({
      helpListDisplayBtn:helpListDisplayBtn,
      helpBodyDisplay:helpBodyDisplay
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bar.barInit(this)

    let helpListDisplayBtn = ['False','False','False','False']
    let helpBodyDisplay = ['none','none','none','none']

    this.setData({
      helpListDisplayBtn: helpListDisplayBtn,
      helpBodyDisplay: helpBodyDisplay
    })
  },
})