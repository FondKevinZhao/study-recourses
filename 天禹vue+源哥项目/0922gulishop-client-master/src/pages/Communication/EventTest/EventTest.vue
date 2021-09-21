<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- html标签身上添加原生的dom事件 -->
    <button @click="test">test</button>
    <!-- 组件标签身上添加原生dom事件
    那么这个事件就不再是原生dom事件了，而是一个自定义事件，只不过事件类型名和原生的事件类型名一样罢了
    如果在组件标签身上添加原生dom事件，而且就想让它是原生的事件而不是变为自定义事件，需要加事件描述符.native
    而且这个事件是添加给了组件的根元素，就形成事件委派
    -->
    <Event1 @click.native="test1">test1</Event1> 


    


    <!-- 在html标签身上添加自定义事件 
    那么无意义，就是没什么用,自定义事件只能在组件标签身上添加有意义
    -->
    <button @xxx="test2">test2</button>
    <!-- 组件标签身上添加自定义事件
    组件标签身上添加的所有事件都是自定义事件，哪怕你写的事件名和原生dom事件名一样，也是自定义事件
    区分自定义事件还是原生事件，主要就看这个事件添加的是什么元素
    如果事件添加给了html元素，那么这个事件就一定是原生dom事件，
    如果事件添加给了组件标签，那么这个事件就一定是自定义事件
    -->
    <Event2 @xxx="test3" @click="test4">test3</Event2>


  </div>
</template>

<script type="text/ecmascript-6">
  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'

  export default {
    name: 'EventTest',

    components: {
      Event1,
      Event2,
    },

    methods: {
      test(event){
        console.log(event.target.innerHTML)
      },

      test1(event){
        console.log(event.target.innerHTML)
      },

      test2(event){
        console.log(event)
      },

      test3(event){
        console.log(event)
      },

      test4(event){
        console.log(event)
      }
    }
  }
</script>
