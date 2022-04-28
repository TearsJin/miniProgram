let oriPage = null
let todayDate = new Date()
  let dateAry = todayDate.toArray()

export const clanderInit = (page) =>{
  oriPage = page
  oriPage.pageDate = new Date()
  oriPage.clanderNext = () => {
    let tempAry = oriPage.pageDate.toArray()
    oriPage.pageDate = new Date(tempAry[0], tempAry[1] + 1, 1)
    clanderUpdate(oriPage.pageDate, oriPage.pageDate.getDay())
  }

  oriPage.clanderLast = () => {
    let tempAry = oriPage.pageDate.toArray()
    oriPage.pageDate = new Date(tempAry[0], tempAry[1] - 1, 1)
    clanderUpdate(oriPage.pageDate, oriPage.pageDate.getDay())
  }

  let tempAry = oriPage.pageDate.toArray()
  oriPage.pageDate = new Date(tempAry[0], tempAry[1], 1)
  clanderUpdate(oriPage.pageDate, oriPage.pageDate.getDay())

}

function clanderUpdate(date, firstWeekDay) {
  let clander = new Array()
  let maxDayNum = date.MaxDayOfDate()
  let maxLastDayNum = date.DateAdd('m', -1).MaxDayOfDate()
  let tempAry = date.toArray()
  let isThisMonth = (date.getFullYear() == todayDate.getFullYear() && date.getMonth() == todayDate.getMonth())
  let i = 0
  tempAry = []
  for (i = -firstWeekDay + 1; i < 8 - firstWeekDay; i++) {
    if (i <= 0) tempAry.push(-(i + maxLastDayNum))
    else {
      if (isThisMonth & i == todayDate.getDate()) {
        tempAry.push(i + 31)
      } else {
        tempAry.push(i)
      }
    }
  }
  clander.push(tempAry)
  tempAry = []
  while (i <= maxDayNum) {
    if (isThisMonth & i == todayDate.getDate()) {
      tempAry.push(i + 31)
    } else {
      tempAry.push(i)
    }
    if (tempAry.length == 7) {
      clander.push(tempAry)
      tempAry = []
    }
    i++
  }
  let leftLen = tempAry.length
  for (i = 1; i < 8 - leftLen; i++) tempAry.push(-i)
  clander.push(tempAry)
  tempAry = []
  let t = i + 7
  if (clander.length != 6) {
    while (i < t) {
      tempAry.push(-i)
      i++
    }
    clander.push(tempAry)
  }
  tempAry = date.toArray()
  oriPage.setData({
    "clander": clander,
    "clanderYm": String(tempAry[0]) + "年" + String(tempAry[1] + 1) + "月"
  })
}