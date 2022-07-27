let data = 'module2 other data'

//与另一个模块中的函数冲突了
function foo() {
  console.log(`foo() ${data2}`)
}