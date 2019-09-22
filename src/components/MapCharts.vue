<template>
  <div class="charts" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts";
import resize from "@/mixin/chartsResize";
//import 'echarts/map/js/china' // 引入中国地图数据

//import rizhaoJson from "@/assets/data/rizhaoMap.json";
//东港区数据
import rizhaoJson from "@/assets/data/rizhaoDg.json";

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
        }, // 鼠标移到图里面的浮动提示框
        geo: {
          // 这个是重点配置区
          map: "rizhao", //日照地图
          roam: true, //可以缩放地图
          zoom: 1,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                //字体颜色
                color: "#fff",
                fontSize: 8
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                color: "#fff"
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "#0e97ff",
              borderWidth: 2,
              areaColor: "#142445"
            },
            emphasis: {
              areaColor: "#142445"
            }
          }
        },

        series: [
          {
            name: "rizhao", // 浮动框的标题
            type: "map",
            roam: false,
            geoIndex: 1,
            data: []
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