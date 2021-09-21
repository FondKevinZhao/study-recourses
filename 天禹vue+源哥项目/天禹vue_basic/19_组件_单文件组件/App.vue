/* 配置组件的结构 */
<template>
	<div>
		<h2>我是App，我有一台{{car}}</h2>
		<School/>
	</div>
</template>

/* 配置组件数据、交互、事件等等*/
<script>
	//引入School组件
	import School from './components/School'

	export default {
		data(){
			return {
				car:'马自达阿特兹'
			}
		},
		components:{School},
	}
</script>