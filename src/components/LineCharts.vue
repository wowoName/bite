<template>
  <div class="charts" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts";
import resize from "@/mixin/chartsResize";
export default {
  name: "lineCharts",
  props: {
    unit: {
      type: String,
      default: "/月"
    }
  },
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
        xAxis: {
          type: "category",
          data: [
            "00",
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
            "31"
          ],
          name: this.unit, //x轴 单位
          nameLocation: "end",
          nameTextStyle: {
            color: "#535a68",
            fontSize: 8,
            margin: 10,
            padding: [0, 0, -18, -24],
            rich: {
              a: {}
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 2,
              color: "#535a68" //X轴样式
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
          axisTick: {
            inside: true,
            alignWithLabel: true,
            length: 3,
            show: true, //隐藏X轴刻度样式
            lineStyle: {
              width: 2,
              color: "#6ba2ef"
            }
          },
          splitLine: {
            show: false
          }
        },
        tooltip: {
          trigger: "axis",
          formatter: params => {
            return params[0].value;
          },
          axisPointer: {
            animation: false
          }
        },
        yAxis: [
          {
            type: "value",
            name: "",
            nameTextStyle: {
              color: "#a5c0d3"
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#535a68", //y轴文字颜色
                fontSize: 9
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#a5c0d3"
              }
            },
            splitLine: {
              show: false
            }
          },
          {
            type: "value",
            gridIndex: 0,
            min: 0,
            max: 1,
            splitNumber: 10, //背景条数--可根据
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
              }
            }
          }
        ],
        grid: {
          //这个是用来设置echarts图标的位置和其他设置
          left: "0%",
          right: "3%",
          bottom: "5%",
          top: "20%",
          containLabel: true //一般都带上这个，否则x,y轴的刻度值会被截取掉
        },
        series: [
          {
            data: [
              0.1,
              0.5,
              0.2,
              0.8,
              1,
              0.8,
              0.1,
              0.5,
              0.2,
              0.8,
              1,
              0.8,
              0.1,
              0.5,
              0.2,
              0.8,
              1,
              0.8,
              0.1,
              0.5,
              0.2,
              0.8,
              1,
              0.8,
              0.1,
              0.5,
              0.2,
              0.8,
              1,
              0.8
            ],
            type: "line",
            symbol: "none",
            smooth: false,
            itemStyle: {
              normal: {
                color: "#fff", //折线点的颜色
                lineStyle: {
                  width: 1,
                  color: "#0962cb", //折线的颜色
                  type: "dotted" //'dotted'虚线 'solid'实线
                }
              }
            }
          },
          {
            data: [
              0.5,
              0.2,
              0.6,
              0.5,
              0.1,
              0.7,
              0.5,
              0.6,
              0.9,
              0.5,
              0.1,
              0.4,
              0.8,
              0.2,
              0.8,
              0.4,
              0.5,
              0.4,
              0.8,
              0.6,
              0.7,
              0.2,
              1,
              0.6,
              0.4,
              0.8,
              0.7,
              0.2,
              0.2,
              0.3
            ],
            type: "line",
            symbol: "none",
            smooth: false,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#fe2959"
                  },
                  {
                    offset: 1,
                    color: "rgba(5,140,255, 0.2)"
                  }
                ])
              }
            },
            itemStyle: {
              normal: {
                color: "#fff", //折线点的颜色
                lineStyle: {
                  color: "#fe2959", //折线的颜色
                  width: 1
                }
              }
            }
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