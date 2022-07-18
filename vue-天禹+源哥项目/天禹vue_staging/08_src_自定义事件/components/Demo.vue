<template>
	<div class="demo">
		<h2>我是Demo组件</h2>
		<button @click="sendData">点我给App传递数据</button>
	</div>
</template>

<script>
	export default {
		name:'Demo',
		data(){
			return {
				name:'老刘'
			}
		},
		methods:{
			sendData(){
				this.$emit('haha',this.name)
			}
		}
	}
</script>

<style>
	.demo{
		background-color: skyblue;
		padding: 5px;
	}
</style>