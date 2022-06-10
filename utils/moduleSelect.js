const image = require('./image')
let oriPage = null
let selected = []

export const moduleSelect = {
  moduleSelectInit : function(page){
    oriPage = page
    // 从数据库获取模块信息
    selected = ['Event','Water','Countdown']
    oriPage.setData({
      moduleSelected : selected,
      isSelected : 'Event',
    })
    // 设置图片以及CSS
    for(let name in selected){
      let selectedName = 'moduleSelect' + selected[name] + 'Icon'
      let cssName = selected[name] + 'Display'
      let str = `{"${selectedName}":"${image.IMAGE[selectedName]}"}`
      oriPage.setData(JSON.parse(str))
      let display = 'display: ' + ((name == 0) ? 'initial;' : 'none;')
      str = `{"${cssName}":"${display}"}`
      oriPage.setData(JSON.parse(str))
    }
    oriPage.moduleSelectShift = (e) =>{
      let id = e.currentTarget.id
      
      for(let name in selected){
        if(selected[name] != id){
          let cssName = selected[name] + 'Display'
          let str = `{"${cssName}":"display:none;"}`
          oriPage.setData(JSON.parse(str))
        }
      }
      for(let name in selected){
        if(selected[name] == id){
          let cssName = selected[name] + 'Display'
          let str = `{"${cssName}":"display:initial;"}`
          oriPage.setData(JSON.parse(str))
        }
      }
      oriPage.setData({
        isSelected: id
      })
    }
  }
}