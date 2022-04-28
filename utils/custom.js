const cloudUtils = require('../utils/cloudUtils')
let oriPage = null
export const customUtils = {
  customInit: function (page, pageName) {
    oriPage = page
    // 用户进入主页面时需要获得自定义所有信息，可以根据pageName分页面读！
    // 在数据库中可以根据pageName分成员变量
    return cloudUtils.customUtils.getCustom(pageName).then(res => {
      for (let key in res.result[0]) {
        let str = `{"${key}":"${res.result[0][key]}"}`
        oriPage.setData(JSON.parse(str))
      }
    })
  }
}