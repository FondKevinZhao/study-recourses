<template>
	<div class="app">	
		<h2>我是App组件</h2>
		<Demo1/>
		<Demo2/>
	</div>
</template>

<script>
	import Demo1 from './components/Demo1'
	import Demo2 from './components/Demo2'

	export default {
		name:'App',
		components:{Demo1,Demo2}
	}
</script>

<style>
	.app{
		background-color: orange;
		padding: 10px;
	}
</style>