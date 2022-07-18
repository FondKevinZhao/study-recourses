<template>
  <div style="background: #ccc; height: 50px;">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="giveMoney(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
import myMixin from '@/pages/Communication/ChildrenParentTest/myMixin'
export default {
  name: 'Son',
  mixins:[myMixin],
  data () {
    return {
      money: 30000
    }
  },

  // mounted(){
  //   console.log(111)
  // }

  // methods: {
  //   giveMoney(money){
  //     this.money -= money
  //     // this.$parent可以拿到父组件对象，操作父组件对象的数据
  //     this.$parent.money += money
  //   }
  // }
}
</script>
