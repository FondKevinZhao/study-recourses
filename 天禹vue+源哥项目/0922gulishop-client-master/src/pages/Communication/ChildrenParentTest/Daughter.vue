<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="giveMoney(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
import myMixin from '@/pages/Communication/ChildrenParentTest/myMixin'
export default {
  name: 'Daughter',
  mixins:[myMixin],
  data () {
    return {
      money: 20000
    }
  },

  // mounted(){
  //   console.log(111)
  // }

  // methods: {
  //   giveMoney(money){
  //     this.money -= money
  //     // this.$parent可以拿到父组件对象，操作父组件对象的数据
  //     // this.$parent如果拿到的一个父组件对象没问题，如果这个子组件有多个父亲，那么就出问题
  //     this.$parent.money += money
  //   }
  // }
}
</script>
