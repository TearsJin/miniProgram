// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
let url = ""
let room = ""
exports.main = (event, context) => {
  const wxContext = cloud.getWXContext()
  const request = require('request')
  const db = cloud.database()
  // 根据openid查询设置的房间号

  return db.collection("water").where({user:wxContext.OPENID}).get().then(res=>{
    // 如果不存在该user，则创建记录
    if(res.data.length == 0){
      db.collection("water").add({
        data:{
          user: wxContext.OPENID,
          room: ""
        }
      })
      return "请先去设置页面设置房间号才能查询水电费" 
    }
    room = res.data[0].room
    if(room == ""){
      return "请先去设置页面设置房间号才能查询水电费"
    }
    url = 'https://i.akarin.dev/IBSjnuweb/api/billing/' + room
    return new Promise((resolve, reject) => {
      request({
        url:url,
        json: true,
      },(error,response,body)=>{
        resolve(body)
        }
      )
    }).then(res => {
      return [res,room]
    })
  })
}
