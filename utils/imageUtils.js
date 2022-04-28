
export const image = {
  filePath: '',
  imageInit: function (page) {
    this.oriPage = page
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
      }).then(res => {
        wx.saveFile({
          tempFilePath: res.tempFilePaths[0],
        }).then(res => {
          this.filePath = res.savedFilePath
          resolve(this.filePath)
        })
       
      })
    })
  },
  readAsBase64: function (filePath) {
    if (this.filePath == '') {
      this.filePath = filePath
    }
    return new Promise((resolve, reject) => {
      const fs = wx.getFileSystemManager()
      fs.readFile({
        filePath: this.filePath,
        success: (res) => {
          this.base64 = wx.arrayBufferToBase64(res.data)
          resolve(wx.arrayBufferToBase64(res.data))
        },
      })
    })
  }
}


// `
// function (page) {
//   this.oriPage = page
//   wx.chooseImage({
//     count: 1,
//     mediaType: ['image'],
//     sourceType: ['album', 'camera'],
//     maxDuration: 30,
//     camera: 'back',
//   }).then(res => {
//     wx.saveFile({
//       tempFilePath: res.tempFilePaths[0],
//     }).then(res =>{
//     this.filePath = res.savedFilePath
//     })
//   })
// }
// `