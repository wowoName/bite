<template>
  <div class="charts" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts";
import resize from "@/mixin/chartsResize";
export default {
  name: "TransBarCharts",
  props: {},
  data() {
    return {
      chart: null,
      maxData: [400, 400, 400, 400],
      img: require("../assets/img/symbol.png")
    };
  },
  mixins: [resize],
  props: {
    //坐标轴数据
    yData: {
      type: Array,
      default: () => {
        return ["进行中", "欠费", "已交", "0元订单"];
      }
    },
    //数据
    barData: {
      type: Array,
      default: () => {
        return [145, 260, 88, 356];
      }
    }
  },
  mounted() {
    this.maxData = this.maxData.slice(0, this.barData.length);
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
        grid: [
          {
            left: 40,
            bottom: 15,
            top: "10%",
            right: 20
          }
        ],
        tooltip: {
          trigger: "axis",
          formatter: params => {
            console.log(params);
            return params[2].name + ":" + params[2].value;
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          show: true,
          axisTick: {
            show: false,
            inside: true,
            alignWithLabel: true,
            length: 3,
            lineStyle: {
              width: 2,
              color: "#535a68"
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#a5c0d3"
            }
          },
          axisLabel: {
            show: true,
            margin: 3,
            textStyle: {
              color: "#535a68", //X轴文字颜色
              fontSize: 9
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          data: ["进行中", "欠费", "已交费", "0元订单"],
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },

          axisLabel: {
            show: true,
            color: "#535a68", //y轴文字颜色
            fontSize: 8
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#FFFFFF"
            }
          }
        },
        series: [
          {
            // 外边框
            name: "",
            type: "bar", //echarts图的类型
            barWidth: "60%",
            barGap: "-89%",
            barHeight: "100%",
            itemStyle: {
              normal: {
                color: "#0c1830" //3f474d
              }
            },
            z: 1, //图层值
            data: [100, 100, 100, 100]
          },
          // {
          //   // 内边框
          //   name: "",
          //   type: "bar",
          //   barWidth: "40%",
          //   barHeight: "100%",
          //   itemStyle: {
          //     normal: {
          //       color: "#212f5f"
          //     }
          //   },
          //   zLevel: 1, //图层值
          //   data: [100, 100, 100, 100]
          // },
          {
            name: "",
            type: "pictorialBar",
            symbol: "rrect",
            barWidth: "50%",
            symbolSize: ["14%", "90%"],
            symbolMargin: "200%",
            symbolOffset: ["-100%", "7%"],
            symbolPosition: "start",
            symbolClip: true,
            itemStyle: {
              normal: {
                color: "#000"
              }
            },
            z: 30, //图层值
            symbolRepeat: true,
            data: [100, 100, 100, 100],
            animationEasing: "elasticOut"
          },

          {
            name: "",
            type: "bar",
            barWidth: "46%",
            silent: false,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#6a9ee9" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#f93c66" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            z: 20, //图层值
            data: [60, 30, 52, 34]
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