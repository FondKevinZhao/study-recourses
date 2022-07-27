(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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



},{"./module1":2,"./module2":3,"./module3":4,"uniq":5}],2:[function(require,module,exports){
//模块一，暴露出去一个对象
module.exports = {
  data:'atguigu',
  foo () {
    console.log(`module1-----foo被调用了${this.data}`)
  },
  bar () {
    console.log(`module1-----bar被调用了${this.data}`)
  }
}

/*
* 有一个默认存在的关系式：module.exports = exports = {}
* */



},{}],3:[function(require,module,exports){
//暴露了一个可以执行的函数
module.exports = function () {
  console.log('module2------demo被调用了')
}

},{}],4:[function(require,module,exports){
//1.暴露了一个数组
//2.暴露了一个对象

exports.stuArr = [{name:'kobe',age:18},{name:'wade',age:19}]
exports.schoolObj = {name:'尚大',age:6}
},{}],5:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}]},{},[1]);
