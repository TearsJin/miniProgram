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

function getClasses(db, data) {
  var collection = db.collection("classes")
  return collection.where({
    user: data.openid
  }).get().then(res => {
    if (res.data[0] == null) {
      // 用户第一次使用课表，创建默认配置文件
      var setting = {
        user: data.openid,
        col: 5,
        row: 10,
        timeEip: [
          ["8:30", "9:15"],
          ["9:25", "10:10"],
          ["10:30", "11:15"],
          ["11:25", "12:10"],
          ["14:00", "14:45"],
          ["14:55", "15:40"],
          ["15:50", "16:35"],
          ["18:30", "19:15"],
          ["19:25", "20:10"],
          ["20:25", "21:10"]
        ],
        classes: [{
          name: "高等数学",
          weekday: 0,
          startTime: 0,
          endTime: 1,
          classroom: 'N223'
        }] // Array
      }
      collection.add({
        data: setting
      }).then(res => {
        return setting
      })
    } else {
      // 返回整个课表记录
      return res.data
    }
  })
}

function addClass(db, data) {
  // 更新课表有三种情况: 1.添加; 2.更改; 3.删除
  var collection = db.collection("classes")
  var Class = data.msg
  return collection.where({
    user: data.openid
  }).get().then(res => {
    // 如果data.msg.name不为空，且本来数据就不存在该data.msg.name，添加 
    // 如果data.msg.name不为空，且本来数据就存在该data.msg.name，修改
    // 如果data.msg.name是空，且对应(weekday, startTime)已有记录，删除
    // 如果data.msg.name是空，且对应(weekday, startTime)无记录，不操作
    var Classes = res.data[0].classes
    if(Class.name == ""){
      for(let i = 0; i < Classes.length;i++){
        var _Class = Classes[i]
        if(_Class.startTime == Class.startTime && _Class.weekday == Class.weekday){
          Classes.splice(i,1)
        }
      }
    }else{
      // 遍历一遍res.data[0].classes, 看是否已经存在Class.name
      var flag = -1 // 用于保存比较结果
      for(let i = 0;i < Classes.length;i++){
        if(Classes[i].name == Class.name){
          flag = i
        }
      }
      if(flag != -1){
        // 已经存在Classes.name，修改
        Classes[flag] = Class
      }else{
        // 不存在，添加
        Classes.push(Class)
      }
    }

    return collection.where({
      user: data.openid
    }).update({data:{
      classes:Classes
    }})
  })
}


function changeTimeEip(db,data) {
  let collection = db.collection("classes")
  return collection.where({user:data.openid}).get().then(res =>{
    let info = res.data[0]
    let timeEip = info.timeEip
    timeEip[data.msg.oldIndex] = timeEip[data.msg.newIndex]
    timeEip[data.msg.newIndex] = data.msg.timeEip
    collection.where({user:data.openid}).update({
      data:{
        timeEip : timeEip
      }
    }).then(res => {
      return res
    })
  })
}