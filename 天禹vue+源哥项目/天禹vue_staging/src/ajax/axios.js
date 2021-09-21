import axios from 'axios'

//请求拦截器--本质是一个函数，请求真正发出去之前会调用该函数，掉完该函数，再发请求
axios.interceptors.request.use((config)=>{
	// config.headers.demo = 123 //给所有ajax请求追加请求头
	// config.params.age = 18 //给所有ajax请求追加query参数
	// console.log('请求拦截器函数执行了') 
	return config
})

axios.interceptors.response.use(
	(reponse)=>{ //响应成功走这个函数（状态码2开头）
		// console.log('响应拦截器，成功的回调执行了',reponse)
		return reponse.data
	}, 
	(error)=>{//响应失败走这个函数（状态不是2开头）
		// console.log('响应拦截器，失败的回调执行了',error)
		//此处返回的若是非Promise值，则组件中走成功的回调
		//此处返回的若是成功的Promise值，则组件中走成功的回调
		//此处返回的若是失败的Promise值，则组件中走失败的回调
		//此处返回的若是初始化的Promise值，则组件啥也不走
		alert(error.message)
		return new Promise(()=>{})
	}
)

export default axios