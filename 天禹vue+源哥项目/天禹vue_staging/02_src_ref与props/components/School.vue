<template>
	<div>
		<h2 class="name">学校名：{{name}}</h2>
		<h2 class="address">学校地址：{{address}}</h2>
		<h4>我收到的名字是{{username}}</h4>
	</div>
</template>

<script>
	export default {
		//配置数据
		data(){
			console.log('School',this)
			return {
				name:'尚硅谷',
				address:'北七家镇-宏福科技园'
			}
		},
		//声明接收props---最完整的写法：限制了类型、控制了必要性、指定了默认值
		/* props:{
			username:{
				type:String, //类型
				required:true, //必要性
				default:'隔壁老王' //默认值
			}
		} */

		//声明接收props---次完整的写法：限制了类型
		/* props:{
			username:String
		} */

		//声明接收props---精简的写法：啥也不限制
		props:['username']
	}
</script>

<style>
	.name{
		background-color: gray;
	}
	.address{
		background-color: orange;
	}
</style>