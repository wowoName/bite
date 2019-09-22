<template>
  <div class="charts" ref="myEchart"></div>
</template>

<script>
//横向柱状图
import echarts from "echarts";
import resize from "@/mixin/chartsResize";
export default {
  name: "TransBarCharts",
  props: {},
  data() {
    return {
      chart: null
    };
  },
  mixins: [resize],
  props: {},
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
        grid: {
          //这个是用来设置echarts图标的位置和其他设置
          left: 2,
          right: 20,
          bottom: 0,
          top: 0,
          containLabel: true //一般都带上这个，否则x,y轴的刻度值会被截取掉
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
        yAxis: [
          {
            show: true,
            data: ["进行中", "欠费", "已缴费", "0元订单"],
            inverse: true,
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
              color: "#535a68",
              fontSize: 9,
              rich: {
                lg: {
                  backgroundColor: "#339911",
                  color: "#fff",
                  borderRadius: 6,
                  align: "center",
                  width: 6,
                  height: 6
                }
              }
            }
          },
          {
            show: true,
            inverse: true,
            data: [], //这是右侧文字
            axisLabel: {
              textStyle: {
                fontSize: 8,
                color: "#fff"
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],

        series: [
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            data: [10, 20, 30, 40],
            barWidth: "50%",
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: function(params) {
                  return {
                    type: "linear",
                    colorStops: [
                      {
                        offset: 0,
                        color: "#a52bdf"
                      },
                      {
                        offset: 1,
                        color: "#b33c55"
                      }
                    ]
                  };
                }
              }
            },
            label: {
              normal: {
                show: false,
                position: "inside",
                formatter: "{c}%"
              }
            }
          },
          {
            name: "框",
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [100, 100, 100, 100], //应该为最大值
            barWidth: "50%",
            itemStyle: {
              normal: {
                color: "none",
                borderColor: "#2d3857",
                borderWidth: 1,
                barBorderRadius: 10
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