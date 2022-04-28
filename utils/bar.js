/*
  导航栏模块
  const bar = require('../../utils/bar.js')
  bar.barInit(this)
  即可初始化
*/

import {
  IMAGE
} from 'image.js'

let oriPage = ''
const customUtils = require('../utils/custom')
export const barInit = (page) => {
  oriPage = page
  customUtils.customUtils.customInit(page, ['bar'])

  page.setData({
    menuBtnStyle: menuBtnStyle1,
    rightBarStyle: rightBarStyle1,
    headBarStyle: headBarStyle,
    backBtnStyle: backBtnStyle,
    barMargin: barMargin,
    backBtnStyleFloat: "float: right;",
    menuBtnStyleBaseFloat: "float: left;",
    rightBarStyleBaseSide: "left:0;"
  })
  page.callBarFunction = (e) => {
    let id = e.target.id.split('-')
    if (id[0] == "displayRightBar") {
      displayRightBar(oriPage)
    } else if (id[0] == "toApplication") {
      toApplication(id[1])
    }
  }
}

export const displayRightBar = (page) => {
  if (page.data.menuBtnStyle == menuBtnStyle1) {
    page.setData({
      menuBtnStyle: menuBtnStyle2,
      rightBarStyle: rightBarStyle2
    })
  } else {
    page.setData({
      menuBtnStyle: menuBtnStyle1,
      rightBarStyle: rightBarStyle1
    })
  }
}

export const toApplication = (target) => {
  let url = '/pages/' + target + '/' + target
  wx.redirectTo({
    url: url
  })
}

const menuBtnStyleBase = `background-color: none;height: 80%;padding: 0;font-size: 10px;width: 32px;margin-top: 1%;margin-right: 5px;margin-left: 5px;background-position: center;background-repeat: no-repeat;`
const menuBtnStyle1 = menuBtnStyleBase + `background: url('` + IMAGE.menuButtonBackground1 + `')`
const menuBtnStyle2 = menuBtnStyleBase + `background: url('` + IMAGE.menuButtonBackground2 + `')`
const rightBarStyleBase = `width: 150px;height: 100%;top: 2.5rem;border-right: 1px solid black;position: fixed;background-color: rgba(255,255,255,0.9);z-index: 3;font-weight:bolder;font-size: 1rem;`
const rightBarStyle1 = rightBarStyleBase + `display: none;`
const rightBarStyle2 = rightBarStyleBase + `display: initial;`
const headBarStyle = `width: 100%;height: 2.5rem;position: fixed;top: 0;z-index: 3;background: white;`
const backBtnStyle = `background-color: none;height: 80%;padding: 0;font-size: 10px;width: 32px;margin-top: 1%;margin-left: 5px;margin-right: 5px;background-position: center;background-repeat: no-repeat;
` + `background: url('` + IMAGE.backBtnground + `');`
const barMargin = `margin-bottom:5px`