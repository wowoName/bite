<template>
    <div class="charts" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts";
import resize from "@/mixin/chartsResize";
export default {
    name: "TransBarCharts",

    data() {
        return {
            chart: null,
            fontScale: 1 //字体的缩放大小
        };
    },
    mixins: [resize],
    props: {
        //坐标轴数据
        yData: {
            type: Array,
            default: () => {
                return ["欠费", "已交", "0元订单"];
            }
        },
        //数据
        barData: {
            type: Array,
            default: () => {
                return [0, 0, 0];
            }
        }
    },
    watch: {
        barData: {
            handler() {
                alert("变化了");
                this.initChart();
            },
            deep: true
        }
    },
    computed: {
        maxData() {
            let max = Math.max.apply(Math, this.barData),
                _max = max * 1.2;
            _max = _max < 10 ? 10 : _max;
            return [_max, _max, _max];
        }
    },
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
            this.myChart = (this.chart = echarts.init(this.$refs.myEchart));

            // 把配置和数据放这里
            this.myChart.setOption({
                grid: [
                    {
                        left: 5 * this.fontScale,
                        right: 40 * this.fontScale,
                        bottom: 2 * this.fontScale,
                        top: 18 * this.fontScale,
                        containLabel: true //一般都带上这个，否则x,y轴的刻度值会被截取掉
                    }
                ],
                tooltip: {
                    trigger: "axis",
                    formatter: params => {
                        return params[2].name + ":" + params[2].value * 10 + "万";
                    },
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    show: true,
                    name: "/十万", //x轴 单位
                    nameLocation: "end",
                    nameTextStyle: {
                        color: "#535a68",
                        fontSize: 11 * this.fontScale,
                        margin: 10 * this.fontScale,
                        padding: [0, 0, -18 * this.fontScale, -11 * this.fontScale],
                        rich: {
                            a: {}
                        }
                    },
                    axisTick: {
                        show: false,
                        inside: true,
                        alignWithLabel: true,
                        length: 3 * this.fontScale,
                        lineStyle: {
                            width: 2 * this.fontScale,
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
                        margin: 3 * this.fontScale,
                        textStyle: {
                            color: "#535a68", //X轴文字颜色
                            fontSize: 12 * this.fontScale
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    data: ["欠费", "已交费", "0元订单"],
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },

                    axisLabel: {
                        show: true,
                        color: "#535a68", //y轴文字颜色
                        fontSize: 12 * this.fontScale
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
                        barWidth: "50%",
                        barGap: "-89%",
                        barHeight: "100%",
                        itemStyle: {
                            normal: {
                                color: "#0c1830" //3f474d
                            }
                        },
                        z: 10, //图层值
                        data: this.maxData
                    },
                    {
                        name: "",
                        type: "pictorialBar",
                        symbol: "rect",
                        barWidth: "40%",
                        symbolSize: ["14%", "100%"],
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
                        data: this.maxData,
                        animationEasing: "elasticOut"
                    },
                    {
                        name: "",
                        type: "bar",
                        barWidth: "36%",
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
                        data: this.barData
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