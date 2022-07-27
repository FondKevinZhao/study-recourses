//引入自定义模块
let module1 = require('./module1')
let module2 = require('./module2')
let module3 = require('./module3')

//引入第三方模块
let uniq = require('uniq')

//使用模块
//如何使用一个模块，取决于模块暴露的是什么

console.log(module1.data);
module1.bar()
module1.foo()
module2()
console.log(module3.schoolObj);
console.log(module3.stuArr)
let result = uniq([1,3,3,3,2,2,2,5,6,5,4,9,8,7,11,10])
console.log(result);


