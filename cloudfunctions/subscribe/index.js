// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const collection = cloud.database().collection("subscribe")
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


function createSubscribe(data) {
  // 创建用户Subscribe记录
  return collection.add({
    data: {
      id: data.openid,
      subInfo: []
    }
  }).then(res => {
    return ['ok', res]
  })
}

function addSubscribe(data) {
  // 添加订阅记录
  // 先获取原先的订阅记录
  data.msg.subInfo.touser = data.openid
  return collection.add({
    data: data.msg.subInfo
  }).then(res => {
    return res
  })
}

function deleteSubscribe(data) {
  // 删除订阅记录
  return collection.where(data.msg.where).remove().then(res => {
    return res
  })
}