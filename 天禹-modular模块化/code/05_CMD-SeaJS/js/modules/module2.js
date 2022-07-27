//定义一个module2，没有依赖于其他模块
define(function (require,exports,module) {
  //数据（私有数据）
  let name = 'module2'

  //使用数据的方法
  function getName() {
    console.log(`-------${name}-------`)
  }

  module.exports = getName
})