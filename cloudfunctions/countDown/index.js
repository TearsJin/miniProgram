// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const collection = cloud.database().collection("countDown")
let InitPic = null

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let data = {
    openid: wxContext.OPENID,
    msg: event.msg
  }
  let operate = eval(event.strInterval)
  return operate(data)
}

function getCountDownEvents(data) {
  // 查询已经添加的倒计时事件
  return collection.where({
    id: data.openid
  }).get().then(res => {
    if (res.data.length == 0) {
      // 不存在用户记录，创造一条新的记录
      // 需要用到InitPic
      return cloud.database().collection("template").where({
        // 获取静态数据图
        "name": "countDownInitPic"
      }).get().then(res => {
        // 构造新数据
        InitDate[0].Pic = res.data[0].InitPic2
        InitDate[1].Pic = res.data[0].InitPic3
        let content = [{
            Pic: res.data[0].InitPic1,
            name: '9',
            date: ''
          }, InitDate[0], InitDate[1],
          {
            Pic: res.data[0].InitPic4,
            name: '9',
            date: ''
          }
        ]
        return collection.add({
          data: {
            id: data.openid,
            content: content
          }
        }).then(result => {
          return [{
            content: content
          }]
        })
      })
    } else {
      return res.data
    }
  })
}

function deleteCountDownEvent(data) {
  return collection.where({
    id: data.openid
  }).get().then(res => {
    res = res.data[0].content
    res.splice(parseInt(data.msg.index), 1)
    collection.where({
      id: data.openid
    }).update({
      data: {
        content: res
      }
    }).then(res => {
      return res
    })
  })
}

function updateCoundDownEvent(data) {
  return collection.where({
    id: data.openid
  }).get().then(res => {
    res = res.data[0].content
    let Index = parseInt(data.msg.index)
    // 如果op字段为'c' 则添加或覆盖Pic字段
    if(data.msg.op == 'c'){
      if(res.length == Index){
        // 添加Pic
        res.push({
          name : data.msg.name,
          date : data.msg.date,
          Pic : data.msg.Pic
        })
      }else{
        res[Index] = {
          Pic: data.msg.Pic,
          name: data.msg.name,
          date: data.msg.date,
        }
      }
    }else if(data.msg.op == 'a'){
      // op字段为'a'，追加Pic字段
      res[Index].Pic += data.msg.Pic
    }
    return collection.where({
      id: data.openid
    }).update({
      data: {
        content: res
      }
    }).then(res => {
      return res
    })  
  })
}


const InitDate = [{
  Pic: '',
  date: '2023-1-1',
  name: '2023年'
}, {
  Pic: '',
  date: '2022-11-2',
  name: 'k1rit0生日'
}]