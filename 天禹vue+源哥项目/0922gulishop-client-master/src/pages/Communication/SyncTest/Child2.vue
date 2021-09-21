<template>
  <div style="background: #ccc; height: 50px;">
    <span>小明每次花100元</span>
    <button @click="$emit('input',value-100)">花钱</button>
    爸爸还剩 {{value}} 元
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Child2',
    props:['value']
  }
</script>
