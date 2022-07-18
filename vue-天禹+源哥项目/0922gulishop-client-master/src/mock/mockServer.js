//这个文件就是专门来模拟mock数据接口的
import Mock from 'mockjs'
import banner from './banner.json'
import floor from '@/mock/floor'

//这两行就是在模拟数据接口
Mock.mock('/mock/banner',{code:200,data:banner}) //第一个参数，代表我们以后请求的路径，第二个参数代表返回的数据
Mock.mock('/mock/floor',{code:200,data:floor}) //第一个参数，代表我们以后请求的路径，第二个参数代表返回的数据
