<template>
	<div>
		<ul>
			<li v-for="msg in messageArr" :key="msg.id">
				<!-- 路由切换时，携带params参数 -->
				<!-- <router-link :to="`/home/message/detail/${msg.id}/${msg.title}/${msg.content}`">{{msg.title}}</router-link> -->
			
				<!-- 路由切换时，携带query参数 -->
				<!-- <router-link :to="`/home/message/detail/${msg.id}?title=${msg.title}&content=${msg.content}`">{{msg.title}}</router-link> -->

				<router-link 
					:to="{
							name:'xiangqing',
							params:{id:msg.id},
							query:{
								title:msg.title,
								content:msg.content
							}
						}"
				>
					{{msg.title}}
				</router-link>
				<button @click="pushShow(msg)">push查看</button>
				<button @click="replaceShow(msg)">replace查看</button>
			</li>
		</ul>
		<hr/>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name:'Message',
		data(){
			return {
				messageArr:[
					{id:'001',title:'消息1',content:'爱抽烟'},
					{id:'002',title:'消息2',content:'爱喝酒'},
					{id:'003',title:'消息3',content:'爱打麻将'},
				]
			}
		},
		methods: {
			pushShow(msg){
				this.$router.push({
					name:'xiangqing',
					params:{id:msg.id},
					query:{
						title:msg.title,
						content:msg.content
					}
				})
			},
			replaceShow(msg){
				this.$router.replace({
					name:'xiangqing',
					params:{id:msg.id},
					query:{
						title:msg.title,
						content:msg.content
					}
				})
			}
		},	
		mounted(){
			console.log('Message挂载了')
		},
		beforeDestroy(){
			console.log('Message将要销毁')
		}
	}
</script>
