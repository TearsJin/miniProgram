# utils

* clander.js - 日历模块

  ```javascript
  function clanderInit(page){
  /*
      为页面添加函数:
          1. clanderLast()
          2. clanderNext()
          3. clickDay(e) , 该函数按实际需求更改
      并初始化日历
  */ 
  }
  function clanderUpdate(date,firstWeekDay){
  /*
  	更新日历显示的数字
  */
  }
  
  ```
  
  

* bar.js 导航栏模块

  ```js
  function barInit(page){
  	/*
  		设置导航栏样式
  		添加函数
  			1. callBarFunction // 导航栏点击事件接口，可以添加多个事件
  	*/
  }
  
  function displayRightBar(){
      /*
      	侧栏开关函数
      */
  }
  
  function toApplication(){
      /*
      	页面跳转函数
      */
  }
  ```

  

* cloudUtils.js 云函数接口模块

  ```js
  eventsOperate{
  	function get(data){},
      function add(data){},
      function update(data){},
      function remove(data){}
  }
  
  classesUtils{
      function getClaseese(){}
  }
  ```

  

* eventsUtils.js 事件模块

  ```js
  // 需要cloudUtils模块
  function eventsInit(page){
      /*
      	设置样式
      	添加函数
      		1. changeStatu 单击更改事件完成状态函数
      		2. deleteEvent 长按删除事件函数
      */
  }
  function getEvents(){
      /*
      	获取所有事件
      	返回的是一个Promise对象
      */
  }
  
  function getTodayEvents(dateString){
      /*
      	获取某一天的事件
      */
  }
  ```

* image.js 图片存储

  ```js
  IMAGE{
      /*
  		静态图片资源的base64
      */
  }
  ```

* water.js 水电查询模块

  ```js
  function waterInit(page){
      /*
      	设置水电查询模块样式
      	查询水电费
      */
  }
  function getWater(){
      /*
      	查询水电函数
      */
  }
  ```

  

  