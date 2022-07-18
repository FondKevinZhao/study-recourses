<template>
	 <div class="todo-header">
			<input 
				v-model="word" 
				type="text" 
				placeholder="请输入你的任务名称，按回车键确认"
				@keyup.enter="add"
			/>
		</div>
</template>

<script>
	export default {
		name:'Header',
		data(){
			return {
				word:''
			}
		},
		methods: {
			add(){
				const todoObj = {id:Date.now(),name:this.word,done:false}
				this.$emit('add-todo',todoObj)
				this.word = ''
			}
		},
	}
</script>

<style>
	/*header*/
	.todo-header input {
		width: 560px;
		height: 28px;
		font-size: 14px;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 4px 7px;
	}

	.todo-header input:focus {
		outline: none;
		border-color: rgba(82, 168, 236, 0.8);
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
	}
</style>