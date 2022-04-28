// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const collection = cloud.database().collection('subscribe')


// 云函数入口函数
exports.main = async (event, context) => {
  return collection.where({
    _id: 'admin'
  }).get().then(res => {
    let configInfo = res.data[0]
    let config = configInfo.config
    log = configInfo.log

    if (configInfo.running) {
      // 订阅发送服务
      // 获取订阅发送信息
      collection.get().then(res => {
        // 遍历所有信息
        let nowTime = Date.now()
        let DATA = res.data
        // 发送信息并更新数据库
        doSend(DATA, 0, nowTime, 0)
        // 记录日志
        if (log.running) {
          log.content = [{
            sendTime: nowTime,
            dbNum: DATA.length
          }].concat(log.content)
          while (log.content.length > config.logTime) {
            log.content.pop()
          }
          return collection.where({
            _id: 'admin'
          }).update({
            data: {
              log: log
            }
          }).then(res =>{
            return res
          })
        }
      })
    }
  })
}

async function doSend(DATA, i, nowTime, sendSubMsgNum) {
  if (i < DATA.length) {
    let data = DATA[i]
    if (data._id != 'admin' && data.time <= nowTime) {
      delete data.time
      try {
        let result = await cloud.openapi.subscribeMessage.send(data)
      } catch (e) {
        // 暂时未找到报错的原因，但也没发现该错误有什么影响
      }
      return await collection.where({
        _id: data._id
      }).remove().then(res => {
        // 删除记录
        return doSend(DATA, i + 1, nowTime, sendSubMsgNum + 1)
      })
    } else {
      return doSend(DATA, i + 1, nowTime, sendSubMsgNum)
    }
  } else {
    return sendSubMsgNum
  }
}
/*
整个流程:


1. 从数据库subscribe中获取admin记录，获取配置信息
2. 如果running字段为true 则进行订阅发送服务
   -> 1. 获取待发送订阅信息
   -> 2. 遍历待发送信息判断是否需要发送
   -> 3. 发送需要发送的订阅信息
   -> 4. 更新数据库，将已发送的信息删除
   -> 5. 如果开启了log，记录log

log {
  sendTime : 发送的时间,
  sendSubMsgNum : 发送成功的条数,
  dbNum : 发送前数据库中的条数,
}
 */


/**
    * config ：{
    *  logTime: 日志记录时长
    * }
    * log {
    * running: 日志是否启动
    * 
    * content:
       sendTime : 发送的时间,
       dbNum : 发送前数据库中的条数,
     }
    * 
    */