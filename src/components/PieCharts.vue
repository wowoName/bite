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
      let myChart = (this.chart = echarts.init(this.$refs.myEchart));

      // 把配置和数据放这里
      myChart.setOption({
        title: {
          left: "left",
          text: this.title,
          top: "top",
          textStyle: {
            color: "#548cc2",
            fontSize: 10
          }
        },
        grid: {
          //这个是用来设置echarts图标的位置和其他设置
          left: "20%",
          right: "20%",
          bottom: "20%",
          top: "20%",
          containLabel: true
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
            fontSize: 18 * this.fontScale,
            fontWeight: 600
          }
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "65%"],
            center: ["center", "center"],
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
                },
                label: {
                  color: "rgba(255,255,255,.45)",
                  fontSize: 14,
                  show: false,
                  position: "outside",
                  formatter: "智慧停车",
                  rich: {
                    a: {
                      color: "#fff",
                      fontSize: 20,
                      lineHeight: 30
                    }
                  }
                }
              }
            ]
          },
          {
            type: "pie",
            zlevel: 11,
            silent: true,
            radius: ["70%", "73%"],
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
          //  {
          //         type: 'pie',
          //         zlevel: 4,
          //         silent: true,
          //         radius: ['87%', '90%'],
          //         label: {
          //             normal: {
          //                 show: false
          //             },
          //         },
          //         labelLine: {
          //             normal: {
          //                 show: false
          //             }
          //         },
          //         color:['#000','#2196F3'],
          //         data: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
          //     },

          {
            name: "",
            type: "gauge",
            splitNumber: 30, //刻度数量
            min: 0,
            max: 100,
            radius: "85%", //图表尺寸
            center: ["50%", "50%"],
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
              //仪表盘指针
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
                width: 2,
                color: "#16202b"
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