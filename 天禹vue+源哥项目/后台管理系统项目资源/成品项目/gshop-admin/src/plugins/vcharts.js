/* 
引入v-charts, 并对其实现按需引入打包
*/
import Vue from 'vue'
// import VCharts from 'v-charts'
// import 'v-charts/lib/style.css'
import VeLine from 'v-charts/lib/line.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VePie from 'v-charts/lib/pie.common'


// Vue.use(VCharts)   // 20.5M==>20.1M
Vue.component(VeLine.name, VeLine)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VePie.name, VePie)
