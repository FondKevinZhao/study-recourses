<template>
	<div>
		<h1 class="welcome">欢迎学习前端最火的框架Vue</h1>
		<HelloWord/>
	</div>
</template>

<script>
	//引入App外壳组件
	import HelloWord from './components/HelloWorld'

	export default {
		components:{HelloWord}
	}
</script>

<style>
	.welcome{
		background-color: gray;
	}
</style>