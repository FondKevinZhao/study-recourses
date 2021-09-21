<template>
  <a href="javascript:;" :title="title" style="margin-right:10px">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
  name: '',
  props:['title'],
  mounted(){
    //this.$attrs 就是父组件传递过来的所有属性(除了props接收的以及style和class)组成的对象
    //this.$listeners 就是父组件给子组件绑定的所有事件监听组成的对象
    //通常使用他们就是为了对一个组件进行二次封装
    console.log(this.$attrs,this.$listeners)
  }
}
</script>

<style lang="less" scoped>

</style>
