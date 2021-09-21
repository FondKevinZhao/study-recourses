<template>
  <div :class="className" :style="{height,width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    chartData: {
      type: Object,
      required: true
    },
    yTitle: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        // x轴
        xAxis: {
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          boundaryGap: false, // 坐标轴右侧是否留白, 默认是true
        },
        // 坐标系内绘图网格
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        // 提示
        tooltip: {
          trigger: 'axis', // 坐标轴触发
          axisPointer: { // 坐标轴指示器配置项
            type: 'cross' //  十字准星指示器。表示启用两个正交的轴的 axisPointer
          },
        },
        // y轴
        yAxis: {
          name: this.yTitle, // 动态标题
        },
        // 图例
        legend: {
          data: ['预期', '实际'] // 与系列的name匹配
        },
        series: [{
          name: '预期', 
          type: 'line',
          smooth: true, // 线条光滑
          itemStyle: {
            color: "#FF005A",
          },
          areaStyle: { // 区域填充
            color: '#ccc'
          },
          data: expectedData,
          animationDuration: 2800, // 显示动画时间
        },
        {
          name: '实际',
          smooth: true,
          type: 'line',
          itemStyle: {
            color: '#3888fa',
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
