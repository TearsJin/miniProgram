// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const collection = cloud.database().collection("custom")
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


function createCustom(data) {
  // 创建用户Custom记录
  return collection.add({
    data: {
      id: data.openid,
      bar: {
        menuBtnStyleBaseFloat: 'float: left;',
        rightBarStyleBaseSide: 'left: 0;',
        backBtnStyleFloat: 'float: right;'
      },
      moduleSelect : {
        selected : ['Event','Water','Countdown']
      }
    }
  }).then(res => {
    return ['ok',res]
  })
}

function getCustom(data) {
  return collection.where({
    id: data.openid
  }).get().then(res =>{
    let pageName = data.msg.pageName
    let result = []
    for(let i = 0;i < pageName.length ; i++){
      result.push(res.data[0][pageName[i]])
    }
    return result
  })
}