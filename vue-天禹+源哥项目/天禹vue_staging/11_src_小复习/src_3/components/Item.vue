<template>
	<li>
		<label>
			<input type="checkbox" :checked="todo.done" @click="updateTodo(index,$event)"/>
			<span>{{todo.name}}</span>
		</label>
		<button class="btn btn-danger" style="display:none">删除</button>
	</li>
</template>

<script>
	export default {
		name:'Item',
		props:['todo','index','gengxinTodo'],
		methods:{
			updateTodo(index,event){
				// console.log('updateTodo',index,event.target.checked)
				this.gengxinTodo(index,event.target.checked)
			}
		}
	}
</script>

<style>
	/*item*/
	li {
		list-style: none;
		height: 36px;
		line-height: 36px;
		padding: 0 5px;
		border-bottom: 1px solid #ddd;
	}

	li label {
		float: left;
		cursor: pointer;
	}

	li label li input {
		vertical-align: middle;
		margin-right: 6px;
		position: relative;
		top: -1px;
	}

	li button {
		float: right;
		display: none;
		margin-top: 3px;
	}

	li:before {
		content: initial;
	}

	li:last-child {
		border-bottom: none;
	}
</style>