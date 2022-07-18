<template>
  <div>
    <h2>深入v-model</h2>
    <input type="text" v-model="msg">
    <span>我爱你{{msg}}</span>
    <br>

    <!-- v-model本质其实是单向数据绑定v-bind和input事件的组合 -->
    <input type="text" :value="msg" @input="msg = $event.target.value">
    <span>我爱你{{msg}}</span>

    <!-- 表单类元素： input  select  textarea -->

    <!-- v-model在组件标签身上的作用
    :value="msg"在html标签身上是单向数据绑定
    :value="msg"在组件标签身上是props组件通信
    @input  html标签身上是原生dom事件
    @input  组件标签身上是自定义事件
    -->
    <!-- 达到父子数据是同步的 -->
    <CustomInput :value="msg" @input="msg = $event"></CustomInput>

    <!-- 可以认为自定义el-input组件 -->
    <CustomInput v-model="msg"></CustomInput>
    
    <el-input v-model="msg"></el-input>

  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',
    components: {
      CustomInput
    },
    data(){
      return {
        msg:'赵丽颖'
      }
    }

  }
</script>
