<template>
  <div class="charts" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts";
import resize from "@/mixin/chartsResize";
//import 'echarts/map/js/china' // 引入中国地图数据

import rizhaoJson from "@/assets/data/rizhaoMap.json";

echarts.registerMap("rizhao", rizhaoJson);

export default {
  name: "mapCharts",
  props: {},
  data() {
    return {
      chart: null
    };
  },
  mixins: [resize],
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      let myChart = (this.chart = echarts.init(this.$refs.myEchart));

      // 把配置和数据放这里
      myChart.setOption({
        // 进行相关配置
        backgroundColor: "transparent",
        tooltip: {
          show: false
        }, 
        tooltip:{
            show:false,
        },
      
 visualMap: {
      show:false,
              type:"piecewise",
                pieces: [{max: 30 }, {  min: 31 }
                ],
                color:['#3a377a', '#142445'],
                  calculable: true
            },
        series: [
          {
            name: "rizhao", // 浮动框的标题
            type: "map",
              map: "rizhao", //日照地图
          roam: false, //可以缩放地图
          zoom: 2,
          center: [119.30, 35.439282],
            geoIndex: 1,
                   itemStyle: {
                   
            normal: {
              borderColor: "#0e97ff",
              borderWidth: 1,
              areaColor: "#142445"
            },
           
          },
           emphasis: {
             label:{
                  show:false,
             },
             itemStyle:{
              areaColor: "#3a377a"
             }
            },
            data: [{name:"莒县",value:10},{name:"五莲县",value:10},{name:"岚山区",value:10},{name:"东港区",value:80}]
          }
        ]
      });
      this.resizeCharts();
    }
  }
};
</script>

<style lang='scss' scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>