<template>
  <div>
    <h2>我爱你赵丽颖</h2>
    <!-- 插槽，就是给父组件到时候使用子组件，留的坑，需要父组件传递东西填这个坑 -->
    <slot></slot>
    <!-- 具名插槽 -->
    <slot name="xxx">杨幂</slot>

    <!-- 当一个组件当中插槽有很多个,默认插槽一般只能有一个,其余的都得是具名插槽 -->
  </div>
</template>

<script>
export default {
  name: '',
}
</script>

<style lang="less" scoped>

</style>
