<template>
	<section class="jumbotron">
		<h3 class="jumbotron-heading">Search Github Users</h3>
		<div>
			<input type="text" v-model="keyWord" placeholder="enter the name you search"/>&nbsp;
			<button @click="search">Search</button>
		</div>
	</section>
</template>

<script>
	import axios from 'axios'
	export default {
		name:'Search',
		data(){
			return {
				keyWord:''
			}
		},
		methods: {
			async search(){
				//请求之前通知List组件更新他的data
				this.$bus.$emit('get-list-data',{isFirst:false,isLoading:true})
				try {
					//发送请求
					const response = await axios.get('https://api.github.com/search/users',{params:{q:this.keyWord}})
					const {items} = response.data
					//请求成功后，通知List组件更新他的data
					this.$bus.$emit('get-list-data',{isLoading:false,users:items})
				} catch (error) {
					//请求失败后，通知List组件更新他的data
					this.$bus.$emit('get-list-data',{isLoading:false,users:[],errMsg:error.message})
				}
			}
		},
	}
</script>

<style>

</style>