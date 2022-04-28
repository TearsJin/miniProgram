let oriPage = ''

export let getWater = new Promise((resolve,reject) => {
  wx.cloud.callFunction({
    name: 'getWater',
    data: {},
  }).then(res =>{
      resolve(res)
  })
})

export const waterInit = (page) => {
  oriPage = page
  page.setData({
    waterStyle: "",
    waterTitle: "",
    waterTr: "",
    waterTd: "",
    waterTitleText: '水电费查询中...'
  })
  oriPage.waterFresh = (e) =>{
    getWater = new Promise((resolve,reject) => {
      wx.cloud.callFunction({
        name: 'getWater',
        data: {},
      }).then(res =>{
          resolve(res)
      })
    })
    waterInit(oriPage)
  }
  getWater.then(res => {
    try {
      let info = res.result[0].result
      let waterBalance = info.balance
      let waterElectricityUsage = info.bill.electricity.usage
      let waterElectricityAllowance = info.allowance.electricity.total
      let waterElectricityPrice = info.bill.electricity.price
      let waterElectricity = (info.bill.electricity.usage - info.allowance.electricity.total > 0) ? (info.bill.electricity.usage - info.allowance.electricity.total) * info.bill.electricity.price : 0
      let waterHotUsage = info.bill.hotWater.usage
      let waterHotAllowance = info.allowance.hotWater.total
      let waterHotPrice = info.bill.hotWater.price
      let waterHot = (info.bill.hotWater.usage - info.allowance.hotWater.total > 0) ? (info.bill.hotWater.usage - info.allowance.hotWater.total) * info.bill.hotWater.price : 0
      let waterColdUsage = info.bill.coldWater.usage
      let waterColdAllowance = info.allowance.coldWater.total
      let waterColdPrice = info.bill.coldWater.price
      let waterCold = (info.bill.coldWater.usage - info.allowance.coldWater.total > 0) ? (info.bill.coldWater.usage - info.allowance.coldWater.total) * info.bill.coldWater.price : 0
      oriPage.setData({
        waterTitleText: `${res.result[1]}`,
        waterBalance: waterBalance,

        waterElectricityUsage:waterElectricityUsage.toFixed(2),
        waterElectricityAllowance:waterElectricityAllowance.toFixed(2),
        waterElectricityPrice:waterElectricityPrice.toFixed(2),
        waterElectricity:waterElectricity.toFixed(2),

        waterHotUsage: waterHotUsage.toFixed(2),
        waterHotAllowance:waterHotAllowance.toFixed(2),
        waterHotPrice:waterHotPrice.toFixed(2),
        waterHot:waterHot.toFixed(2),

        waterColdUsage:waterColdUsage.toFixed(2),
        waterColdAllowance:waterColdAllowance.toFixed(2),
        waterColdPrice:waterColdPrice.toFixed(2),
        waterCold:waterCold.toFixed(2),
      })
    } catch (e) {
      oriPage.setData({
        waterTitleText: res.result,
      })
    }
  })
}

