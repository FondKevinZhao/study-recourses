'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
* 统一暴露
* export {xxx, yyy}
* */

function demo() {
  console.log('module2---demo被调用了');
}

function demo2() {
  console.log('module2---demo2被调用了');
}

exports.demo = demo;
exports.demo2 = demo2;