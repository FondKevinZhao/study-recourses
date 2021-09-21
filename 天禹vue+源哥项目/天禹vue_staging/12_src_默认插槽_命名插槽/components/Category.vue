<template>
	<div class="cate">
		<h3 class="bt">{{title}}分类</h3>

		<!-- 默认插槽 -->
		<!-- <slot></slot> -->

		<!-- 命名插槽(具名插槽) -->
		<slot name="youxi"></slot>
		<slot name="meishi"></slot>
		<slot name="movie"></slot>
	</div>
</template>

<script>
	export default {
		name:'Category',
		props:['title']
	}
</script>

<style>
	.cate{
		width: 240px;
		height: 300px;
		background-color: skyblue;
	}
	.bt{
		text-align: center;
	}
	img{
		width: 100%;
	}
</style>