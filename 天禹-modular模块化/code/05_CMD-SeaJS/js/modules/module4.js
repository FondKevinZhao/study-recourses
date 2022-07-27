//定义一个module4，依赖于module2，module3
define(function (require,exports,module) {
  let name = 'module4'

  function getName() {
    console.log(`-------${name}-------`)
  }

  //同步引入module2
  let module2 = require('./module2')
  module2()

  //异步引入module3
  require.async('./module3',function (m3) {
    m3.getName()
  })

  exports.getName = getName

})
