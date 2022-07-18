<template>
	<li
		@mouseenter="isEnter = true"
		@mouseleave="isEnter = false"
		:class="{'high-ligth':isEnter}"
	>
		<label>
			<input type="checkbox" :checked="todo.done" @click="update(index,$event)"/>
			<span>{{todo.name}}</span>
		</label>
		<button 
			class="btn btn-danger" 
			:style="{display:isEnter ? 'block' : 'none'}"
			@click="deleteT(index)"
		>删除</button>
	</li>
</template>

<script>
	export default {
		name:'Item',
		props:['todo','updateTodo','index','deleteTodo'],
		data(){
			return {
				isEnter:false //标识鼠标是否移入
			}
		},
		methods:{
			//用id去更新
			/* update(id,event){
				//通知App去更新这个todo
				const {checked} = event.target
				this.updateTodo(id,checked)
			} */

			//用index去更新todo
			update(index,event){
				//通知App去更新这个todo
				const {checked} = event.target
				this.updateTodo(index,checked)
			},

			//用于index去删除一个todo
			deleteT(index){
				if(confirm('确定删除吗')){
					this.deleteTodo(index)
				}
			}
		}
	}
</script>

<style scoped>
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
	
	.high-ligth{
		background-color: #ddd;
	}
</style>