<template>
  <div>
    <h2>BABA有存款: {{money}}</h2>
    <button @click="borrowMoneyFromXM(100)">找小明借钱100</button><br>
    <button @click="borrowMoneyFromXH(150)">找小红借钱150</button><br>
    <button @click="borrowMoneyFromALL(200)">找所有孩子借钱200</button><br>
    
    <br>
    <Son ref="son" />

    <br>
    <Daughter ref="dau" />
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'

export default {
  name: 'ChildrenParentTest',
  data () {
    return {
      money: 1000
    }
  },

  methods: {
    borrowMoneyFromXM(money){
      //父亲的钱要加 + 100
      this.money += money
      //儿子小明的钱要 - 100
      // this.$refs.son 可以直接拿到子组件对象，然后可以直接操作子组件对象当中的数据
      //也可以直接调用子组件的方法
      this.$refs.son.money -= money
    },
    borrowMoneyFromXH(money){
      this.money += money
      this.$refs.dau.money -= money
    },

    borrowMoneyFromALL(money){
      this.money += money * 2
      //儿子和女儿都要减去200
      // this.$children可以直接获取这个父组件所有的子组件对象组成的一个数组
      // 这个方式虽然可以直接获取到所有的子组件对象组成的数组，但是谁在前谁在后不确定
      console.log(this.$children)
      this.$children.forEach(item => item.money -= money)
      // this.$children[0]  不一定是谁，因此官方建议尽量不使用$children和$parent
    }
  },

  components: {
    Son,
    Daughter
  }
}
</script>

<style>

</style>
