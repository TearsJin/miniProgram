// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
  /* 
  event :{
    'strInterval' : 进行什么操作
    'data' : 操作需要用到的数据
  }
  */
  const db = cloud.database()
  const wxContext = cloud.getWXContext()
  let operate = eval(event.strInterval) 
  let data = {
     openid : wxContext.OPENID,
     cord : event.data
  }
  return operate(db,data)
}

function create(db,data) {
  return db.createCollection(data.openid)
}

function add(db,data) {
  let collection = db.collection(data.openid)
  return collection.add({data: data.cord})
}

function get(db,data) {
  let collection = db.collection(data.openid)
  if(data.cord.where == null){
    return collection.limit(100).get()
  }else{
    return collection.where(data.cord.where).get()
  }
}

function remove(db,data) {
  let collection = db.collection(data.openid)
  return collection.where(data.cord.where).remove()
}

function update(db,data) {
  let collection = db.collection(data.openid)
  return collection.where(data.cord.where).update({data:data.cord.newdata})
}