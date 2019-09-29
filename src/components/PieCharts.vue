<template>
  <div class="charts" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts";
import resize from "@/mixin/chartsResize";
export default {
  name: "pieCharts",
  props: {
    title: {
      type: String,
      default: ""
    },
    data: {
      type: Number,
      defalt: 0
    }
  },
  data() {
    return {
      chart: null,
      fontScale: 1 //字体的缩放大小
    };
  },
  mixins: [resize],
  mounted() {
    this.fontScale = document.documentElement.clientWidth / 1920;
    this.myChart = this.chart = echarts.init(this.$refs.myEchart);
    this.initChart();
  },
  watch: {
    data: {
      handler() {
        this.initChart();
      },
      deep: true
    }
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
      // 把配置和数据放这里
      this.myChart.setOption({
        title: {
          left: "left",
          text: this.title,
          top: "top",
          textStyle: {
            color: "#548cc2",
            fontSize: 15 * this.fontScale,
            fontWeight: 500
          }
        },

        xAxis: {
          type: "category",
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              width: 2,
              color: "#535a68" //X轴样式
            }
          },
          data: []
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              width: 2,
              color: "#535a68" //X轴样式
            }
          },
          splitLine: {
            show: false
          }
        },
        tooltip: {
          show: false,
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          show: false
        },
        graphic: {
          type: "text",
          left: "center",
          top: "center",
          zlevel: 11,
          style: {
            text: this.data + "%", //这是百分比
            textAlign: "center",
            fill: "#7e8fbe",
            fontSize: 21 * this.fontScale,
            fontWeight: 600
          }
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["53%", "62%"],
            center: ["50%", "55%"],
            zlevel: 10,
            hoverAnimation: false,
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 100 - this.data, //100 - n
                itemStyle: {
                  color: "#1e2833"
                }
              },
              {
                value: this.data, //真实 数据
                name: "",
                itemStyle: {
                  color: "#1e2833"
                },
                labelLine: {
                  show: false,
                  length: 200,
                  length2: 100
                }
              }
            ]
          },
          {
            name: "",
            type: "pie",
            radius: ["50%", "64%"],
            center: ["50%", "55%"],
            zlevel: 10,
            hoverAnimation: false,
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 100 - this.data, //100 - n
                itemStyle: {
                  color: "transparent"
                }
              },
              {
                value: this.data, //真实 数据
                name: "",
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "#f03f68"
                    },
                    {
                      offset: 0.5,
                      color: "#f03f68"
                    },
                    {
                      offset: 1,
                      color: "#f86e8b"
                    }
                  ])
                },
                labelLine: {
                  show: false,
                  length: 200,
                  length2: 100
                }
              }
            ]
          },
          {
            type: "pie",
            zlevel: 11,
            silent: true,
            radius: ["70%", "73%"],
            center: ["50%", "55%"],
            hoverAnimation: false,
            itemStyle: {
              color: "#59729d"
            },
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [1]
          },
          {
            type: "pie",
            zlevel: 11,
            silent: true,
            radius: ["79%", "81%"],
            center: ["50%", "55%"],
            hoverAnimation: false,
            itemStyle: {
              color: "#20324a"
            },
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [1]
          },
          {
            name: "",
            type: "gauge",
            splitNumber: 30 * this.fontScale, //刻度数量
            min: 0,
            max: 100,
            radius: "85%", //图表尺寸
            center: ["50%", "55%"],
            startAngle: 90,
            endAngle: -269.9999,
            axisLine: {
              show: false,
              lineStyle: {
                width: 0,
                shadowBlur: 0,
                color: [[1, "#565966"]]
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: "auto",
                width: 1
              },
              length: 20,
              splitNumber: 5
            },
            splitLine: {
              show: true,
              length: 2,
              lineStyle: {
                color: "auto"
              }
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: 0
            },
            detail: {
              show: 0
            }
          },
          {
            data: [0, 1],
            symbol: "none",
            lineStyle: {
              normal: {
                width: 1 * this.fontScale,
                color: "#455a7e"
              }
            },
            type: "line"
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