<template>
	<div class="demo1">
		<h2>我是Demo1组件</h2>
		<h3>收到的name是：{{name}}</h3>
	</div>
</template>

<script>
	export default {
		name:'Demo1',
		data(){
			return {
				name:''
			}
		},
		methods:{
			test1(x){
				console.log('Demo1收到了数据：',x)
				this.name = x
			},
		},
		mounted() {
			this.$bus.$on('nice',this.test1)
		},
		beforeDestroy(){
			this.$bus.$off('nice')
		}
	}
</script>

<style>
	.demo1{
		background-color: gray;
		padding: 10px;
	}
</style>