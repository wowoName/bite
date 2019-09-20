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
                }
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
                this.initChart()
            },
            deep: true
        }
    },
    data() {
        return {
            chart: null

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
    computed: {

    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$refs.myEchart);
            // 把配置和数据放这里
            this.chart.setOption({
                grid: {
                    top: "10%",
                    bottom: "10%",
                    left: "8%",
                    right: "6%"
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
                        fontSize: 8,
                        margin: 10,
                        padding: [0, 0, -18, -12],
                        rich: {
                            a: {}
                        }
                    },
                    nameGap: 8,
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
                    axisLabel: {
                        show: true,
                        margin: 3,
                        textStyle: {
                            color: "#535a68", //X轴文字颜色
                            fontSize: 8
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            width: 2,
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
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#535a68", //y轴文字颜色
                                fontSize: 8
                            }
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#FFFFFF"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "",
                        type: "line",
                        smooth: false, //平滑曲线显示
                        symbol: 'none',
                        lineStyle: {
                            color: "#f43b66",
                            width: 1
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
                        name: '',
                        type: 'bar',
                        barWidth: '30%',
                        silent: true,
                        itemStyle: {
                            color: '#7c83de'
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