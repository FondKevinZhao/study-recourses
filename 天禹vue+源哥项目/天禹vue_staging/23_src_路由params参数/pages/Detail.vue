<template>
	<ul>
		<!-- 获取params参数 -->
		<li>ID：{{id}}</li>
		<li>TITLE：{{title}}</li>
		<li>CONTENT：{{content}}</li>
	</ul>
</template>

<script>
	export default {
		name:'Detail',
		mounted(){
			console.log(this)
		},
		computed:{
			id(){
				return this.$route.params.id
			},
			title(){
				return this.$route.params.title
			},
			content(){
				return this.$route.params.content
			},
		}
	}
</script>
