//这个文件是对axios进行二次封装
//额外的让axios发请求的时候，具有其它的功能
// 配置基础路径和超时限制
// 添加进度条信息  nprogress
// 返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
// 统一处理请求错误, 具体请求也可以选择处理或不处理
import axios from 'axios'
// 引入nprogress相关的js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//以后只要是对axios二次封装，不会在axios身上直接去封装，而是创建一个新的axios实例进行封装
//axios.create()创建一个新的和axios具有相同功能的一个实例
const service = axios.create({
  //配置基础路径和超时限制
  baseURL: '/mock',  //设置，当前项目当中所有接口路径的公共路径部分，基础路径
  timeout: 20000,//当ajax请求超过设置的这个事件就会报错
});


// 添加进度条信息功能  nprogress
// 以后如果你想对axios添加额外的功能或者是给请求头添加额外的信息
// 必然用到axios的请求拦截器和响应拦截器

//请求拦截器，每个ajax请求都要经过这个拦截器去拦截
service.interceptors.request.use(
  // 请求拦截器当中成功的回调
  (config)=>{
    // config其实就是我们的请求报文
    // 这个请求报文，最后一定要返回去，因为还要继续往下走
    //在这里我们可以添加额外的功能，也可以给请求头添加需要的数据
    NProgress.start(); //开启进度条
    return config
  },
  // 请求拦截器当中失败的回调一般不写，因为失败了，也就没有下文了
  // () => {
  // }
);

//响应拦截器
//返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
//统一处理请求错误, 具体请求也可以选择处理或不处理
service.interceptors.response.use(
  (response) => {
    //response其实就是我们的响应报文
    //我们也是可以添加额外功能或者对响应报文进行处理
    NProgress.done(); //停止进度条
    return response.data //返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
  },
  (error) => {
    NProgress.done(); //停止进度条
    //可以统一处理错误
    alert('发送ajax请求失败'+error.message||'未知错误')
    //统一处理完成之后，这个错误可以让后面继续处理
    // return Promise.reject(new Error('发送ajax请求失败')) //后面想继续处理这个错误，返回失败的promise
    //也可以不让后面继续处理这个错误，中断promise链
    return new Promise(() => {})  //返回的是pending状态的promise，代表中断promise链，后期也就没办法处理了
  }
);


export default service  //把封装好的axios实例，暴露出去，后面去用








