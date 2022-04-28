require('../utils/myDate')
const cloudUtils = require('../utils/cloudUtils')
const imageUtils = require('../utils/imageUtils')
const image = require('../utils/image')
const todayDate = new Date()

let maxSize = 65536
let oriPage = ''
let Len = 0
export const countDown = {
  coutDownInit: function (page) {
    oriPage = page
    oriPage.setData({
      uploadCountDownStyle: 'none'
    })
    oriPage.displayCountDownAddForm = (e) => {
      oriPage.setData({
        uploadCountDownStyle: 'initial',
        countDownName: '',
        countDownDate: '',
        countDownPic: '',
        countDownCloudStrInterval: 'updateCoundDownEvent',
        finishedUpload: 0
      })
      this.countDownCloudStrInterval = 'updateCoundDownEvent'
      this.Pic = ''
      this.countDownIndex = Len
    }

    oriPage.editCountDown = (e) => {
      let info = e.currentTarget.id.split('#')
      oriPage.setData({
        uploadCountDownStyle: 'initial',
        countDownName: info[0],
        countDownDate: info[1],
        countDownPic: info[2],
        countDownCloudStrInterval: 'updateCoundDownEvent',
        finishedUpload: 0
      })
      this.countDownCloudStrInterval = 'updateCoundDownEvent'
      this.Pic = info[2]
      this.countDownIndex = info[3]
    }
    oriPage.deleteCountDown = (e) => {
      let index = e.currentTarget.id.split('#')[3]
      wx.showModal({
        title: '温馨提示',
        content: '是否删除该方格？',
        success: (res) => {
          // deleteCountDownEvent
          if (res.confirm) {
            cloudUtils.countDownUtils.deleteCountDownEvent(index).then(res => {
              console.log(res)
              displayCountDownEvents()
            })
          }
        }
      })
    }
    oriPage.editCountDownDeny = (e) => {
      oriPage.setData({
        uploadCountDownStyle: 'none'
      })
    }
    oriPage.uploadCountDownPic = (e) => {
      imageUtils.image.imageInit(this).then(res => {
        imageUtils.image.readAsBase64().then(res => {
          this.Pic = 'data:image/jpeg;base64,' + res
          oriPage.setData({
            countDownPic: 'data:image/jpeg;base64,' + res
          })
        })
      })
    }

    oriPage.uploadCountDownSubmit = (e) => {
      e.detail.value.index = this.countDownIndex
      e.detail.value.Pic = this.Pic

      // 需要对图片分段
      let LEN = e.detail.value.Pic.length
      let num = Math.trunc(LEN / maxSize) + 1
      let DATA = []
      for (let i = 0; i < num; i++) {
        DATA.push(e.detail.value.Pic.substring(i * maxSize, (i + 1) * maxSize))
      }

      whileUpload(DATA, e, 0)
    }
    displayCountDownEvents()
  }
}

function date2days(date) {
  return todayDate.DateDiff('d', date)
}

function displayCountDownEvents() {
  cloudUtils.countDownUtils.getCountDownEvents().then(res => {
    // 把拿到的event的date转成days
    res = res.result[0].content
    for (let i = 0; i < res.length; ++i) {
      if (res[i].date != '') {
        res[i].days = date2days(res[i].date)
      }
    }
    oriPage.setData({
      countDownList: res,
    })
    Len = res.length
  })
}

function whileUpload(DATA, e, i) {
  if(i < DATA.length){
    let data = {
      strInterval: countDown.countDownCloudStrInterval,
      msg: {
        op: i == 0 ? 'c' : 'a',
        Pic: DATA[i],
        name: e.detail.value.name,
        date: e.detail.value.date,
        index: e.detail.value.index
      }
    }
    cloudUtils.countDownUtils.editCountDownEvents(data).then(res => {
      console.log(res)
      oriPage.setData({
        finishedUpload: ((i+1) / DATA.length  * 100).toFixed(2)
      })
      whileUpload(DATA, e, i + 1)
    })
  }else{
    oriPage.setData({
      uploadCountDownStyle: 'none'
    })
    displayCountDownEvents()
  }
}