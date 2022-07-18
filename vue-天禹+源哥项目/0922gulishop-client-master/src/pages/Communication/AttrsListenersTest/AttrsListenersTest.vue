<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>

    <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
    <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
    <br>

    <!-- 上面三个按钮，只有图标，没有文字，我们想要让鼠标悬停出现文字提示
    那么就需要对上面的el-button组件进行二次封装，封装成一个可以弹出提示消息的自己的组件 -->

    <!-- 添加冒号只是为了绑定动态数据
    而所有的组件标签的属性都会props传递到子组件内部 -->
    <!-- <HintButton xxx="123" :yyy="'abc'" @heihei="test"></HintButton> -->

    <HintButton type="primary" icon="el-icon-plus" size="mini" title="添加"></HintButton>
    <HintButton type="danger" icon="el-icon-delete" size="mini" title="删除"></HintButton>
    <HintButton type="warning" icon="el-icon-edit" size="mini" title="修改"></HintButton>




    <!-- 拓展 -->
    <!-- 为什么el-button可以直接使用click事件，因为内部已经触发过click这个自定义事件 -->
    <!-- 为什么el-button不可以直接使用dblclick事件，因为内部根本没触发过dblclick这个自定义事件
    如果想要使用，加.native -->
    <el-button type="primary" @click="test">单击</el-button>
    <el-button type="danger" @dblclick.native="test">双击</el-button>


  </div>
</template>

<script type="text/ecmascript-6">
import HintButton from '@/pages/Communication/AttrsListenersTest/HintButton'
  export default {
    name: 'AttrsListenersTest',
    components:{
      HintButton
    },
    methods: {
      test(){
        console.log(111)
      }
    },
  }
</script>
