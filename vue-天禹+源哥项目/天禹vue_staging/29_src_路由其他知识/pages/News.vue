<template>
	<ul>
		<li>news001 <input type="text"></li> 
		<li>news002 <input type="text"></li>
		<li>news003 <input type="text"></li> 
	</ul>
</template>

<script>
	export default {
		name:'News',
		mounted(){
			console.log('News组件挂载了')
		},
		beforeDestroy(){
			console.log('News组件销毁了')
		}
	}
</script>
