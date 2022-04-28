* 在使用db.collection的函数时，得到的结果要用then处理
* 变量尽量用var 别用let
* get()获得的res.data是一个数组，就算只有一条也是个数组，需要用res.data[0]获取
* 在一个模块中如果需要提供一个Promise的API的时候，不要直接暴露一个Promise对象，这样做永远都是同一个Promise对象，这意味着这个对象只能使用一次。正确的做法应该是暴露一个返回新Promise对象的函数。
* 手机测试白屏说明js有报错

> 图片的使用: 在js文件中添加`import {IMAGE} from '../../utils/image.js'`，然后再image.js中添加对应的base64即可

> 新页面的建立，记得添加导航栏模块，并在导航栏模块中添加该页面，具体添加步骤：include两个wxml并在js中init

> countDown的测试中发现图片太大会影响上传接口的使用 在数据中添加操作字段，根据字段对数据库中的图片数据进行不同的操作

> json中的键值不能直接放变量，放变量会当成是一个值为变量名的字符串，如果想定义一些键值是变量的JSON，应该先构造出JSON的字符串再用`JSON.parse(String)`
>
> 

> ```js
> // 字段设置
> op = {
> 	'c' : '清空数据库中Pic数据并将当前数据存进数据库',
> 	'a' : '追加Pic数据' // 在正常使用的过程中，如果op字段为'a'，则不会有name，date数据的上传，以减少流量
> }
> ```
>



> 对于用户习惯自定义的
> 4.3 想法：创建一个库，里面存放用户自定义的样式数据，每次用户进入，读进来用即可
> 但这样就导致需要将很多样式设置成变量。。。工作量有点小多，而且不好找，暂时还没有找到什么替代方法
>
> * 侧栏左右显示
>   * bar.js   
>     * menuBtnStyleBaseFloat : left / right
>     * rightBarStyleBaseSide: left / right 
>     * backBtnStyleFloat: right / left
> * 主页组件选用
> * 倒计时每行格数

> moduleSelect 相关的逻辑
> 从数据库拿到自定义数据:
>
> * 用户需要哪些模块

* 3/24
  
  * 将部分重复代码模块化
  * 将原代码中调运云函数的API分离出来，集成在cloudUtils.js中
* 3/25
  
  * 完成events页面的主要js代码
* 3/26
  * 将test的部分代码模块化
  * 解决事项不刷新问题
  * 新建一个mamul.md用来记录各模块信息
* 3/27
  * 新建Help页面
  * 完善mamul.md
* 3/30
  * 新建countDown模块等一些相关的API文件
  * 新建template集合用于存储服务器端用的静态资源
  * 修复test页面今日待办中课程不显示的问题
* 3/31
  * 完善countDown的云API，还剩下一个Add函数未完成
  * 完成单击countDown方格更改背景和时间功能
  * 还剩长按删除功能和添加方格功能
  * 新添加imageUtils.js，用于上传本地图片，并支持转成Base64
* 4/1
  * 图片上传存在如果图片太大则会调用云函数失败的问题，尝试压缩图片
* 4/2
  * 尝试调整云函数接口，使大图能够分段上传

* 4/3
  * 完成大图分段上传代码，并添加上传进度显示（仅数字，后续可改成进度条形式
  * 完成倒计时图块添加功能

  ```
  CTFinfo获取
  <!-- <view >
  <block wx:for="{{comp}}" wx:key="index">
    <view class="table">
      <view> <a class="ctfinformation" dref="{{item.URL}}">{{item.SUMMARY}} - {{item.DTSTART}}</a></view>
    </view>
  </block>
  </view> -->


  getCTFinfo(){
    // CTF信息获取

    wx.request({
      url: 'https://api.ctfhub.com/User_API/Event/getAllICS',
      method : 'POST',
      header : {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType : 'json',
      responseType: 'text',
      success: (res)=>{
        let arr = res.data.split("\n")
        let time = new Date().toLocaleDateString().split('/')
        let formatTime = Number(time[0] + util.zFill(time[1],2) + util.zFill(time[2],2))
        // 找到最近的比赛
        let nearTimeIndex = 0
        while(nearTimeIndex < arr.length ){
          if(arr[nearTimeIndex].indexOf("DTEND") != -1){
            let compTime = Number(arr[nearTimeIndex].slice(6,14))
            if(compTime < formatTime){
              break;
            }
          }
          nearTimeIndex += 1
        }
    
        let compNum = 0
        let comps = new Array()
        let compText = "{"
        let numsLimit = 7
        for(let i = nearTimeIndex + 8;i > 0;i--){
          if(arr[i].indexOf("URL") != -1){
            compText = compText + '"URL": "' + arr[i].slice(arr[i].indexOf("http"),-2) + '", '
          }else if(arr[i].indexOf("DTSTART") != -1){
            compText = compText + '"DTSTART": "' + arr[i].slice(8,12) + '/'+ arr[i].slice(12,14) + '/'+ arr[i].slice(14,16) +'", '
          }else if(arr[i].indexOf("SUMMARY") != -1){
            compText = compText + '"SUMMARY": "' + arr[i].slice(8).replace(/\s/g," ") + '"}'
            comps.push(JSON.parse(compText))
            compNum += 1
            compText = "{"
          }
          if(compNum == numsLimit) break
        }
          this.setData({"comp":comps})
      }
    })
  },
  ```
