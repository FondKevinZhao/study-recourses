/*定义一个有依赖的模块*/
define(['dataService'],function (dataService) {
  let name = 'kobe'

  function speak() {
    console.log(`${name}说${dataService.getData()}`)
  }

  return {speak}

})