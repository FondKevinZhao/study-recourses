<template>
  <div>
    小明的爸爸现在有{{money}}元
    
    <h2>不使用sync修改符</h2>
    <Child :money="money" @update:money="money = $event"></Child>

    <h2>使用sync修改符</h2>
    <Child :money.sync="money"></Child>

    <h2>使用v-model修改符</h2>
    <!-- <Child2 :value="money" @input="money = $event"></Child2> -->
    <Child2 v-model="money"></Child2>

    <!-- .sync和v-model用在组件标签上，都可以达到父子组件数据同步
    区别：
      .sync达到数据同步： 子组件内部不是表单类元素
      v-model达到数据同步：子组件内部一定是表单类元素
    -->


    <hr>
  </div>
</template>

<script type="text/ecmascript-6">
  import Child from './Child.vue'
  import Child2 from './Child2.vue'
  export default {
    name: 'SyncTest',
    data(){
      return {
        money:1000
      }
    },
    components: {
      Child,
      Child2
    }
  }
</script>
