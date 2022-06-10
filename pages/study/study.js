// pages/study/study.js

const bar = require('../../utils/bar.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    weekdayChinese: ["一", "二", "三", "四", "五", "六", "日"]
  },

  backToIndex(){
    wx.redirectTo({
      url : '../test/test'
    })
  },
  addClassDisplay() {
    this.setData({
      addDetailDisplay: "initial"
    })
  },
  addTimeDisplay(){
    this.setData({
      modifiTimeDisplay: "initial"
    })
  },

  addSubmit(e) {
    e.detail.value.weekday = parseInt(e.detail.value.weekday)
    e.detail.value.startTime = parseInt(e.detail.value.startTime)
    e.detail.value.endTime = parseInt(e.detail.value.startTime) + parseInt(e.detail.value.endTime) - 1
    wx.cloud.callFunction({
      name: 'classesOperate',
      data: {
        strInterval: "addClass",
        msg: e.detail.value
      },
      success: res => {
        this.setData({
          'addDetailDisplay': 'none'
        })
        wx.redirectTo({
          url: 'study'
        })
      },

      fail: res => {
        console.log(res)
      }
    })
  },
  modifiTimeSubmit(e){
    e.detail.value.oldIndex = parseInt(this.data.oldIndex)
    e.detail.value.newIndex = parseInt(e.detail.value.newIndex)
    wx.cloud.callFunction({
      name:'classesOperate',
      data:{
        strInterval:'changeTimeEip',
        msg:{
          oldIndex:parseInt(this.data.oldIndex),
          newIndex:parseInt(e.detail.value.newIndex),
          timeEip: [e.detail.value.timeEipStartTime,e.detail.value.timeEipEndTime]
        }
      }
    }).then(res =>{
      this.setData({
        modifiTimeDisplay: 'none'
      })
      wx.redirectTo({
        url: 'study'
      })
    })
  },

  addDeny(e) {
    this.setData({
      modifiTimeDisplay: 'none',
      addDetailDisplay: 'none',
      timeIndex : '',
      timeEipStartTime : '',
      timeEipEndTime: '',
      addClassName : '',
      addClassRoom:'',
      addClassStartTime : '',
      addClassTimes : '',
      addClassWeekDay : ''
    })
  },

  modifyTable(e){
    let id = e.target.id.split('-')
    if(id[0] == "T"){
      // 更新时间段
      this.setData({
        oldIndex: parseInt(id[1]),
        newIndex: parseInt(id[1]),
        timeEipStartTime : id[2],
        timeEipEndTime: id[3]
      })
      this.addTimeDisplay()
    }else{
      // 更新课表
      this.setData({
        addClassName : id[2],
        addClassRoom: id[3],
        addClassStartTime : (id[4] == "")?parseInt(id[0]):parseInt(id[4]),
        addClassTimes : parseInt(id[5]),
        addClassWeekDay : parseInt(id[1])
      })
      this.addClassDisplay()
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bar.barInit(this)
    // 从服务端获取配置信息和课程信息
    wx.cloud.callFunction({
      name: 'classesOperate',
      data: {
        strInterval: 'getClasses',
        msg: {}
      },
    }).then(res => {
      if (res.result != null) {
        var result = res.result[0]
        //创建课表数组
        var classesTable = []
        for (var i = 0; i < result.row; i++) {
          var temp = []
          for (var j = 0; j < result.col; j++) {
            temp.push({})
          }
          classesTable.push(temp)
        }
        for (var i = 0; i < result.classes.length; i++) {
          var CLASS = result.classes[i]
          var col = CLASS.weekday
          var rowLeft = CLASS.startTime
          var rowRight = CLASS.endTime
          var info = {
            name: CLASS.name,
            classroom: CLASS.classroom,
            start: rowLeft,
            end: rowRight,
            nums: rowRight - rowLeft + 1
          }
          for (var j = rowLeft; j < rowRight + 1; j++) {
            classesTable[j][col] = info
          }
        }
        // 设置课表表格

        this.setData({
          timeEip: result.timeEip,
          classesTable: classesTable,
          weekdayChinese: this.data.weekdayChinese.slice(0, result.col)
        })
      } else {
        wx.redirectTo({
          url: 'study'
        })
      }
    })

    // 
  },


})