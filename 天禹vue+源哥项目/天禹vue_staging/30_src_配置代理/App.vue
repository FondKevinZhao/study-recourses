<template>
	<div>	
		<button @click="getStuInfo">点我获取学生信息</button>
		<button @click="getCarInfo">点我获取汽车信息</button>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name:'App',
		methods:{
			getStuInfo(){
				axios.get('/api1/students').then(
					response => {console.log('请求成功了',response.data)},
					error => {console.log('请求失败了',error.message)}
				)
			},
			getCarInfo(){
				axios.get('api2/cars').then(
					response => {console.log('请求成功了',response.data)},
					error => {console.log('请求失败了',error.message)}
				)
			}
		}
	}
</script>
