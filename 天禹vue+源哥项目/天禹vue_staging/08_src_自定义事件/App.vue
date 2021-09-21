<template>
	<div class="app">	
		<h2>我是App组件</h2>
		<!-- 
				如下代码是给Demo的组件实例对象定义了一个haha事件，
				只要Demo组件实例对象触发了haha事件，那么就会调用test函数
		-->

		<!-- 自定义事件的第一种方式：给Demo组件实例绑定一个自定义事件：haha -->
		<!-- <Demo @haha="test"/> -->

		<!-- 自定义事件的第二种方式：给Demo组件实例绑定一个自定义事件：haha -->
		<Demo ref="demo"/>
		
	</div>
</template>

<script>
	import Demo from './components/Demo'

	export default {
		name:'App',
		components:{Demo},
		methods:{
			test(x){
				console.log('收到了数据：',x,y,z)
			}
		},
		mounted() {
			this.$refs.demo.$on('haha',this.test)
		},
	}

</script>

<style>
	.app{
		background-color: gray;
		padding: 10px;
	}
</style>