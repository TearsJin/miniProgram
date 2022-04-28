// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, contexvart) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  var data = {
    openid: wxContext.OPENID,
    msg: event.msg
  }
  var operate = eval(event.strInterval)
  return operate(db, data)
}

function changeRow(db,data) {
  let collection = db.collection('classes')
  return collection.where({user:data.openid}).get().then(res =>{
    let info  = res.data[0]
    let timeEip = info.timeEip
    if(timeEip.length >= data.msg.row){
      timeEip = timeEip.splice(0,data.msg.row)
    }else{
      while(timeEip.length < data.msg.row){
        timeEip.push(["",""])
      }
    }
    collection.where({user:data.openid}).update({
      data:{
        row: data.msg.row,
        col: data.msg.col,
        classes: [],
        timeEip : timeEip
      }
    }).then(res => {
      return res
    })
  })
}

function changeRoom(db,data) {
  let collection = db.collection('water')
  return collection.where({user:data.openid}).update({
    data:{
      room:data.msg.room
    }
  }).then(res =>{
    return res
  })
}