<template>
    <div class="charts" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts"
import resize from '@/mixin/chartsResize'
export default {
    name: "TransBarCharts",
    props: {},
    data() {
        return {
            chart: null,
            maxData: [400, 400, 400, 400]
        };
    },
    mixins: [resize],
    props: {
        //坐标轴数据
        yData: {
            type: Array,
            default: () => {
                return ['进行中', '欠费', '已交', '0元订单']
            }
        },
        //数据
        barData: {
            type: Array,
            default: () => {
                return [145, 260, 88, 356]
            }
        }

    },
    mounted() {
        this.maxData = this.maxData.slice(0, this.barData.length)
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
            let myChart = this.chart = echarts.init(this.$refs.myEchart);

            // 把配置和数据放这里
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
                    textStyle: {
                        color: '#fff',
                    },

                },
                grid: {
                    top: '0.5%',
                    left: '3%',
                    right: '3%',
                    bottom: '0.5%',
                    containLabel: true
                },
                yAxis: [{
                    type: 'category',
                    data: this.yData,
                    inverse: true,
                    axisTick: {
                        show: false,
                        alignWithLabel: true
                    },
                    axisLabel: {
                        show: true,
                        margin: 3,
                        textStyle: {
                            color: "#535a68", //X轴文字颜色
                            fontSize: 9,
                            fontWeight: 'bold'
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#a5c0d3'
                        }
                    },
                    splitLine: {
                        show: false
                    }

                }],
                xAxis: [{
                    type: 'value',
                    axisLabel: {
                        show: true,
                        margin: 3,
                        textStyle: {
                            color: "#535a68", //X轴文字颜色
                            fontSize: 9,
                            fontWeight: 'bold'
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#192469'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                }],
                series: [{ // 外边框
                    name: '',
                    type: 'pictorialBar',
                    symbol: 'reat',
                    symbolOffset: ['-1%', 0], //位置
                    symbolSize: ['52%', '80%'],
                    itemStyle: {
                        normal: {
                            color: 'rgba(54,215,182,0.27)'
                        }
                    },
                    z: -1, //图层
                    symbolRepeat: null,
                    data: this.maxData,
                    animationEasing: 'elasticOut',

                }, {
                    name: '',
                    type: 'bar',
                    barWidth: '50%',
                    barMinHeight: "20%",
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                x1: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: '#6a9fea'
                                }, {
                                    offset: 1,
                                    color: '#f83d67'
                                }]
                            }
                        }
                    },
                    z: 1,
                    data: this.barData//这里是真正的数据
                }, {
                    name: '',
                    barWidth: '50%',
                    barMinHeight: "25%",
                    type: 'pictorialBar',
                    symbol: 'rect',
                    itemStyle: {
                        normal: {
                            color: '#0c2640'
                        },

                    },
                    symbolRepeat: true,
                    symbolSize: [6, "70%"],
                    symbolOffset: [4, 0],
                    symbolMargin: 4,
                    data: this.barData,//这里是真正的数据
                    z: 20
                }, {
                    name: '',
                    barWidth: '70%',
                    type: 'pictorialBar',
                    symbol: 'rect',
                    itemStyle: {
                        normal: {
                            color: 'transparent'//#0c2640
                        },

                    },
                    symbolRepeat: true,
                    symbolSize: [6, 10],
                    symbolMargin: 2,
                    z: -1,
                    data: this.maxData//这里是数据的最大值 重复n次
                }
                ]
            })
            this.resizeCharts()
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