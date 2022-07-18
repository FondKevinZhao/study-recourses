<template>
	<div class="demo">
		<h3>我是Demo组件</h3>
		<h4>我有一台电脑，是{{computer}}</h4>
		<button @click="sedComp">把电脑传给父亲</button>
	</div>
</template>

<script>
	export default {
		name:'Demo',
		data(){
			return {
				computer:'联想拯救者'
			}
		},
		methods: {
			sedComp(){
				this.$emit('ha-ha',this.computer)
			}
		},
		mounted() {
			this.$bus.$on('shui-guo',function(f,a,b,c){
				console.log('Demo收到了',f,a,b,c)
			})
		},
	}
</script>

<style>
	.demo{
		background-color: orange;
		padding: 5px;
	}
</style>