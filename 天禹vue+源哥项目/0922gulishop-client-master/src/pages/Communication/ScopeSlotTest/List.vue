<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      <!-- :todo="todo" 不是props组件通信,作用域插槽通信 -->
      <slot :todo="todo" :index="index">{{todo.text}}</slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    todos: Array
  }
}
</script>