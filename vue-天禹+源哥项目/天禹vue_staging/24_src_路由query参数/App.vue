<template>
	<div>
    <Header/>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">

					<!-- 原始html中用a实现跳转页面 -->
          <!-- <a class="list-group-item active" href="./about.html">About</a>
          <a class="list-group-item" href="./home.html">Home</a> -->

					<!-- Vue中使用router-link实现路径改变 -->
					<router-link class="list-group-item" active-class="active" to="/about">About</router-link>
          <router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
						<router-view></router-view>

						<!-- 若匹配多个路由组件，需要配置name属性 -->
            <!-- <router-view name="h1"></router-view>
            <router-view name="h2"></router-view> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import Header from './components/Header'
	export default {
		name:'App',
		components:{Header}
	}
</script>

<style>
	.active{
		background-color: gray !important;
		color: orange !important;
		font-weight: bold;
	}
</style>