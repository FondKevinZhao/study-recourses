/*定义一个没有依赖的模块*/
define(function () {
  //里面写该模块的任意代码
  let data = 'hello!atguigu'

  function getData() {
    return data
  }

  return {getData}
})
