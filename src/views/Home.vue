<template>
    <div class="home">
        <div class="home-left">
            <div class="home-left-top">
                <div class="logo">
                    <span class="logoName">日照市静态交通监管指挥中心</span>
                    <span class="time">{{sysTime}}</span>
                </div>
                <div class="top-count">
                    <div class="statistical-type type-margin">
                        <img src="@/assets/img/park.png" alt />
                        <div class="type">
                            <span class="name">停车数量</span>
                            <span class="count">{{vehicles | formatToPrice}}</span>
                        </div>
                    </div>
                    <div class="statistical-type">
                        <img src="@/assets/img/line.png" alt />
                        <div class="type">
                            <span class="name">泊位数量</span>
                            <span class="count">{{berth | formatToPrice}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="home-left-tabs">
                <div v-for="(item,index) in parkingLotData" :class="{activeTab:activeParkingLotType===item.type}" :key="index" class="tabs" @click="changeParkingLot(item.type)">{{item.name}}</div>
            </div>
            <div class="home-left-content">
                <div class="content-left wisdom-new-border">
                    <div class="wisdom-border-1"></div>
                    <div class="wisdom-border-2"></div>
                    <div class="wisdom-border-3"></div>
                    <div class="wisdom-border-4"></div>

                    <wisdom-title title="泊位监控" />
                    <div class="left-contet-contet">

                        <div class="left-top wisdom-left-content-h">
                            <div class="left-top-left wisdom-border-1px">
                                <div class="pieCharts-item">
                                    <echarts-title title="利用率" is-pie />
                                    <pie-charts :data="utilizationPie" />
                                </div>
                                <div class="pieCharts-item">
                                    <echarts-title title="空置率" is-pie />
                                    <pie-charts :data="vacancyRatePie" />
                                </div>
                            </div>
                            <div class="left-top-right wisdom-4px wisdom-border-1px">
                                <div class="home-float left-top-right-item">
                                    <echarts-title title="近30天变化曲线" is-pie />
                                    <line-charts unit="/天" is-left-line :chartsObj="thChangeObj" title-top :symbol-color="['#a61c3d','#548cc2']" />
                                </div>
                                <div class="home-float left-top-right-item">
                                    <echarts-title title="近12个月变化曲线" is-pie />
                                    <line-charts :chartsObj="mtChangeObj" title-top is-left-line :symbol-color="['#a61c3d','#548cc2']" />
                                </div>
                            </div>
                        </div>
                        <div class="left-line">
                            <div class="wisdom-left-line"></div>
                        </div>
                        <div class="left-bottom wisdom-left-content-h wisdom-border-1px">
                            <div class="home-float left-bottom-bg">
                                <div class="title">周转率</div>
                                <div class="amount">{{velocity | formatToPrice }}</div>
                            </div>
                            <div class="home-float left-bottom-item">
                                <echarts-title title="近三十天周转率" />
                                <!-- <charts-title name="最近三十天周转率" /> -->
                                <bar-charts unit="/天" toolTip='近三十天周转率' :chartsObj="thVelocityObj" />
                            </div>
                            <div class="home-float left-bottom-item">
                                <echarts-title title="近十二个月周转率" />
                                <!-- <charts-title name="最近十二个月周转率" /> -->
                                <bar-charts :chartsObj="mtVelocityObj" toolTip='近十二个月周转率' />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-right">
                    <div class="content-right-top wisdom-map wisdom-new-border">
                        <div class="wisdom-border-1"></div>
                        <div class="wisdom-border-2"></div>
                        <div class="wisdom-border-3"></div>
                        <div class="wisdom-border-4"></div>
                        <div class="content-right-top-scale wisdom-content-right-top-scale">
                            <div class="mask wisdom-mask"></div>
                            <map-charts></map-charts>
                        </div>
                        <!-- <div class="wisdom-mapBg"></div> -->
                        <b-map :mapData="mapData" />
                    </div>
                    <div class="content-right-bottom">
                        <line-charts :chartsObj="vehicleDataObj" lineDotted unit="/时" yname="车辆/辆" title="24小时停车流量监控" :symbol-color="['#fff','#548cc2']" />
                    </div>
                </div>
            </div>
        </div>
        <div class="home-right wisdom-new-border">
            <div class="wisdom-border-1"></div>
            <div class="wisdom-border-2"></div>
            <div class="wisdom-border-3"></div>
            <div class="wisdom-border-4"></div>
            <wisdom-title title="平台数据" />
            <div class="right-top">
                <div class="right-top-item wisdom-right-height right-top-item-bg">
                    <div class="left wisdom-left-width">
                        <div class="type-name">会员总数</div>
                        <div class="amount wisdom-amount">
                            <span class="amount-num">{{membersNum | formatToPrice}}</span>
                            <!-- <span class="amount-unit">万</span> -->
                        </div>
                    </div>

                    <div class="right">
                        <span class="type-name">30天活跃数</span>
                        <div class="wisdom-right-line"></div>
                        <span class="amount">{{activeMembersNum | formatToPrice}}</span>
                    </div>
                </div>

                <div class="right-top-item wisdom-right-height right-top-item-bg">
                    <div class="left wisdom-left-width">
                        <div class="type-name">车辆总数</div>
                        <div class="amount wisdom-amount">
                            <span class="amount-num">{{vehiclesNum | formatToPrice}}</span>
                            <!-- <span class="amount-unit">万</span> -->
                        </div>
                    </div>

                    <div class="right">
                        <span class="type-name">30天活跃数</span>
                        <div class="wisdom-right-line"></div>
                        <span class="amount">{{activeVehiclesNum | formatToPrice}}</span>
                    </div>
                </div>
                <div class="wisdom-right-top-line">
                    <div class="wisdom-right-top-line"></div>
                    <div class="wisdom-right-top-line"></div>
                </div>
                <div class="right-top-item wisdom-right-bottom-height right-top-item-bottom-bg">
                    <div class="content">
                        <div class="title">今日停车总数</div>
                        <div class="amount">{{todayOrderNum | formatToPrice}}</div>
                    </div>
                </div>
            </div>

            <div class="right-bottom">
                <div class="bottom-item wisdom-right-bottom-hg bottom-item-1">
                    <wisdom-title title="今日停车信息" />
                    <div class="right-bottom-item">
                        <TransBarCharts :data="todayOrderData" />
                    </div>
                </div>

                <div class="bottom-item wisdom-right-bottom-hg">
                    <wisdom-title title="近30天停车信息" />
                    <order-bar-charts :chartsObj="orderDataObj" />
                </div>
                <div class="bottom-item wisdom-right-bottom-hg">
                    <order-trans-bar-charts :barData="orderDataObjBar" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//饼状图
import PieCharts from "@/components/PieCharts";
//折线图
import LineCharts from "@/components/LineCharts";
//柱状图
import BarCharts from "@/components/BarCharts";
//右侧柱状图
import OrderBarCharts from "@/components/OrderBarCharts";
//横向柱状图
import TransBarCharts from "@/components/TransBarCharts";
//最近三十天停车信息象形图
import OrderTransBarCharts from "@/components/OrderTransBarCharts";
//地图
import MapCharts from "@/components/MapCharts";
//百度地图
import BMap from "@/components/BMap";
//数字特效
import AnimatedNumber from "animated-number-vue";
//标题
import WisdomTitle from "@/components/WisdomTitle";
//ecahrts 标题
import EchartsTitle from "@/components/EchartsTitle";
//echarts 数据
import chartsDataFn from "@/mixin/chartsDatas";
export default {
    components: {
        PieCharts,
        AnimatedNumber,
        LineCharts,
        BarCharts,
        TransBarCharts,
        MapCharts,
        WisdomTitle,
        EchartsTitle,
        BMap,
        OrderBarCharts,
        OrderTransBarCharts
    },
    data() {
        return {
            sysTime: "", //系统时间
            vehicles: 0, //车辆数量
            berth: 0, //泊位数量
            membersNum: 0, //会员总数
            activeMembersNum: 0, //30天会员活跃数
            vehiclesNum: 0, //车辆总数
            activeVehiclesNum: 0, //30天车辆活跃数
            todayOrderNum: 0, //今日停车数
            velocity: 0, //周转率
            sliderNum: 0, //地图zoom
            parkingLotData: [
                {
                    name: "全部停车场",
                    type: ""
                },
                {
                    name: "门前三包区域停车场",
                    type: "A911"
                },
                {
                    name: "公共停车场",
                    type: "A912"
                },
                {
                    name: "社会停车场",
                    type: "A913"
                },
                {
                    name: "景区停车场",
                    type: "A914"
                },
                {
                    name: "收费停车场",
                    type: "A904"
                },
                {
                    name: "停车场诱导",
                    type: "A915"
                },
                {
                    name: "免费停车场",
                    type: "A903"
                }
            ],
            activeParkingLotType: "" //当前停车场类型
        };
    },
    mixins: [chartsDataFn],
    computed: {},
    watch: {
        activeParkingLotType: {
            handler: function () {
                this.getAllChartsData();
            },
            deep: true
        }
    },
    filters: {
        formatToPrice: (value = 0) => {
            return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
        }
    },
    methods: {
        /**
         * 停车场类型切换
         * @param {Number} index  停车场类型缩影
         */
        changeParkingLot(value) {
            if (this.activeParkingLotType == value) return;
            this.activeParkingLotType = value;
        },
        /**
         * 获取系统时间
         */
        getSystemTime() {
            let now = new Date(),
                year = now.getFullYear(), //得到年份
                month = now.getMonth() + 1, //得到月份
                date = now.getDate(), //得到日期
                day = now.getDay(), //得到周几
                hour = now.getHours(), //得到小时
                minu = now.getMinutes(), //得到分钟
                sec = now.getSeconds(); //得到秒
            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;
            if (hour < 10) hour = "0" + hour;
            if (minu < 10) minu = "0" + minu;
            if (sec < 10) sec = "0" + sec;
            this.sysTime =
                year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
            setTimeout(() => {
                this.getSystemTime();
            }, 1000);
        }
    },
    created() { },
    mounted() {
        this.getSystemTime();
    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' >
.el-slider.is-vertical {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.el-slider.is-vertical .el-slider__runway {
    width: 100% !important;
    height: calc(100% - 5px);
    margin: 5px 0 0 !important;
    background-color: #37455f;
}
.el-slider.is-vertical .el-slider__bar {
    width: 100% !important;
    background-color: #37455f;
}
.el-slider__button {
    width: 8px !important;
    height: 1px !important;
    border-radius: 0 !important;
    background-color: #fdfeff;
    border-color: #fdfeff;
    margin-bottom: 8px;
}
.el-slider.is-vertical .el-slider__button-wrapper {
    width: 100%;
    left: -3px !important;
}
.el-slider__runway {
    text-align: center;
}

$clearance: 4px;
@mixin homeFlex($ai: center, $jc: center) {
    display: flex;
    align-items: $ai;
    justify-content: $jc;
}
@mixin homeBorder($url: url(../assets/img/border.png)) {
    background: $url no-repeat center center/ 100% 100%;
    // border:1px solid #162331
}

@mixin homeBorder-1 {
    .wisdom-border-1 {
        position: absolute;
        top: -1px;
        left: -1px;
        width: 15px;
        height: 15px;
        border-top: 1.5px solid #586c7b;
        border-left: 1.5px solid #586c7b;
        border-radius: 2px;
    }
    .wisdom-border-2 {
        position: absolute;
        bottom: -1px;
        left: -1px;
        width: 15px;
        height: 15px;
        border-bottom: 1.5px solid #586c7b;
        border-left: 1.5px solid #586c7b;
        border-radius: 2px;
    }
    .wisdom-border-3 {
        position: absolute;
        top: -1px;
        right: -1px;
        width: 15px;
        height: 15px;
        border-top: 1.5px solid #586c7b;
        border-right: 1.5px solid #586c7b;
        border-radius: 2px;
    }
    .wisdom-border-4 {
        position: absolute;
        bottom: -1px;
        right: -1px;
        width: 15px;
        height: 15px;
        border-bottom: 1.5px solid #586c7b;
        border-right: 1.5px solid #586c7b;
        border-radius: 2px;
    }
}

.home {
    width: 100%;
    height: 100%;
    padding: 4px 4px;
    box-sizing: border-box;
    @include homeFlex(center, space-between);
    background: url(../assets/img/bg-bluish.png) no-repeat center center / 100%
        100%;
    .home-float {
        position: relative;
    }
    .homeBOrder {
        color: #fff;
    }
    .wisdom-new-border {
        border: 1px solid #1f2c3a;
    }
    .wisdom-border-1px {
        border: solid 0.01rem #1f2c3a;
    }
    .wisdom-line {
        height: 0.02rem;
        width: 100%;
        background-color: #162331;
    }
    .home-left {
        height: 100%;
        width: calc(75% - #{$clearance});
        .home-left-top {
            height: 11.11%;
            width: 100%;
            @include homeFlex(center, space-between);
            .logo {
                height: 100%;
                @include homeFlex(flex-start, center);
                flex-direction: column;
                .logoName {
                    letter-spacing: 1px;
                    text-indent: 1px;
                    font-weight: 600;
                    font-size: 18px;
                    color: #fff;
                    font-family: "Noto Sans Chinese Medium";
                }
                .time {
                    letter-spacing: 1px;
                    text-indent: 1px;
                    font-weight: 600;
                    font-family: "Century Gothic";
                    font-size: 6px;
                    color: #6d7373;
                }
            }
            .top-count {
                height: 100%;
                box-sizing: border-box;
                @include homeFlex(center, center);
                flex-direction: row;
                .type-margin {
                    margin-right: 40px;
                }
                .statistical-type {
                    @include homeFlex(center, center);
                    flex-direction: row;
                    height: 100%;
                    img {
                        width: 14px;
                        height: 14px;
                        margin-right: 3px;
                    }
                    .type {
                        height: 100%;
                        @include homeFlex(flex-start, center);
                        align-self: flex-start;
                        flex-direction: column;
                        .name {
                            font-size: 2px;
                            color: #6ba2ef;
                            opacity: 0.74;
                        }
                        .count {
                            font-size: 14px;
                            color: #fe2959;
                            font-weight: "Regular";
                            font-family: Century-Gothic;
                        }
                    }
                }
            }
        }
        .home-left-tabs {
            height: 10px;
            width: 100%;
            @include homeFlex(center, space-between);
            margin-top: 4px;
            border-radius: 1px;
            background-color: #01060c;
            .tabs {
                height: 8px;
                border-radius: 1px;
                padding: 0 8px;
                text-align: center;
                font-size: 6px;
                color: #b6b9b9;
                transition: all 0.1s;
                cursor: pointer;
            }
            .activeTab {
                background-color: #a61c3d;
                // color: #be7482;
                color: #efd7d7;
            }
        }

        .home-left-content {
            width: 100%;
            height: calc(88.89% - 14px);
            @include homeFlex(center, space-between);
            padding-top: 2px;
            box-sizing: border-box;
            .content-left {
                width: 35%;
                height: 100%;
                // @include homeBorder;
                @include homeBorder-1;
                padding: 2px;
                box-sizing: border-box;
                position: relative;
                .left-contet-contet {
                    height: calc(100% - 18px);
                    width: 100%;
                    @include homeFlex(center, space-between);
                    flex-direction: column;

                    .left-top {
                        width: 100%;
                        height: calc(50% - 4px);
                        @include homeFlex(center, space-between);
                        .left-top-left {
                            width: 30%;
                            height: 100%;
                            .pieCharts-item {
                                @include homeFlex();
                                height: 50%;
                                width: 100%;
                                position: relative;
                            }
                        }
                        .wisdom-4px {
                            width: calc(70% - 1px);
                        }
                        .left-top-right {
                            height: 100%;
                            padding: 1px 0;
                            box-sizing: border-box;
                            .left-top-right-item {
                                @include homeFlex();
                                height: 50%;
                                width: 100%;
                                position: relative;
                            }
                        }
                    }
                    .left-line {
                        height: 8px;
                        width: 100%;
                        @include homeFlex(center, center);
                        .wisdom-left-line {
                            width: 100%;
                            height: 1px;
                            background-color: #1f2c3a;
                        }
                    }
                    .left-bottom {
                        height: calc(50% - 4px);
                        width: 100%;
                        @include homeFlex(center, space-between);
                        flex-direction: column;
                        .left-bottom-bg {
                            width: 153px;
                            height: 30px;
                            background: url(../assets/img/left-bottom-bg.png)
                                no-repeat center center / 90% 90%;
                            .title {
                                height: 12px;
                                width: 100;
                                line-height: 12px;
                                padding-top: 3px;
                                text-align: center;
                                font-size: 2px;
                                color: #548cc2;
                            }
                            .amount {
                                height: 14px;
                                width: 100;
                                line-height: 12px;
                                text-align: center;
                                font-size: 8px;
                                color: #fe2959;
                                font-family: "Century Gothic";
                            }
                        }
                        .left-bottom-item {
                            width: 100%;
                            height: calc((100% - 39px) / 2);
                            position: relative;
                        }
                    }
                }
            }
            .content-right {
                width: calc(65% - #{$clearance});
                height: 100%;
                @include homeFlex(center, space-between);
                flex-direction: column;

                .wisdom-map {
                    height: calc(70% - 4px);
                    padding: 4px;
                    box-sizing: border-box;
                    @include homeFlex(center, center);
                }
                .content-right-top {
                    width: 100%;
                    //  @include homeBorder(url(../assets/img/mapBg.png));
                    position: relative;
                    @include homeBorder-1();
                    .mapControl {
                        position: absolute;
                        right: 4px;
                        top: 4px;
                        width: 10px;
                        z-index: 100;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        flex-direction: column;
                        background-color: #0c1a25;
                        .mapControl-top {
                            width: 16px;
                            height: 16px;
                            background-color: #fff;
                            border-radius: 50%;
                        }
                        .mapControl-bottom {
                            width: 10px;
                            height: 60px;
                            margin-top: 2px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            flex-direction: row;
                            .mapControl-bottom-left {
                                height: 100%;
                                width: 2px;
                                .wisdom-ul {
                                    border-right: 1px solid #6ba2ef;
                                }
                                ul {
                                    height: 50px;
                                    width: 4px;
                                    padding-top: 5px;
                                    position: relative;
                                    .wisdom-li {
                                        height: 1px;
                                    }
                                    .max-li {
                                        width: 4px;
                                        height: 1px;
                                    }
                                    li {
                                        position: absolute;
                                        right: 0;
                                        width: 2px;
                                        height: 100%;
                                        padding: 0;
                                        background-color: #6ba2ef;
                                        position: relative;
                                        .wisdom-span {
                                            position: absolute;
                                            top: 0;
                                            left: -18px;
                                            font-size: 0.5px;
                                            color: #6ba2ef;
                                        }
                                    }
                                }
                            }
                            .mapControl-bottom-center {
                                width: 2px;
                                height: 100%;
                            }
                        }
                    }
                    .wisdom-content-right-top-scale {
                        border: 0.02rem solid #020973;
                        border-radius: 2px;
                    }
                    // .wisdom-mapBg {
                    //     position: absolute;
                    //     top: 0;
                    //     left: 0;
                    //     width: 100%;
                    //     height: 100%;
                    //     background: url(../assets/img/mapBg.png) no-repeat
                    //         center center;
                    //     background-size: calc(100% - 2px) calc(100% - 2px);
                    // }
                    .content-right-top-scale {
                        position: absolute;
                        top: 10px;
                        left: 10px;
                        width: 80px;
                        height: 80px;
                        z-index: 10;
                        background-color: rgba(0, 1, 3, 0.5);
                        .wisdom-mask {
                            border: 1px solid rgb(179, 5, 6);
                            border-radius: 2px;
                        }
                        .mask {
                            position: absolute;
                            top: 15px;
                            right: 2px;
                            width: 62px;
                            height: 56px;
                            background-color: rgba(60, 34, 45, 0.5);

                            z-index: 10;
                        }
                    }
                }
                .content-right-bottom {
                    height: 30%;
                    width: 100%;
                }
            }
        }
    }
    .home-right {
        height: 100%;
        width: 25%;
        padding: 0 4px 6px 4px;
        box-sizing: border-box;
        // @include homeFlex(center, space-between);
        // @include homeBorder;
        @include homeBorder-1;
        flex-direction: column;
        position: relative;
        .right-top {
            width: 100%;
            height: 40%;
            @include homeFlex(center, space-between);
            flex-direction: column;
            .wisdom-right-height {
                height: calc(100% / 3 - 6px);
            }
            .right-top-item-bg {
                background: url(../assets/img/right-top.png) no-repeat center
                    center / 100% 100%;
            }
            .right-top-item-bottom-bg {
                background: url(../assets/img/right-top-bottom.png) no-repeat
                    center center;
                background-size: contain;
                .content {
                    width: 100%;
                    height: auto;
                    // height: 30px; //44px
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-direction: column;
                    // position: relative;
                    .title {
                        // position: absolute;
                        // top: 0;
                        // left: 0;
                        width: 100%;
                        padding-right: 4px;
                        margin-top: -4px;
                        text-align: center;
                        font-size: 5px;
                        color: #548cc2;
                        @include homeFlex(flex-end, center);
                    }
                    .amount {
                        width: 100%;
                        @include homeFlex(center, center);
                        padding-top: 4px;
                        font-size: 14px;
                        text-align: center;
                        color: #f43b66;
                        font-family: Century-Gothic;
                    }
                }
            }
            .wisdom-right-bottom-height {
                height: calc(100% / 3 - 20px);
            }
            .wisdom-right-top-line {
                height: 20px;
                width: 100%;
                @include homeFlex(center, space-around);
                flex-direction: column;
                > div {
                    width: 100%;
                    height: 1px;
                    border-radius: 3px;
                    background-color: #1f2c3a;
                }
            }
            .right-top-item {
                width: 100%;
                @include homeFlex(center, space-between);
                flex-direction: row;
                .wisdom-left-width {
                    width: calc(50% - 6px);
                }
                .left {
                    height: 100%;
                    @include homeFlex(flex-start, center);
                    flex-direction: column;
                    background: url(../assets/img/home-right-c.png) no-repeat
                        center center / 90% 70%;
                    padding: 0 3px;
                    box-sizing: border-box;
                    .type-name {
                        padding-left: 3px;
                        box-sizing: border-box;
                        font-size: 1px;
                        color: #386096;
                    }
                    .wisdom-amount {
                        letter-spacing: 3px;
                        text-indent: 3px;
                    }
                    .amount {
                        padding-left: 2px;
                        box-sizing: border-box;
                        font-size: 10px;
                        color: #6ba2ef;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-family: "Century Gothic";
                        .amount-unit {
                            font-size: 6px;
                        }
                    }
                }
                .right {
                    height: 100%;
                    width: 50%;
                    @include homeFlex(flex-end, center);
                    flex-direction: column;
                    padding-right: 10px;
                    position: relative;
                    .type-name {
                        display: inline-block;
                        margin-bottom: -4px;
                        font-size: 2px;
                        font-weight: 600;
                        color: #6b7893;
                    }

                    .wisdom-right-line {
                        width: 100%;
                        height: 13px;
                        background: url(../assets/img/home-right.png) no-repeat
                            left center;
                    }
                    .amount {
                        font-size: 7px;
                        color: #6ba2ef;
                        font-family: "Century Gothic";
                    }
                }
            }
        }

        .right-bottom {
            width: 100%;
            height: calc(60% - 14px);
            padding-top: 3px;
            box-sizing: border-box;
            @include homeFlex(center, space-between);
            flex-direction: column;
            .wisdom-right-bottom-hg {
                height: calc(100% / 3 - 15px); //20
            }

            .bottom-item {
                width: 100%;
            }
            .bottom-item-1 {
                .right-bottom-item {
                    margin-top: 5%;
                    height: 80%;
                    width: 100%;
                }
            }
        }
    }
}
</style>