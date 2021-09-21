<template>
	<div>
		<button @click="getData">点我获取数据</button>
	</div>
</template>

<script>
	import axios from './ajax/axios'

	export default {
		name:'App',
		methods:{
			async getData(){
				const result = await axios.get('https://v1.hitokoto.cn/',{params:{name:'tom'}})
				console.log(result)
			}
		}
	}
</script>