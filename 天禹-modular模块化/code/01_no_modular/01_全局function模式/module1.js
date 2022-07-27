/**
 * 全局函数模式: 将不同的功能封装成不同的全局函数
 * 问题: Global被污染了, 很容易引起命名冲突
 */
//数据
let data = 'module1 atguigu.com'
//操作数据的方法
function foo() {
    console.log(`foo() ${data}`)
}
function bar() {
    console.log(`bar() ${data}`)
}
