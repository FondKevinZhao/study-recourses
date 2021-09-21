// import { debounce } from '@/utils'
import debounce from 'lodash/debounce'

export default {
  
  data() {
    return {
      $_sidebarElm: null, // sizebar根元素
      $_resizeHandler: null // 更新图表的函数
    }
  },

  mounted() {
    // 定义并保存更新图表的函数
    this.$_resizeHandler = debounce(() => {// 函数防抖, 避免频繁更新图表
      if (this.chart) { // 使用echarts的组件
        this.chart.resize()
      } else if (this.$refs.chart) { // 使用v-chart的组件
        this.$refs.chart.resize()
      }
    }, 100)
    // 给窗口绑定resize事件监听
    this.$_initResizeEvent()
    // 给sidebar绑定尺寸变化(本质是过渡结束)的事件监听
    this.$_initSidebarResizeEvent()
  },

  /* 
  组件死亡时的回调 ==> 解绑窗口和sidebar的resize事件监听
  */
  beforeDestroy() {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },

  /* 
  再次访问路由时的回调 ==> 重新绑定窗口和sizebar的resize事件监听
  */
  // to fixed bug when cached by keep-alive
  // https://github.com/PanJiaChen/vue-element-admin/issues/2116
  activated() {
    this.$_initResizeEvent()
    this.$_initSidebarResizeEvent()
  },

  /* 
  路由离开失活时的回调 ==> 解绑窗口和sidebar的resize事件监听
  */
  deactivated() {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },

  methods: {
    /* 
    给窗口绑定resize事件监听 ==> 更新图表
    */
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_initResizeEvent() {
      window.addEventListener('resize', this.$_resizeHandler)
    },

    /* 
    解绑窗口的resize事件监听
    */
    $_destroyResizeEvent() {
      window.removeEventListener('resize', this.$_resizeHandler)
    },

    /* 
    处理sidebar绑定尺寸变化的监听回调 ==> 更新图表
    */
    $_sidebarResizeHandler(e) {
      if (e.propertyName === 'width') { // 是width属性变化才处理
        this.$_resizeHandler()
      }
    },

    /* 
    给sidebar绑定尺寸变化(本质是过渡结束)的事件监听 ==> 更新图表
    */
    $_initSidebarResizeEvent() {
      this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
    },

    /* 
    解绑sidebar的尺寸变化的事件监听
    */
    $_destroySidebarResizeEvent() {
      this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
    }
  }
}
