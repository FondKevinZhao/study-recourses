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
		props:['id','title'],
		data(){
			return {
				content:''
			}
		},
		computed:{
			/* id(){
				return this.$route.params.id
			},
			title(){
				return this.$route.query.title
			},
			content(){
				return this.$route.query.content
			}, 
			*/
		},
		watch:{
			$route:{
				immediate:true,
				deep:true,
				handler(route){
					setTimeout(()=>{
						this.content = route.query.content
					},500)
				}
			}
		}
	}
</script>
