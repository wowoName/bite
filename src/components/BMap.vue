<template>
  <div class="charts" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts";
import "echarts/extension/bmap/bmap";

//
//地图数据
import mapData from "@/assets/data/mapData";
//import 'echarts/map/js/china' // 引入中国地图数据
import rizhaoJson1 from "@/assets/data/rizhaoMap.json";
//东港区数据
import rizhaoJson from "@/assets/data/rizhaoDg.json";

echarts.registerMap("rizhao", rizhaoJson);
//东港区边界数据
import rizhaoBoundary from "@/assets/data/mapData";

import resize from "@/mixin/chartsResize";
export default {
  name: "pieCharts",
  props: {
    chartsObj: {
      type: Object,
      default: () => {
        return {
          data: [],
          xAxisData: [],
          colors: ["#f33b65", "#bb6ea4"]
        };
      }
    }
  },
  mixins: [resize],
  watch: {
    chartsObj: {
      handler() {
        this.initChart();
      },
      deep: true
    }
  },
  data() {
    return {
      chart: null,
      mapModel: null
    };
  },
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
  computed: {},
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption({
        bmap: {
          center: [119.468048, 35.439282],
          zoom: 11,
          roam: true, //地图是否可缩放
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#031628"
                }
              },
              {
                featureType: "land",
                elementType: "geometry",
                stylers: {
                  color: "#000102"
                }
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#0b3d51"
                }
              },
              {
                featureType: "local",
                elementType: "geometry",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "railway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "railway",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#08304b"
                }
              },
              {
                featureType: "subway",
                elementType: "geometry",
                stylers: {
                  lightness: -70
                }
              },
              {
                featureType: "building",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#857f7f"
                }
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "building",
                elementType: "geometry",
                stylers: {
                  color: "#022338"
                }
              },
              {
                featureType: "green",
                elementType: "geometry",
                stylers: {
                  color: "#062032"
                }
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#465b6c"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#022338"
                }
              },
              {
                featureType: "label",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              }
            ]
          }
        },
        series: []
      });
      this.mapModel = this.chart
        .getModel()
        .getComponent("bmap")
        .getBMap();
      //this.drawBoundary("日照市东港区");
      this.drawBoundary("dg");
      this.resizeCharts();
    },
    //绘制边界
    drawBoundary(name) {
      let boundryData = rizhaoBoundary[name];
      let count = boundryData.length;
      for (let i = 0; i < count; i++) {
        let ply = new BMap.Polygon(boundryData[i], {
          strokeWeight: 4,
          strokeColor: "#0e97ff",
          fillColor: "transparent",
          fillOpacity: 0.3
        }); //建立多边形覆盖物
        this.mapModel.addOverlay(ply); //添加覆盖物
      }
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