/* 
	较真来讲：当前的这个.vue文件，并不是一个组件，而是一个组件的所有配置
 */

/* 配置组件模板结构 */
<template>
	<div>
		<h2 class="title" class="title">学校名：{{name}}</h2>
		<h2 class="info" @click="showAddress">学校地址：{{address}}</h2>	
	</div>
</template>

/* 配置组件数据、交互、事件等等 */
<script>
	//此处只是暴露了一个组件的配置，并没有去创建组件，因为没有调用Vue.extend
	export default {
		//data中存放组件所需数据
		data(){ 
			return {
				name:'尚硅谷',
				address:'北七家镇-宏福科技园'
			}
		},
		methods:{
			showAddress(){
				alert(this.address)
			}
		}
	}
</script>	

/* 配置组件样式 */
<style>
	.title{
		background-color: orange;
	}
	.info{
		background-color: pink;
	}
</style>