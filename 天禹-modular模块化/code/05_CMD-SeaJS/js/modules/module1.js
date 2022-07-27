//定义一个module1，没有依赖于其他模块
define(function (require,exports,module) {
  //数据（私有数据）
  let name = 'module1'
  
  function getName() {
    console.log(`-------${name}-------`)
  }

  module.exports = {getName}
})

