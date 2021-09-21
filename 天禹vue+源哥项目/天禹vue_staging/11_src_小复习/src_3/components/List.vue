<template>
	<ul class="todo-main">
		<Item v-for="(t,index) in todos" :key="t.id" :todo="t" :index="index" :gengxinTodo="gengxin"/>
	</ul>
</template>

<script>
	import Item from './Item'

	export default {
		name:'List',
		components:{Item},
		props:['todos','gengxin'],
	}
</script>

<style>
	/*main*/
	.todo-main {
		margin-left: 0px;
		border: 1px solid #ddd;
		border-radius: 2px;
		padding: 0px;
	}

	.todo-empty {
		height: 40px;
		line-height: 40px;
		border: 1px solid #ddd;
		border-radius: 2px;
		padding-left: 5px;
		margin-top: 10px;
	}
</style>