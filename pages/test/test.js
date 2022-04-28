// pages/test/test.js

require("../../utils/myDate.js")
const bar = require('../../utils/bar.js')
const water = require('../../utils/water.js')
const cloudUtils = require('../../utils/cloudUtils.js')
const eventsUtils = require('../../utils/eventsUtils.js')
const clanderUtils = require('../../utils/clander.js')
const countDown = require('../../utils/countDown')
const utils = require('../../utils/util')
const moduleSelect = require('../../utils/moduleSelect')
let todayDate = new Date()
let dateAry = todayDate.toArray()
let todayString = String(dateAry[0]) + '-' + String(dateAry[1] + 1) + '-' + String(dateAry[2])
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  clickDay(e) {
    let id = e.target.id
    if (id.indexOf("clanderDay-") != -1) {
      let dateAry = this.pageDate.toArray()
      let dateString = String(dateAry[0]) + '-' + String(dateAry[1] + 1) + '-' + id.split("-")[1]
      this.setData({
        'detailDay': dateString,
        "detailDisplay": "initial",
      })
      eventsUtils.getTodayEvents(dateString).then(res => {
        this.setData({
          allEvents: res
        })
      })
    }
  },

  addEvent(e) {
    this.setData({
      'addEventDate': e.target.id,
      'addDetailDisplay': 'block',
      'finishRadio': false,
      'addEventStartTimeH': 0,
      'addEventStartTimeM': 0,
      'addEventSubTimeH': 0,
      'addEventSubTimeM': 0
    })
  },

  addSubmit(e) {
    e.detail.value.statu = this.data.finishRadio
    e.detail.value.startTimeH %= 24
    e.detail.value.startTimeM %= 60
    e.detail.value.subTimeH %= 24
    e.detail.value.subTimeM %= 60
    e.detail.value.isSub = this.data.subFormDisplay

    // 可以写检查
    if (e.detail.value.name == "") {
      wx.showToast({
        title: 'name不能为空',
        icon: 'error'
      })
      return
    }else if(e.detail.value.isSub&&e.detail.value.startTimeH * 100 + e.detail.value.startTimeM <= e.detail.value.subTimeH * 100 + e.detail.value.subTimeM){
      wx.showToast({
        title: '提醒时间有误',
        icon: 'error'
      })
      return
    }


    let subInfo = {}
    if (this.data.subFormDisplay) {
      let temp = e.detail.value.date.split('-')
      let date = new Date(parseInt(temp[0]), parseInt(temp[1]) - 1, parseInt(temp[2]), parseInt(e.detail.value.subTimeH), parseInt(e.detail.value.subTimeM), 0, 0)
      subInfo.time = date.getTime()
      subInfo.templateId = 'ICE0_c1CzSePyUIVNLWKhB-4upNfjIogbtuxGOuLAtQ'
      subInfo.data = {}
      subInfo.data.thing3 = {
        value: e.detail.value.name
      }
      subInfo.data.thing4 = {
        value: '~'
      }
      subInfo.data.date2 = {
        value: e.detail.value.date
      }
      subInfo.data.time13 = {
        value: utils.zFill(String(e.detail.value.startTimeH), 2) + ':' + utils.zFill(String(e.detail.value.startTimeM), 2)
      }
      subInfo.data.time14 = {
        value: utils.zFill(String(e.detail.value.startTimeH), 2) + ':' + utils.zFill(String(e.detail.value.startTimeM), 2)
      }
    }else{
      delete e.detail.value.subTimeH
      delete e.detail.value.subTimeM
    }

    if (this.data.subFormDisplay) {
      wx.requestSubscribeMessage({
        // 申请订阅权限
        tmplIds: ['ICE0_c1CzSePyUIVNLWKhB-4upNfjIogbtuxGOuLAtQ']
      }).then(res => {
        if (res['ICE0_c1CzSePyUIVNLWKhB-4upNfjIogbtuxGOuLAtQ'] == 'accept') {
          cloudUtils.subscribeUtils.addSubscribe(subInfo).then(res => {
            e.detail.value.subId = res.result._id
            cloudUtils.eventsOperate.add(e.detail.value).then(res => {
              this.setData({
                'addEventName': "",
                'addEventStartTimeM': 0,
                'addEventStartTimeH': 0,
                'addEventSubTimeH': 0,
                'addEventSubTimeM': 0
              })
              wx.showToast({
                title: 'ok!',
                icon: 'success',
                duration: 1500
              })
              eventsUtils.getTodayEvents(e.detail.value.date).then(res => {
                this.setData({
                  allEvents: res,
                  'addDetailDisplay': 'none'
                })
                this.getToDo()
              })
            })

          })
        }
      })
    }

    

  },
  addDeny(e) {
    this.setData({
      'addEventName': "",
      'addEventStartTime-H': 0,
      'addEventStartTime-M': 0,
      'addDetailDisplay': 'none',
    })
  },
  closeDetail() {
    this.setData({
      "detailDisplay": "none",
      'detailDay': '',
      'allEvent': '',
    })
  },

  radioChange(e) {
    let res = (e.detail.value == 'finished')
    this.setData({
      'finishRadio': res
    })
  },

  // 订阅按钮更改函数
  changeSub(e) {
    let LEN = e.detail.value.length
    if (LEN == 1) {
      // 确认订阅 弹出订阅时间表单
      this.setData({
        subFormDisplay: true
      })
    } else {
      // 取消订阅 隐藏订阅时间表单
      this.setData({
        subFormDisplay: false
      })
    }
  },
  getToDo() {
    // 获取事件
    let dateAry = todayDate.toArray()
    let dateString = String(dateAry[0]) + '-' + String(dateAry[1] + 1) + '-' + String(dateAry[2])
    eventsUtils.getTodayEvents(dateString).then(res => {
      cloudUtils.classesUtils.getClasses().then(result => {
        let classess = result.result[0].classes
        res.reverse()
        let events = res
        let temp = []
        for (let i = 0; i < classess.length; i++) {
          if (classess[i].weekday + 1 == todayDate.getDay()) {
            temp.push({
              name: classess[i].name,
              classroom: classess[i].classroom,
              startTimeH: result.result[0].timeEip[classess[i].startTime][0].split(':')[0],
              startTimeM: result.result[0].timeEip[classess[i].startTime][0].split(':')[1],
              statu: false
            })
          }
        }
        for (let i = 0; i < events.length; i++) {
          events[i].startTimeM = utils.zFill(String(events[i].startTimeM), 2)
        }
        for (let i = 0; i < temp.length; i++) {
          temp[i].startTimeM = utils.zFill(String(temp[i].startTimeM), 2)
        }
        let unFinishedNum = 0
        for(let i in events){
          if(events[i].statu == false) unFinishedNum ++
        }
        this.setData({
          'toDoEvents': events,
          'toDoClasses': temp,
          'unFinishedNum': unFinishedNum
        })
      })
    })
    // 获取今日课程

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    bar.barInit(this)
    clanderUtils.clanderInit(this)
    eventsUtils.eventsInit(this)
    water.waterInit(this)
    countDown.countDown.coutDownInit(this)
    moduleSelect.moduleSelect.moduleSelectInit(this)

    this.setData({
      // 详细信息初始化
      "detailDisplay": "none",
      "rightBarDisplay": "none",
      subFormDisplay: false,
      // 获取今日待办
      'toDoEvents': []
    })
    this.getToDo()
  },
})