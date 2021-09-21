<template>
  <div :class="className" :style="{ height, width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from './mixins/resize';

export default {
  name: "LineChart",
  mixins:[resize],
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "350px",
    },
    className: {
      type: String
    },
    chartData:{
      type:Object,
      require:true
    },
    yTitle:{
      type:String,
      require:true
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el);
    this.setOption(this.chartData);
  },
  methods: {
    setOption({expectedData,actualData}) {
      const option = {
        tooltip: {
          axisPointer: {
            type: "cross",
          },
          trigger: "axis",
        },
        legend:{
          data:[
            {
              name:"预期"
            },
            {
              name:"实际"
            }
          ]
        },
        xAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          boundaryGap: false,
        },
        yAxis: {
          name: this.yTitle,
        },
        grid: {
          left: 40,
          right: 40,
          top: 40,
          bottom: 40,
        },
        series: [
          {
            name:"预期",
            data: expectedData?expectedData:[0,0,0,0,0,0,0],
            smooth: true,
            type: "line",
            itemStyle: {
              color: "hotpink",
            },
            areaStyle: {
              color: "#ccc",
            },
          },
          {
            name:"实际",
            data: actualData?actualData:[0,0,0,0,0,0,0],
            smooth: true,
            type: "line",
            itemStyle: {
              color: "skyblue",
            },
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
  watch:{
    chartData(newVal,oldVal){
      this.setOption(newVal);
    }
  }
};
</script>
