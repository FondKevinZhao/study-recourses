<template>
	<div>
		<!-- 
			ref的使用：
					1.标签中直接编写 ref="xxxx"
					2.通过this.$refs.xxxx获取
					3.备注：
							1.若给html内置标签打ref，则获取到的是真实DOM节点。
							2.若给组件标签打ref，则获取到的是组件实例对象。
		-->
		<button ref="btn" @click="showData">点我获取焦点</button>
		<!-- 给input标签打了一个ref，input标签是html内置的标签，所以通过this.$refs.keyWord获取到的是真实DOM节点 -->
		<input type="text" ref="keyWord">
		<!-- 给School标签打了一个ref,School标签是组件标签，所以通过this.$refs.xuexiao获取到的是组件实例 -->
		<School ref="xuexiao" :username="username"/>
	</div>
</template>

<script>
	//引入School组件
	import School from './components/School'

	export default {
		data(){
			return {
				username:"老刘"
			}
		},
		//注册组件--局部注册
		components:{School},
		//配置方法
		methods:{
			showData(){
				// console.log(this.$refs.btn.innerText)
				this.$refs.keyWord.focus()
				console.log(this.$refs.xuexiao)
			}
		}
	}
</script>
