<template>
    <div class="charts" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts";
import resize from "@/mixin/chartsResize";
export default {
    name: "lineCharts",
    props: {
        title: {
            type: String,
            default: ""
        },
        symbolColor: {
            type: Array,
            default: () => {
                return ["#a61c3d", "#548cc2"];
            }
        },
        yname: {
            type: String,
            default: ""
        },
        titleTop: Boolean,
        lineDotted: Boolean, //蓝色是否为虚线 true 不是 ;false 是
        unit: {
            type: String,
            default: "/月"
        },
        chartsObj: {
            type: Object,
            default: () => {
                return {
                    blueData: [], //空置率数据
                    redData: [], //利用率数据
                    xAxisData: [],
                    legend: ["", ""]
                };
            }
        }
    },
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
                backgroundColor: this.yname ? "#01060c" : "",
                title: {
                    left: this.titleTop ? "left" : "center",
                    text: this.title,
                    top: this.titleTop ? "top" : "bottom",
                    textStyle: {
                        color: this.titleTop ? "#548cc2" : "#535a68",
                        fontSize: this.titleTop ? 12 * this.fontScale : 14 * this.fontScale
                    }
                },
                grid: {
                    //这个是用来设置echarts图标的位置和其他设置
                    left: 2,
                    right: 20,
                    bottom: this.title == "" ? ' "8%"' : "10%",
                    top: "20%",
                    containLabel: true //一般都带上这个，否则x,y轴的刻度值会被截取掉
                },
                color: ["#0962cb", "#fe2959"],
                legend: {
                    // itemGap: -8,
                    data: this.chartsObj.legend,
                    itemWidth: 16 * this.fontScale,
                    itemHeight: 8 * this.fontScale,
                    textStyle: {
                        color: "#5f6272",
                        fontSize: 13 * this.fontScale
                    },
                    top: "top",
                    right: 0
                },
                xAxis: {
                    type: "category",
                    data: this.chartsObj.xAxisData,
                    name: this.unit, //x轴 单位
                    nameLocation: "end",
                    nameTextStyle: {
                        color: "#535a68",
                        fontSize: this.yname == "" ? 13 * this.fontScale : 14 * this.fontScale,
                        margin: 10,
                        padding: [0, 0, -18, -13],
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
                            fontSize: this.yname == "" ? 13 * this.fontScale : 14 * this.fontScale
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
                    formatter: `{a0}({b0}${this.unit}): {c0} <br/> {a1}({b1}${this.unit}): {c1}`,
                    axisPointer: {
                        animation: false
                    }
                },
                yAxis: [
                    {
                        type: "value",
                        name: this.yname,
                        nameTextStyle: {
                            color: "#535a68",
                            fontSize: 13 * this.fontScale
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#535a68", //y轴文字颜色
                                fontSize: 12 * this.fontScale
                            }
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#a5c0d3"
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: "dashed",
                                color: "#1b2e3c"
                            }
                        }
                    },
                    {
                        type: "value",
                        show: false,
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

                series: [
                    {
                        name: this.chartsObj.legend[0],
                        data: this.chartsObj.blueData,
                        type: "line",
                        symbol: "circle",
                        smooth: false,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: "#0962cb"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(2,17,36, 0.2)"
                                    }
                                ])
                            }
                        },
                        symbolSize: 2,
                        itemStyle: {
                            normal: {
                                color: this.symbolColor[0] //拐角symbol颜色
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 1,
                                color: "#0962cb", //折线的颜色
                                type: this.lineDotted ? "solid" : "dotted" //'dotted'虚线 'solid'实线
                            }
                        }
                    },
                    {
                        name: this.chartsObj.legend[1],
                        data: this.chartsObj.redData,
                        type: "line",
                        symbol: "circle",
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
                        symbolSize: 2,
                        itemStyle: {
                            normal: {
                                color: this.symbolColor[1]
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: "#fe2959", //折线的颜色
                                width: 1
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