export const eventsOperate = {
  get: async (data) => {
    return await wx.cloud.callFunction({
      name: 'dbOperate',
      data: {
        strInterval: "get",
        data: {
          where: data,
        }
      }
    }).then(res => {
      return res
    })
  },
  add: async (data) => {
    return await wx.cloud.callFunction({
      name: 'dbOperate',
      data: {
        strInterval: "add",
        data: data
      }
    }).then(res => {
      return res
    })
  },
  update: async (data) => {
    return await wx.cloud.callFunction({
      name: 'dbOperate',
      data: {
        strInterval: "update",
        data: data
      }
    })
  },

  remove: async (data) => {
    return await wx.cloud.callFunction({
      name: 'dbOperate',
      data: {
        strInterval: "remove",
        data: data
      }
    })
  },
}

// update input
// {
//   where: {
//     _id: info[1]
//   },
//   newdata: {
//     statu: true
//   }
// }


// // remove input
// {
//   where:{
//     _id: info[1]
//   }
// }


export const classesUtils = {
  getClasses: async () => {
    return await wx.cloud.callFunction({
      name: 'classesOperate',
      data: {
        strInterval: 'getClasses',
        msg: {}
      }
    })
  }
}

export const countDownUtils = {
  getCountDownEvents: async () => {
    return await wx.cloud.callFunction({
      name: 'countDown',
      data: {
        strInterval: 'getCountDownEvents',
        msg: {}
      }
    })
  },
  editCountDownEvents: async (data) => {
    return await wx.cloud.callFunction({
      name: 'countDown',
      data: data
    })
  },
  deleteCountDownEvent: async (index) => {
    return await wx.cloud.callFunction({
      name: 'countDown',
      data: {
        strInterval: 'deleteCountDownEvent',
        msg: {
          index: index
        }
      }
    })
  }
}

export const customUtils = {
  createCustom: async () => {
    return await wx.cloud.callFunction({
      name: 'custom',
      data: {
        strInterval: 'createCustom',
        msg: {}
      }
    })
  },
  getCustom: async (pageName) => {
    return await wx.cloud.callFunction({
      name: 'custom',
      data: {
        strInterval: 'getCustom',
        msg: {
          pageName: pageName
        }
      }
    })
  }
}

export const subscribeUtils = {
  createSubscribe: async () => {
    return await wx.cloud.callFunction({
      name: 'subscribe',
      data: {
        strInterval: 'createSubscribe',
        msg: {}
      }
    })
  },
  addSubscribe: async (subInfo) => {
    return await wx.cloud.callFunction({
      name: 'subscribe',
      data: {
        strInterval: 'addSubscribe',
        msg: {
          subInfo: subInfo
        }
      }
    })
  },
  deleteSubscribe: async (id) => {
    return await wx.cloud.callFunction({
      name:'subscribe',
      data: {
        strInterval: 'deleteSubscribe',
        msg:{
          where:{
            _id:id
          }
        }
      }
    })
  }
}