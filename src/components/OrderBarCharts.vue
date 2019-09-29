<template>
  <div class="charts" ref="myEchart"></div>
</template>

<script>
//右侧柱状 折线图
import echarts from "echarts";
import resize from "@/mixin/chartsResize";
export default {
  name: "pieCharts",
  props: {
    chartsObj: {
      type: Object,
      default: () => {
        return {
          barData: [],
          lineData: [],
          xAxisData: []
        };
      }
    },
    unit: {
      type: String,
      default: "/天"
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
      fontScale: 1,
      chart: null
    };
  },
  mounted() {
    this.fontScale = document.documentElement.clientWidth / 1920;
    this.chart = echarts.init(this.$refs.myEchart);
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
      // 把配置和数据放这里
      this.chart.setOption({
        grid: {
          top: "15%",
          bottom: "15%",
          left: "12%",
          right: "10%"
        },
        legend: {
          icon: "rect",
          align: "right",
          itemWidth: 8 * this.fontScale,
          itemHeight: 8 * this.fontScale,
          data: ["订单数", "支付数"],
          textStyle: {
            color: "#5f6272",
            fontSize: 12 * this.fontScale
          },
          top: "-5%",
          left: "right"
        },
        tooltip: {
          trigger: "axis",
          show: true,
          formatter: "{b0}: {c0}",
          axisPointer: {
            type: "shadow",
            label: {}
          }
        },
        xAxis: {
          data: this.chartsObj.xAxisData,
          name: this.unit, //x轴 单位
          nameLocation: "end",
          nameTextStyle: {
            color: "#535a68",
            fontSize: 12 * this.fontScale,
            margin: 10 * this.fontScale,
            padding: [0, 0, -18 * this.fontScale, -6 * this.fontScale],
            rich: {
              a: {}
            }
          },
          nameGap: 8,
          axisTick: {
            inside: true,
            alignWithLabel: true,
            length: 3 * this.fontScale,
            show: true, //隐藏X轴刻度样式
            lineStyle: {
              width: 2 * this.fontScale,
              color: "#6ba2ef"
            }
          },
          axisLabel: {
            show: true,
            margin: 3,
            textStyle: {
              color: "#535a68", //X轴文字颜色
              fontSize: 13 * this.fontScale
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 2 * this.fontScale,
              color: "#535a68" //X轴样式
            }
          }
        },
        yAxis: [
          {
            type: "value",
            name: "",
            nameTextStyle: {
              color: "#ebf8ac"
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              margin: 35,
              textStyle: {
                color: "#535a68", //y轴文字颜色
                fontSize: 12 * this.fontScale,
                align: "left",
                baseline: "middle"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#1b2e3c"
              }
            }
          }
        ],
        series: [
          {
            name: "支付数",
            type: "line",
            smooth: false, //平滑曲线显示
            symbol: "none",
            lineStyle: {
              color: "#f43b66",
              width: 1 * this.fontScale
            },
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
            //根据数据设置最大值的的smybol  以及最小值的symbol
            data: this.chartsObj.lineData
          },
          {
            name: "订单数",
            type: "bar",
            barWidth: "40%",
            silent: true,
            itemStyle: {
              color: "#7c83de"
            },
            data: this.chartsObj.barData
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