<template>
	<div class="demo2">
		<h2>我是Demo2组件</h2>
		<button @click="sendData">给Demo1传递数据</button>
	</div>
</template>

<script>
	export default {
		name:'Demo2',
		mounted() {
			// console.log(this.$bus)
			console.log(this.$bus.__proto__===this.prototype)
		},
		methods:{
			sendData(){
				//触发全局的nice事件
				this.$bus.$emit('nice','老刘')
				// console.log(this)
			}
		},
	}
</script>

<style>
	.demo2{
		background-color: skyblue;
		padding: 10px;
	}
</style>