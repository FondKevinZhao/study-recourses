'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;
exports.bar = bar;
/*
* 分别暴露
* export xxxx
* */

function foo() {
  console.log('module1---foo被执行了');
}

function bar() {
  console.log('module1---foo被执行了');
}