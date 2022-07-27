'use strict';

var _module = require('module1');

var _module2 = require('./module2');

var _module3 = require('./module3');

var _module4 = _interopRequireDefault(_module3);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//只有使用默认暴露，才可以使用下面的引入语法
//引入模块:import

//如果使用了分别暴露、统一暴露，就要使用如下的引入方法
(0, _module.foo)();
(0, _module.bar)();
(0, _module2.demo)();
(0, _module2.demo2)();
console.log(_module4.default.stuName);
_module4.default.setStuName('wade3');
console.log(_module4.default.stuName);
(0, _jquery2.default)('body').css('background', 'skyblue');
//console.log(stuName);
console.log(_module3.a);