/*
* 创建一个可写流
*   fs.createWriteStream(path[, options])
*       --path:要写入文件的路径+文件名+文件后缀
*       --options：配置对象（可选参数）
*           --flags:
*           --encoding :
*           --fd : 文件统一标识符，linux下文件标识符
*           --mode :
*           --autoClose : 自动关闭 --- 文件，默认值：true
*           --emitClose : 关闭 --- 文件，默认值：false
*           --start : 写入文件的起始位置(偏移量)
* */


let fs = require('fs')

//创建一个可写流----水管到位了
let ws = fs.createWriteStream(__dirname+'/demo.txt',{start:10})

//只要用到了流，就必须监测流的状态
ws.on('open',function () {
  console.log('可写流打开了')
})
ws.on('close',function () {
  console.log('可写流关闭了')
})

//使用可写流写入数据
ws.write('美女\n')
ws.write('霉女？\n')
ws.write('到底是哪一个？\n')
//ws.close() //如果在Node的8版本中，使用此方法关闭流会造成数据丢失
ws.end() //在Node的8版本中，要用end方法关闭流

