<template>
	<div>
		<ul>
			<li v-for="msg in messageArr" :key="msg.id">
				<!-- 切换路径时，携带params参数 -->
				<router-link :to="`/home/message/detail/${msg.id}/${msg.title}/${msg.content}`">{{msg.title}}</router-link>
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
		}
	}
</script>
