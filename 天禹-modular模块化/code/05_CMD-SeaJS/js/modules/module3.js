//定义一个module3，没有依赖于其他模块
define(function (require,exports,module) {
  //数据（私有数据）
  let name = 'module3'

  //使用数据的方法
  function getName() {
    console.log(`-------${name}-------`)
  }

  exports.getName = getName
})
