<template>
	<div class="p">
		<h2>我是Person组件</h2>
		<h3>求和为：{{sum}}</h3>
	</div>
</template>

<script>
	export default {
		name:'Person',
		computed:{
			sum(){
				return this.$store.state.sum
			}
		}
	}
</script>

<style>
	.p{
		background-color: gray;
		padding:10px;
	}
</style>