<template>
	<div class="c">
		<h2>当前求和为：{{sum}}</h2>
		<h4>vuex中的人名是{{name}}</h4>
		<h2>当前求和经过处理之后为：{{bigSum}}</h2>
		<select v-model.number="n">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>&nbsp;
		<button @click="increment(n)">+</button>&nbsp;
		<button @click="decrement(n)">-</button>&nbsp;
		<button @click="jiaOdd(n)">奇数再加</button>&nbsp;
		<button @click="jiaAsync(n)">异步加</button>
	</div>
</template>

<script>
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	export default {
		name:'Count',
		data(){
			return {
				n:1 //n是用户选择的数字
			}
		},
		mounted(){
			const x = mapState({he:'sum'})
			console.log('@@@',x)
		},
		computed:{
			//自己写计算属性定义he，值来自于state中的sum
			/* he(){
				return this.$store.state.sum
			},
			ming(){
				return this.$store.state.name
			}, */

			//靠mapState生成计算属性
			/* ...mapState({
				he:'sum', //he控制的是模板中读取的属性，'sum'控制的是读取state中的哪个属性
				ming:'name'
			}) */

			/* ****************************************************************** */

			//自己写计算属性定义he，值来自于state中的sum
			/* sum(){
				return this.$store.state.sum
			},
			name(){
				return this.$store.state.name
			}, */

			//靠mapState生成计算属性
			...mapState(['sum','name']),

			
			//自己写计算属性定义bigSum，值来自于getters中的bigSum
			/* bigSum(){
				return this.$store.getters.bigSum
			}  */

			//靠mapGetters生成计算属性——和mapState同理
			...mapGetters(['bigSum'])

			
		},
		methods:{
			//靠自己写increment方法，和mutations中的JIA对话，完成加
			//靠自己写decrement方法，和mutations中的JIAN对话，完成减
			/* increment(value){
						this.$store.commit('JIA',value)
				 },
				 decrement(value){
						this.$store.commit('JIAN',value)
					}, 
			*/

			//靠mapMutations生成increment函数，和mutations中的JIA对话，完成加
			//靠mapMutations生成decrement函数，和mutations中的JIAN对话，完成减
			...mapMutations({
				increment:'JIA',
				decrement:'JIAN',
			}),
			//mapMutations也可以简写成一个数组，但必须保证mutations的函数名，和组件中的事件的回调同名
			// ...mapMutations(['JIA','JIAN'])


			/* ************************************************************************************* */


			//靠自己写incrementOdd方法，和actions中的jiaOdd对话，完成奇数加
			//靠自己写incrementAsync方法，和actions中的jiaAsync对话，完成异步加
			/* incrementOdd(value){
				this.$store.dispatch('jiaOdd',value)
			},
			incrementAsync(value){
				this.$store.dispatch('jiaAsync',value) 
			}, */

			//靠mapActions生成incrementOdd方法，和actions中的jiaOdd对话，完成奇数加
			//靠mapActions生成incrementAsync方法，和actions中的jiaAsync对话，完成异步加
			/* ...mapActions({
				incrementOdd:'jiaOdd',
				incrementAsync:'jiaAsync'
			}) */

			//若回调名和actions中的动作名是一致的，则可以简写一个数组
			...mapActions(['jiaOdd','jiaAsync'])
		}
	}
</script>

<style>
	.c{
		background-color: orange;
		padding: 10px;
	}
</style>
