// vue.config.js
module.exports = {
	lintOnSave: false,
	//配置代理---简单方式---只能配一个
	/* devServer:{
		proxy:"http://localhost:5000"
	} */

	//配代理----完整方式----能配多个
	devServer: {
		proxy: {
			'/api1': {// 匹配所有以 '/api'开头的请求路径
				target: 'http://localhost:5000',// 代理目标的基础路径
				changeOrigin: true,
				pathRewrite: {'^/api1': ''}
			},
			'/api2': {// 匹配所有以 '/api'开头的请求路径
				target: 'http://localhost:5001',// 代理目标的基础路径
				changeOrigin: true,
				pathRewrite: {'^/api2': ''}
			}
		}
	}
}