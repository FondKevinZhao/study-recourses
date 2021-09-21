/* 
		1.A组件想让B组件给自己传数据，那么就要给B组件绑定自定义事件
		2.自定义事件的回调在哪，哪才能接受到数据
		3.适用于 子 ===> 父
 */
<template>
	<div class="app">	
		<h2>我是App组件</h2>
		<h4>我儿子给我的电脑是：{{diannao}}</h4>
		<Demo @ha-ha="test" />
		<br/>
		<Hello @xi-xi="test2"/>
	</div>
</template>

<script>
	import Demo from './components/Demo'
	import Hello from './components/Hello'

	export default {
		name:'App',
		components:{Demo,Hello},
		data(){
			return {
				diannao:''
			}
		},
		methods: {
			test(x){
				this.diannao = x
			},
			test2(y){
				console.log(y)
			}
		},
	}

</script>

<style>
	.app{
		background-color: gray;
		padding: 10px;
	}
</style>