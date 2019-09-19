<template>
    <div class="charts" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts"
import resize from '@/mixin/chartsResize'
export default {
    name: "pieCharts",
    props: {
    },
    data() {
        return {
            chart: null,
            fontScale: 1//字体的缩放大小
        };
    },
    mixins: [resize],
    mounted() {
        this.fontScale = document.documentElement.clientWidth / 1920
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
                    show: false,
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    show: false,
                },
                // title: {
                //     text: "交易诈骗",
                //     left: "center",
                //     top: "50%",
                //     textStyle: {
                //         color: "#0cfbff",
                //         fontSize: 16 * this.fontScale,
                //         align: "center",
                //         fontWeight: 500
                //     }
                // },
                graphic: {
                    type: "text",
                    left: "center",
                    top: "center",
                    style: {
                        text: "36.6%",//这是百分比
                        textAlign: "center",
                        fill: "#7e8fbe",
                        fontSize: 18 * this.fontScale,
                        fontWeight: 600
                    }
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['55%', '65%'],
                        center: ['center', 'center'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    //自定义颜色
                                    var colorList = ['#f2436a', '#1e2843'];
                                    return colorList[params.dataIndex]
                                }
                            }
                            //

                        },
                        label: {
                            normal: {
                                show: false,
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [//注意 第一个未将要显示得真实值  第二个值未 按照
                            { value: 80, name: '' },
                            { value: 20, name: '' }
                        ]
                    }
                ]
            });
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