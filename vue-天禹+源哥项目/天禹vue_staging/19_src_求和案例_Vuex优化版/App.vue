<template>
	<div class="app">
		<h2>我是App组件</h2>
		<Count/>
		<Person/>
  </div>
</template>

<script>
	import Count from './components/Count'
	import Person from './components/Person'

	export default {
		name:'App',
		components:{Count,Person},
	}
</script>

<style>
	.app{
		background-color: skyblue;
		padding: 10px;
	}
</style>
