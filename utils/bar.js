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
      rightBarStyle: rightBarStyle2,
      // rightBarBodyDisplay: 'display:none;',
    })
    // 设置动画
    page.animate('.rightBarContent', [
      { left: -100},
      { left: 0 },
      ],200,function () {
      }.bind(page))
    page.animate('.rightBar',[
      {width:100,backgroundColor: '#00000000'} ,
      {width:110,backgroundColor: '#00000090'} ,
    ], 200)
  } else {
    page.animate('.rightBarContent', [
      { left: 0},
      { left: -100 },
      ],200,function () {
        page.setData({
          menuBtnStyle: menuBtnStyle1,
          rightBarStyle: rightBarStyle1
        })
        page.clearAnimation('.rightBarContent')
        page.clearAnimation('.rightBar')
      }.bind(page))
      page.animate('.rightBar',[
        {width:100,backgroundColor: '#00000090'} ,
        {width:110,backgroundColor: '#00000000'} ,
      ], 200)
  }
}

export const toApplication = (target) => {
  let url = '/pages/' + target + '/' + target
  wx.redirectTo({
    url: url
  })
}

const menuBtnStyleBase = `background-color: white;height: 80%;padding: 0;font-size: 10px;width: 32px;margin-top: 1%;margin-right: 5px;margin-left: 5px;background-position: center;background-repeat: no-repeat;`
const menuBtnStyle1 = menuBtnStyleBase + `background: url('` + IMAGE.menuButtonBackground1 + `')`
const menuBtnStyle2 = menuBtnStyleBase + `background: url('` + IMAGE.menuButtonBackground2 + `')`
const rightBarStyleBase = `width: 100%;height: 100%;top: 2.3rem;border-right: 1px solid white;position: fixed;z-index: 3;font-weight:bolder;font-size: 1rem;`
const rightBarStyle1 = rightBarStyleBase + `display: none;`
const rightBarStyle2 = rightBarStyleBase + `display: initial;`
const headBarStyle = `width: 100%;height: 2.3rem;position: fixed;top: 0;z-index: 3;background-color: #38436f;`
const backBtnStyle = `background-color: white;height: 80%;padding: 0;font-size: 10px;width: 32px;margin-top: 1%;margin-left: 5px;margin-right: 5px;background-position: center;background-repeat: no-repeat;
` + `background: url('` + IMAGE.backBtnground + `');`
const barMargin = `margin-top:1rem;margin-left:1rem;font-size:1.2rem;color:white;display:flex;align-items:center;`