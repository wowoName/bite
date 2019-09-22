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
          style: {
            text: "36.6%", //这是百分比
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
            radius: ["50%", "68%"],
            center: ["center", "center"],
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
              //注意 第一个未将要显示得真实值  第二个值未 按照
              {
                value: 20,
                itemStyle: {
                  color: "transparent"
                }
              },
              {
                value: 80,
                name: "",
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "#e68399"
                    },
                    {
                      offset: 1,
                      color: "#f2436a"
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