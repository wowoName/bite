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
    mixins: [resize],
    data() {
        return {
            chart: null,
            img: [
                'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAACXBIWXMAAAsSAAALEgHS3X78AAAEp0lEQVR42u3cz4sjRRTA8W9Vd3Vn8mMmjj9WQWSRZQ+CsH+B7MnDIgiCd0E8CYJ/gOAIelo8ehUP/gF6WLw5/gMueFP2sIcF0dHd2Z1kknR11fOQZJJJMtlZd03H7HtQpNOTnpn+8Lrm1etmjIig8e/DKoECKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIqoAJudKTr+osZMNPvBUQBHwHsPF9fB9R0DeHMOQ6T6WOrhEzXBM4swDOL0M6CrArRVoq3t2dGUIb9fTvatg8ZZup1PDBgzPmy98mey6qfzjLz2WaWjEUZKEvGyi9nWyneMOvGIyFQo2Sbg4MUSChpU9IeTTUpJdsEajPZOJeJG5uBZj7rLLduWS5dGm6XNLEELOFUFj54ACJCaychkpDSASK3bwsXL0YgVpWJKwM0iy9Zy8HdGru7jvt3Pbu7w0wES7drTwAbjTHMGCsQcIAnYTC1/wRx0wEnl27JNgZI8HQ6Kc1mQq83RNzaMjPzXqDbjTQaJRFLxIyyMSxAXEkWrhrQzAAmo5HOjCQf7jflILxOkohL+aUPgV4vEGNJo+E5PAy02+UIMEwBxo0CPDP7Dg5SnEtpt1PA0e87XO25FOoh8IYIH2Y5b45RzGAQBiIltZoHxqMcjbksXAVgdc2EQMYzzzdotyeZWKuleULXJtwT4SODfC2QCWR+IF9KnjuX1Xbo99Op7LVE8iXlz0YBTk5SyLEEjo5OLuccEoFUvHfO+reuUPx4zftXAIcx1hdcF+/TvFab4A0Bs0VwqyhpVnkJT89/Q4DDQ0e77YCMwIUsFMeFZD856699URRvX4nxE4A/jbnxXp7v4Zw3ReGNSDHI8wFQjIafuoyn58L/fB6sth/Ybg9fez2TRC6QZcZYvgHsazF+MP7YCyLXcM7gvSXLDGBqYDg+NhwdmSpPoTrAkub0W+f4FSB1fDucIunMHSLpO8WAH0rSy8u+19MBCHB4OHzd2pI+CEUhpigEiN+l6WcdY252jLn5s7Wf472ImPcN8pUl/tEHoV4XWq1Ke4KrLmPsTA3oODpytFoOyJKSyzHyMSIxteWngMW5cSEdDJQUhTdZVgxOz3/+jFJm4+bA2e5JpNU6WZ4Fw99JwnWMKccwpeddP+B7GZTNUPKqybJy0O+Hs1YfMz9swwvpB8fbGDG0GuGkkK7V0hxSmZQpABI8l2z0v3sJf50qpAMJCd2qCulql3LD1lRGQjm7lEsDz0rkxTQOfiPPxUBcuJTbbhss/Y1eyi3NwsmKInmkZsKk5gtPUzNhvp11507CSy/X6XYStpvFudpZw1ZWIOF4Cq6SdtbKbioJyAhRTu3u9yMJXerN+ugvaQQsjcZ8Q3VnZwxlSDhe1lB9GjrSw5b+1avT8+Jw+979nNaOI6U3KpTrWAosxVQmygK4ld8X0ZtK/7eViExD7O1NQPb3T7fsl4/4sBpwYzPwjFbTo95Yl9l9Vd1YN1X/147HebSjary1AHyc5qc+XLQEQx9ve8Kg6xr6hKoCKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIq4JrHP8fEWV8FMTmOAAAAAElFTkSuQmCC',
                'image://data:image/png;base64,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',
                'image://data:image/png;base64,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',
                'image://data:image/png;base64,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',
            ],
            colorList: ['#04FEF9', '#77ED4D', '#48A3FF', '#FFE822', '#FF61D8', '#FCCF77'],
            fillImg: 'data:image/jpeg;base64,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yPFGKkxRigLkeKMVJijFAXI8UYqTFGKAuR4oxUmKMUBcjxRipMUYoC5HijFSYoxQFyPFGKkxRigLkeKMVJijFAXI8UYqTFGKAuR4oxUmKMUBcjxRipMUYoC5HijFSYo20BcjxRipMUYoC5HijFSYoxQFyPFGKk20YoC4/FGKl20baoyuRYoxUu2jbQHMRYoxUu2jbQFyLFGKl20baA5iLFGKl20baA5iLFGKl20baAuRYoxUu2jbQFyLFGKl20baA5iLFGKl20baAuRYoxUu2jbQFyLFGKl20baA5iLFGKl20baAuRYoxUu2jbQFyLFGKl20baAuRYoxUu2jbQFyLFGKl20baAuRYoxUu2jbQFyLFGKl20baAuRYoxUu2jbQFyTFGKk20baoyuR4oxUm2jbQFyPFGKk20baAuR4oxUm2jbQFyPFGKk20baAuR4oxUm2jbQFyPFGKk20baAuR4oxUm2jbQFyPFGKk20baAuR4oxUm2jbQFyPFGKk20baAuR4oxUm2jbQFyPFGKk20baAuR4oxUm2jbQFyPFGKk20baAuR4oxUm2jbQFyPFGKk20baAuR4oxUm2jbQFyPFGKk20baAuSYoxUuKMUzLmIsUYqXFGKA5iLFGKlxRigOYixRipcUYoDmIsUYqXFGKA5iLFGKlxRigOYixRipcUYoDmIsUYqXFGKA5iLFGKlxRigOYixRipcUYoDmIsUYqXFGKA5iLFGKlxRigOYixRipcUYoDmIsUYqXFGKA5iLFGKlxRigOYixRipcUYoDmIsUYqXFGKA5iLFGKlxRigOYixRipcUYoDmJNtG2pNtG2qsY8xHto21Jto20WDmI9tG2pNtG2iwcxHto21Jto20WDmI9tG2pNtG2iwcxHto21Jto20WDmI9tG2pNtG2iwcxHto21Jto20WDmI9tG2pNtG2iwcxHto21Jto20WDmI9tG2pNtG2iwcxHto21Jto20WDmI9tG2pNtG2iwcxHto21Jto20WDmI9tG2pNtG2iwcxHto21Jto20WDmI9tG2pNtG2iwcxHto21Jto20WDmI9tG2pNtG2iwcxLijFSbaNtVYy5iPFGKk20baLBzEeKMVJto20WDmI8UYqTbRtosHMR4oxUm2jbRYOYjxRipNtG2iwcxHijFSbaNtFg5iPFGKk20baLBzEeKMVJto20WDmI8UYq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'
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
    methods: {

        initChart() {
            this.chart = echarts.init(this.$refs.myEchart);
            // 把配置和数据放这里
            this.chart.setOption({
                title: {
                    text: '',
                    textStyle: {
                        align: 'center',
                        color: '#fff',
                        fontSize: 20,
                    },
                    top: '3%',
                    left: '10%',
                },
                grid: {
                    top: "25%",
                    bottom: "10%"
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                        label: {
                            show: true
                        }
                    }
                },
                legend: {
                    data: ["最近30天周转率", "最近30天周转率"],
                    top: "15%",
                    textStyle: {
                        color: "#ffffff"
                    }
                },
                xAxis: {
                    data: [//x轴文字
                        "00",
                        "01",
                        "02",
                        "03",
                        "04",
                        "05",
                        "06",
                        "07",

                    ],
                    axisLine: {
                        show: false //隐藏X轴轴线
                    },
                    axisTick: {
                        inside: false,
                        length: 2,
                        show: true //隐藏X轴刻度样式
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#ebf8ac" //X轴文字颜色
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#01FCE3'
                        }
                    },
                },
                yAxis: [{
                    type: "value",
                    name: "",
                    nameTextStyle: {
                        color: "#ebf8ac"
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: true
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#535a68"//y轴文字颜色
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#FFFFFF'
                        }
                    },
                },
                {
                    type: "value",
                    name: "",
                    nameTextStyle: {
                        color: "#535a68"
                    },
                    position: "right",
                    splitLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        formatter: "{value} %", //右侧Y轴文字显示
                        textStyle: {
                            color: "#535a68"
                        }
                    }
                },
                {
                    type: "value",
                    gridIndex: 0,
                    min: 50,
                    max: 100,
                    splitNumber: 8,
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
                series: [{
                    name: "",
                    type: "line",
                    smooth: true, //平滑曲线显示
                    symbolSize: 120,
                    symbol: this.img[3],
                    lineStyle: {
                        color: "#bf375e"
                    },
                    areaStyle: {
                        color: "rgba(5,140,255, 0.2)"
                    },
                    data: [10, 5, 15, 25, 9, 20, 14]
                },
                {
                    type: 'pictorialBar',
                    animation: true,
                    animationDuration: 600,
                    symbol: 'image://' + this.fillImg,
                    symbolRepeat: true,
                    symbolSize: [25, 4],
                    symbolMargin: 1,
                    barWidth: '60%',

                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: '#6DE8FA'
                        }
                    },
                    data: [10, 5, 15, 25, 9, 20, 14]
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