let oriPage = null
export const subscribeUtil = {
  subscribeInit: function (page){
    oriPage = page

    // 测试时间设置
    oriPage.subscribe = function(){
      wx.requestSubscribeMessage({
        // 该方法调用后申请订阅权限
        tmplIds: ['ICE0_c1CzSePyUIVNLWKhB-4upNfjIogbtuxGOuLAtQ'],
      }).then(res =>{
        console.log(res)
      })
    }
    oriPage.send = function(){
      wx.cloud.callFunction({
        name: 'messageSend',
        data: {}
      }).then(res =>{
        console.log(res)
      })
    }
  }
}


/*  
https://zhuanlan.zhihu.com/p/126742180
定时发送功能需要配合数据库，先把订阅请求存进数据库，在服务端启用一个线程，每分钟检查是否存在需要发送的订阅消息，如果有就把消息发送出去，并且清楚掉该条消息。


订阅一次就有一次发提醒的权限，需要一个数据库记录每个订阅发送的信息和时间。

可以做个接口查看还未发出的订阅，订阅的发送时间是自定义的

数据库结构
touser: 
templateId: 
data: {
  提醒事项 {{thing3.DATA}}
  事项地点 {{thing4.DATA}}
  提醒日期 {{date2.DATA}}
  开始时间 {{time13.DATA}}
  结束时间 {{time14.DATA}}
}
time: 发送时间
*/