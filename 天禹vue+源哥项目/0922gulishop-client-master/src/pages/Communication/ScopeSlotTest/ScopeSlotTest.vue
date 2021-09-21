<template>
  <div>
    <!-- 默认插槽和具名插槽 -->
    <!-- 第一个组件 -->
    <Child>
      <template>
        <!-- 这里面写的就是父组件给子组件传递的html\css结构 -->
        <p>嘿嘿</p>
      </template>

      <template slot="xxx">
        <a href="">呵呵</a>
      </template>

    </Child>

    <!-- 第二个组件 -->
    <Child>
      <template>
        <!-- 这里面写的就是父组件给子组件传递的html\css结构 -->
        <button>按钮</button>
      </template>
    </Child>



    <!-- 作用域插槽的演示 -->
    <!-- 
      作用域插槽完成的事情

      父子之间通信

      1\ 数据是在父组件当中的
      2\ 数据最终传递给了子组件进行展示v-for
      3\ 子组件在展示数据的过程中,数据的结构是由父组件说了算的
    -->

    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <!-- <List :todos="todos">
      <template slot-scope="scopeProps"> -->
        <!-- scopeProps最终是一个对象,接收子组件作用域插槽回传给父组件的数据组成的对象
        {
          todo:todo
        }
        -->
        <!-- <span :style="{color:scopeProps.todo.isComplete?'green':'black'}">{{scopeProps.todo.text}}</span>

      </template> -->
    <!-- </List> -->
    <hr>

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>

    <List :todos="todos">
      <template slot-scope="{todo,index}">
        <h2 :style="{color:index % 2===0?'blue':'green'}"><span>{{index+1}}</span>{{todo.text}}</h2>
      </template>
    </List>

  </div>
</template>

<script type="text/ecmascript-6">
  import List from './List'
  import Child from '@/pages/Communication/ScopeSlotTest/Child'
  export default {
    name: 'ScopeSlotTest',
    data () {
      return {
        todos: [
          {id: 1, text: 'AAA', isComplete: false},
          {id: 2, text: 'BBB', isComplete: true},
          {id: 3, text: 'CCC', isComplete: false},
          {id: 4, text: 'DDD', isComplete: false},
        ]
      }
    },

    components: {
      List,
      Child
    }
  }
</script>
