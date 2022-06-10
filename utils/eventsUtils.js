import {
  zFill
} from './util'

const cloudUtils = require('cloudUtils.js')

let oriPage = ''
export const eventsInit = async (page) => {
  oriPage = page
  // oriPage.setData({
  //   finishedTrueStyle: finishedTrueStyle,
  //   finishedFalseStyle: finishedFalseStyle
  // })

  // 状态改变函数
  oriPage.changeStatu = (e) => {
    let info = e.target.id.split('-')
    if (info[2] == 'false') {
      wx.showModal({
        title: '温馨提示',
        content: '是否完成' + info[0] + '事项？',
        success: (res) => {
          if (res.confirm) {
            cloudUtils.eventsOperate.update({
              where: {
                _id: info[1]
              },
              newdata: {
                statu: true,
                isSub: false
              }
            }).then(res => {
              if (info[6] == 'true') {
                cloudUtils.subscribeUtils.deleteSubscribe(info[7]).then(res => {
                  getTodayEvents(info[3] + '-' + info[4] + '-' + info[5]).then(res => {
                    oriPage.getToDo()
                    oriPage.setData({
                      allEvents: res,
                    })
                  })
                })
              } else {
                getTodayEvents(info[3] + '-' + info[4] + '-' + info[5]).then(res => {
                  oriPage.getToDo()
                  oriPage.setData({
                    allEvents: res,
                  })
                })
              }

            })
          }
        }
      })
    }
  }

  // 长按删除函数
  oriPage.deleteEvent = (e) => {
    let info = e.target.id.split('-')
    wx.showModal({
      title: '温馨提示',
      content: '是否删除' + info[0] + '事项？',
      success: (res) => {
        if (res.confirm) {
          cloudUtils.eventsOperate.remove({
            where: {
              _id: info[1]
            }
          }).then(res => {
            if (info[6] == 'true') {
              cloudUtils.subscribeUtils.deleteSubscribe(info[7]).then(res => {
                getTodayEvents(info[3] + '-' + info[4] + '-' + info[5]).then(res => {
                  oriPage.getToDo()
                  oriPage.setData({
                    allEvents: res,
                  })
                })
              })
            } else {
              getTodayEvents(info[3] + '-' + info[4] + '-' + info[5]).then(res => {
                oriPage.getToDo()
                oriPage.setData({
                  allEvents: res,
                })
              })
            }
          })
        }
      }
    })
  }

  // 获取所有事项
  return await new Promise((resolve, reject) => {
    getEvents().then(res => {
      resolve(res)
    })
  })
}



function dateComp(d1, d2) {
  d1 = d1.split('-')
  d2 = d2.split('-')
  let i = 0
  while (i < 3) {
    if (parseInt(d1[i]) > parseInt(d2[i]))
      return 2
    else if (parseInt(d1[i]) < parseInt(d2[i]))
      return 1
    i++
  }
  return 0
}

function comp(d1, d2) {
  let dateres = dateComp(d1.date, d2.date);
  if (dateres == 1) {
    return true;
  } else if (dateres == 0) {
    let t1 = d1.startTimeH * 100 + d1.startTimeM;
    let t2 = d2.startTimeH * 100 + d2.startTimeM;
    if (t1 < t2) {
      return true;
    }
  }
  return false;
}

// const finishedTrueStyle = `
//   background-color: green;
// `;
// const finishedFalseStyle = `
// background-color: red;
// `;

export const getEvents = () => {
  return new Promise((resolve, reject) => {
    cloudUtils.eventsOperate.get(null).then(res => {
      let events = res.result.data;
      // 冒泡排序events
      let up = events.length - 1;
      for (let i = 0; i < events.length; i++) {
        let J = up - 1;
        for (let j = 0; j < up; j++) {
          if (!comp(events[j + 1], events[j])) {
            J = j;
            let temp = events[j];
            events[j] = events[j + 1];
            events[j + 1] = temp;
          }
        }
        up = J;
      }
      resolve(events)
    })
  })
}

export const getTodayEvents = (dateString) => {
  return new Promise((resolve, reject) => {
    getEvents().then(res => {
      let temp = []
      for (let i = 0; i < res.length; i++) {
        if (res[i].date == dateString) {
          res[i].startTimeH = zFill(String(res[i].startTimeH), 2)
          res[i].startTimeM = zFill(String(res[i].startTimeM), 2)
          if (res[i].isSub) {
            res[i].subTimeH = zFill(String(res[i].subTimeH), 2)
            res[i].subTimeM = zFill(String(res[i].subTimeM), 2)
          }
          temp.push(res[i])
        }
      }
      resolve(temp)
    })
  })
}