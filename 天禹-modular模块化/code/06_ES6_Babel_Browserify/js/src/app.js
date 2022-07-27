//引入模块:import

//如果使用了分别暴露、统一暴露，就要使用如下的引入方法
import {foo,bar} from './module1'
import {demo,demo2} from './module2'

//只有使用默认暴露，才可以使用下面的引入语法
import module3,{a} from './module3'
import $ from 'jquery'

foo()
bar()
demo()
demo2()
console.log(module3.stuName);
module3.setStuName('wade3')
console.log(module3.stuName);
$('body').css('background','skyblue')
//console.log(stuName);
console.log(a);

