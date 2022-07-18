<template>
	<div class="todo-header">
		<input 
			v-model="name" 
			@keyup.enter="add"
			type="text" 
			placeholder="请输入你的任务名称，按回车键确认"
		/>
	</div>
</template>

<script>
	export default {
		name:'Header',
		data(){
			return {
				name:''
			}
		},
		methods:{
			add(){
				//校验数据
				if(!this.name.trim()) return alert('输入不能为空')
				//根据用户的输入生成一个todo对象
				const todoObj = {id:Date.now(),name:this.name,done:false}
				//使用自定义事件去通知App在data中去添加一个todo
				this.$emit('add-todo',todoObj)
				//清空输入
				this.name = ''
			}
		}
	}
</script>

<style scoped>
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