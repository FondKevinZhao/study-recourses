<template>
	<div class="food">
		<h3>我是Hello</h3>
		<h4>我有一个食物：{{food}}</h4>
		<button @click="sendFood">点我给Demo传递食物</button>
	</div>
</template>

<script>
	export default {
		name:'Hello',
		data(){
			return {
				food:'苹果'
			}
		},
		methods: {
			sendFood(){
				this.$bus.$emit('shui-guo',this.food,'老刘',18,'女')
			}
		},
	}
</script>

<style>
	.food{
		background-color: skyblue;
		padding: 10px;
	}
</style>