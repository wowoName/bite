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
        chartsObj: {
            type: Object,
            default: () => {
                return {
                    data: [],
                    xAxisData: [],
                    colors: ["#f33b65", "#bb6ea4"]
                };
            }
        },
        unit: {
            type: String,
            default: "/月"
        }
    },
    mixins: [resize],
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
            img: [
                "image://data:image/png;base64,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",
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAACXBIWXMAABcSAAAXEgFnn9JSAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAA2PSURBVHja7J15jFXVHcc/782bAWQGGGAQkU1GYAZZBmwFm6CobbFaQW2qdrGL0damSZs2pDWatmltxT/6T9M0TU1t0laNTf9wSbVC496ItEU2hQFFwK0UZF9EmOH0j/c9zuHMufee++bNDBh/yc28ue/cs3zvbz/LKxhDf1IRaASGA4OATl0loAAYoAOo0d+i7tXoeg/YA+wFTvTXIAr9AGIj0GTbB/bper+CugYAw3TZkewSqB86EM8Axot79gD/6yXOKQJnirNPANuBI6c7iE3AWcBB4E2JZF9RjV5cA/BfcehpBeJZAnCXBtDf1Kv9qTaIQ4FzxXU7OfVoFDAOeA3Yf6qBWARaZFk3O0r+VKQCMEXi3l4N3VwNEBuAZmCTXI7ThQYBU4Et0tn9BuI4oE4dOV2pGTgmFdTnIE4D3q2C7qsBJuqF1Oqe0eeC/EcjlWHFEeA4sE1uTE/lqUn68pW+ArEIzAReBw70QJRmA/XSo9sFSB4XqCQuGq8+HQRW90ClDAEmAevy6sm8IJYE4MYKOztWzx/RgPdXUSwbgY+Jg9cBb1X4clv1fEdvgFgQ97wsHZKHzgHOk95Z18vWuwC0AWerr9tyPl8HTNdLNtUGcZbclzwc2ABc5IDX19Qm7n8aOJwzTJ0MrK0miJaL8ujA8xXDPpvBucOk28YCIyWWZyi5gAzLESUV3pWYblHSIpazFgC7gVU5deS4GGMTA+IEcV+sFa4FFkpvJrk+w8UlswWcpWNKUBx2gK8DBuuZOqfsuxK5NXomiybrWp5D343SC93WExCHqqJXc4R9nwSWAYcC348BLhFnF1SmXWBvi+CuYXKHmhUh1UtvvSKRfSfj+Xq94OU5HOzJYqD9lYBYlB5cHdnYSOATwGNyW/zOXyHuKyi6eVEvp7MH/uVkYJ7COMSVf88AqAR8FvinuDmG5qjuE3lBbBV3xBiSM9XQEwGL1gYsBgYKtCciOCYvjQEuF6hHgUc06DQLfgWwIlIVDJIEbMwD4lBxVkw41yARftgDsAZYBFwgsX0UWN/L1ngGcJX69C+12ZkC5JUyfDGi3SzO3R8L4qxI814roB7xlPUA4EY1/DrwYEZHZwOXAhdKNMfKOiKP4C25VyuApzJUTANwg6KPLcCfSZ56KALXigFijE1bkMON6XaNMYZRgfuh60pjGOzdG2AM3zKGpcbwOWMoJjzbYAxLjGGjMZic10Y925BQd1FtL1VfBqaMoV7jiBnvKOFz0v1QwVmRFc4xhnO9ezXGcLM6f4UxZU73rpIxfM8Y9lQAnn/tMYbvq06/nYL6sFR9qkkZyxSNJ2bc3fDxxXm0dEjWfMRQWcVl3v1rpANXSsR9ZdEC/EXxs08HgOekRjY7EcZgGYw2RT9DAs+uA66Xu+TrvcXAXOnIh1LGtBB4IUI/Nknf70gS5xmRb+MaY6j17rXprd+SIMKLjOFggJuWGcPiQH2hq1ZllwXqOWgMVyeItpWONCmrS3g+dM1IEud6Y5gUUcE5gc4MMYafGMMdCXrqa8bQ4Q16lTHMi+x06JqnOtw6O9RWSP/eoT4OSalztjFMjGh7kvDqBuL0BN0S4kL/3g160zMTONAF8IQx3BXZVtZVMoZfqE4XyEWBstPUxxsy6rw2st0PuLHo+XVZZn4CsDUhR/hqIFPTAtyvum1sfCNwO9WZg+4A7gC+7MTaNcADatulDYqUZqrPSbRd48xqt+D6STYhEJNgmBbwHy/R32WB8OpBhXw25X+TQK02PaC6jWOMHlQfXFru9TlEL2mcWbRLuH0A4ugIEAc48x1uNrlV1vRtr/x35LRbWtpLAFq6X224AcN3vTLviBtbLQABMpq/qctob6eSMx/I+MwIPXChMTR69y6VnmkJKPI9nhGpiWjjU8ZwjzFsMYZjxnBIjvU9+i7r+Rpj+I/T7t6AIZmqPl+WUs8IY7ggor1pVicWI/XTELqvtpqtuHizd/9Wcamlb2dka1qUyloO3KKQrVZi2aJ7y1WmJaWeTrXlps6+6ZV5VX1uS6lnNzAiAhMDFO36wKyUUImTjZAV5ZHKbPgpopucz8uU9kqii+UIL4jo9AKVvTilzEqlwyzd7H1/Qn0e6b1on445BjEN7OFF6Yas9XwTlEhwaZL+bgkE6S63/DqDAx9R0sBSu6z3Il23e5FIg55pTan3t87nKZIYl7Y4mZkkekPTA2m0F2jEGFojZH9BwK9bLN0y1Lu/xNFJ+1MikYIxrHDKdhrD7Qn+Y8kYblMZW35FQmxuI5t9Ttkl3vdD1ffFGdHRgghsWos5Jns6AjHk0UB+ba7z+VlZuhBdpvjb0o+BuxL0cwdwt8pYmqc8ZoiOKw53y7q0X8nmppQxH6drRUYqxYIYSos3JmSFXVFOyy5f73zeKJCy6G4vu3xdSlm37amB7/dk6MRoigWxkDA3ezRwf2xA94TIdXj/FDnX0qmyli5NKeu2HdJthzWGqoAYM/NcShDx9xMyy67YpKXbXUc8llZngBNquyFBXOsqkMBubk4xgcsq5di+oL5cQBqFTSwnvpfgRw0I3D/oJW+rTXOcz29mJI5DfXLnh45VAcQTPeHEI5oG9emtBJHNoprIMjc6/z8VqS5CYA8me3uGqSYnJjmaoSC+3XO8Y+mHEWV+4GVY/poxM2dpU+D7mCDDVJMTCwmpoIEBkV3phXS1GdbW0p3AbQlcXxTId3rt/COh3lpgvvP/iwFRHxQxlxRjCwqlHihzK7YTvRzjk17S4jOUJ9FJUAn1eklFWemvAH+kvL7GUF4r+FUvzDsMfD2FUy5X8iHUJ9tnAum7iigWxBAnvu7onrWeC7LJcXC/kQLiCQE52LnXmuF476U8q7gxpcytzufNdJ/sb47wY6M9gVjXpSMAuF0v2Bqo5179PSqOGJFRtw0Rs+g5hXBpZedSXmdj6feBMbeq73szQt3jsSB2RMSI2xMs7RqJ42Tv/u+UBfm3Pse80QWU537vpTyP0yku3ax7C6VjN2dY7984/+9T+y5NVp/XZPRnosadRrVAR8mJIXdmgPjpgJVb7SQS3O8OSLcNlwHYF8nxy+maB6mEfkp5ha6ln9N9de88vdSsJYPjKSeB06gR2FsSS7dkgNiZwE17pJtaKS9ve8cTvZKe7YsN3V9S7tHSWuBXXpmzpKs3kr2krhQRz48ANhU1wJiUz8EEv/BpxyL6Svl4AMDeCCGvA/7gGMDDwBcCabWF+vtMRn0jI6WnYP1EG4xnRQwveaLiujrrpWtmRKbVplYJvBLwM8rTo3WO1HwxYL2nqd31ZG9BmxOhM2ssg1gQd2Cn/9Lj57oEd+cxWeJFCRmTkL6x2ZWGCgGcJyf6R06fOhNcqgbgavXxsQjuqk1I87k0yqrAoqPbmiI6/nJCKHeA8rxHPeUFllki26GXUnTKxqgUu6j0ccoLPs/3HPDPS6x99XE9XXMzByK4MGZFb5PVqyVPh5VInz7dro6vTnB3JgEfp7zk99EU18ZIpKY493aSvLRuCuXJ+Iu8SMRS0tI61JdmuVtrIqVkVYQa6RpbBavCJqZM9vuLPNNWlq2q0iLPJSmLo2IXebqrwibkXRXmit0hL/xKom1yFUoJrtB94rL5Cs9Cor1VjvNtCdyTRe16diLwy4D0FNX2fPXlvgh3pU5u2vaI9gfj7NOpdKVsvcKrJxO+z7vwfQ7l+ZJ58lnHOGK7T/5nuwzJU/IUkqhBot1M9sJ33/15PiLH2G2lbGj3QOzOgfOlWLemuAB2C8ZB6ciXe9nhnu54CFlbMPyExDDi9v7NxFtCGAJxjPzGmHNkrhJnHM5IjrqbgR5332KVaLRSblOI2wzkS9UC4G+RFrnWi8wS97G0RXaiTgA9lGHVGzTINkenrRSolYaERTn4c+ma615D9rY038peE9H/VFzSdlSNoPv6mySAQjuqQjRGum8aXRsk7W7U7cRtkJwg8Wula4PkBoWfeZKseXdUTaK8gCl6R5VNjm6N8NxRTG03R8akvUZQXmQ0i/BW3UOcvFW3nvBW3bXyWXfn5GIL4AvE7e0bSPn0gFx7+6y45Nll2iS35WHyrcduFGedrTqGq9MDncTuUQ12l7htC5WfTFeSLn+e+F2ms/XCcu8ytWJdzf3O/U0Nyovm6V+P9jtbyrvzvqSOvpaRhe5rmiJAltHHO+8tVXIGxByJ5jP07ZF/oZd6iVTBmhzPVfUMCNe8t0caGjc8mi89tr4fAJwjPRsTibhkzxGLAr2vzsWZoAG9oZCtt8/Fma02X4qMhX3ft9fOxbGiMV2mvpIzYMdTzn4f0QCreULTMEnLYFnSSk5oGiAfdj29dEKT6/qcJx+yUgs8SAMeqth2m67jOTlmkvRWUfp6DZWfFVavrNAGevmsMJeqeWrdOImfPanOcn2nvrd/O5ykbociqjeroB5GyenfUJH++Oj8xP49P9F1YD86ybMK9NGZslW2kM2c+qcb5zmwrc9BdFNeoyknL3ecAuCNVp92UP3ToXr9xHd7SPgBcWdnHwJnrf4QevnQ9L787YGx0p376f3fHhgmF+htPgS/PRAi91cwoOtXMI5VUFcdXb+CYelD+ysYaZzTSDnTPZCuZXg1jiU9zsm/x2Kfq1EyZDf9/Hss/x8AEp3oAc3XhC4AAAAASUVORK5CYII=",

            ], fontScale: 1 //字体的缩放大小
        };
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
    computed: {
        //根据柱状图数据计算 折线数据添加拐点样式
        getLineData() {
            let max = Math.max.apply(null, this.chartsObj.data),
                min = Math.min.apply(null, this.chartsObj.data);
            return this.chartsObj.data.map(v => {
                if (v == max || v == min)
                    return {
                        value: v,
                        symbol: this.img[0],
                        symbolSize: 15
                    };
                else return v;
            });
        }
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$refs.myEchart);
            // 把配置和数据放这里
            this.chart.setOption({
                title: {
                    left: "left",
                    text: this.title,
                    top: -3,
                    textStyle: {
                        color: "#548cc2",
                        fontSize: 12 * this.fontScale
                    }
                },
                grid: {
                    top: 16,
                    bottom: 16,
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
                        fontSize: 11 * this.fontScale,
                        margin: 10,
                        padding: [0, 0, -18, -6],
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
                            fontSize: 13 * this.fontScale
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
                    },
                    {
                        type: "value",
                        min: 0,
                        max: 100,
                        splitNumber: 29, //背景条数
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
                        name: "",
                        type: "line",
                        smooth: false, //平滑曲线显示
                        symbolSize: 0,
                        symbol: this.img[0],
                        lineStyle: {
                            color: "#bf375e",
                            width: 1
                        },
                        // areaStyle: {
                        //     color: "rgba(5,140,255, 0.2)"
                        // },
                        //根据数据设置最大值的的smybol  以及最小值的symbol
                        data: this.getLineData
                    },
                    {
                        name: "",
                        type: "bar",
                        barWidth: "50%",
                        silent: true,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: this.chartsObj.colors[0] //'#f23c64'
                                },
                                {
                                    offset: 0.5,
                                    color: this.chartsObj.colors[0] //'#f23c64'
                                },
                                {
                                    offset: 1,
                                    color: this.chartsObj.colors[1] //'#9492d0'
                                }
                            ])
                        },
                        data: this.chartsObj.data
                    },
                    {
                        type: "pictorialBar",
                        animation: true,
                        animationDuration: 200,
                        symbol: "rect",
                        symbolRepeat: "fixed",
                        symbolClip: true,
                        symbolSize: ["60%", "10%"],
                        symbolOffset: [0, 0],
                        symbolMargin: 2,
                        itemStyle: {
                            color: "#020a18"
                        },
                        data: this.chartsObj.data
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