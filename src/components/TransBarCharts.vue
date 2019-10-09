<template>
    <div class="charts" ref="myEchart"></div>
</template>

<script>
//横向柱状图
import echarts from "echarts";
import resize from "@/mixin/chartsResize";
export default {
    name: "TransBarCharts",
    props: {
        data: {
            type: Array,
            default: () => {
                return [0, 0, 0, 0];
            }
        }
    },
    watch: {
        data: {
            handler() {
                this.initChart();
            },
            deep: true
        }
    },
    data() {
        return {
            fontScale: 1, //字体的缩放大小
            chart: null
        };
    },
    computed: {
        maxData() {
            let max = Math.max.apply(Math, this.data),
                _max = max * 1.1;
            _max = _max < 10 ? 10 : _max;
            return [_max, _max, _max, _max];
        }
    },
    mixins: [resize],
    mounted() {
        this.fontScale = document.documentElement.clientWidth / 1920;
        this.myChart = this.chart = echarts.init(this.$refs.myEchart);
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
            // 把配置和数据放这里
            this.myChart.setOption({
                grid: {
                    //这个是用来设置echarts图标的位置和其他设置
                    left: "-10%",
                    right: "8%",
                    bottom: 2 * this.fontScale,
                    top: 0,
                    containLabel: true //一般都带上这个，否则x,y轴的刻度值会被截取掉
                },
                tooltip: {
                    trigger: "axis",
                    formatter: params => {
                        return params[0].name + ":" + params[0].value;
                    },
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    show: true,
                    name: "", //x轴 单位
                    nameLocation: "end",
                    nameTextStyle: {
                        color: "#535a68",
                        fontSize: 12 * this.fontScale,
                        margin: 10,
                        padding: [0, 0, -18, -5],
                        rich: {
                            a: {}
                        }
                    },
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
                            fontSize: 12 * this.fontScale
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
                            margin: 40,
                            textStyle: {
                                color: "#535a68", //y轴文字颜色
                                fontSize: 13 * this.fontScale,
                                align: "left",
                                baseline: "middle"
                            }
                        }
                    },
                    {
                        show: true,
                        inverse: true,
                        data: [], //这是右侧文字
                        axisLabel: {
                            textStyle: {
                                fontSize: 8 * this.fontScale,
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
                        data: this.data,
                        barWidth: "50%",
                        itemStyle: {
                            normal: {
                                barBorderRadius: 10 * this.fontScale,
                                color: function (params) {
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
                        data: this.maxData, //应该为最大值
                        barWidth: "50%",
                        itemStyle: {
                            normal: {
                                color: "none",
                                borderColor: "#2d3857",
                                borderWidth: 1 * this.fontScale,
                                barBorderRadius: 10 * this.fontScale
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