/*AMD_require.js模块化的入口文件，要编写配置对象，并且有固定的写法*/

//在如下代码中配置所有模块的名称以及对应的地址
requirejs.config({
  baseUrl: './js/', //如果使用了baseUrl，那么路径的出发点在index.html所在的文件夹
  paths: {
    dataService: 'modules/dataService',
    loger:'modules/loger',
    jquery:'libs/jquery-1.10.1'
  }
});

//使用模块
requirejs(['loger','jquery'],function(loger,$) {
  loger.speak()
  //console.log($)
  $('body').css('background','skyblue')

});