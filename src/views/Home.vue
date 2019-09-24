<template>
  <div class="home">
    <div class="home-left">
      <div class="home-left-top">
        <div class="logo">
          <span class="logoName">日照智慧停车监控中心</span>
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
        <div
          v-for="(item,index) in parkingLotData"
          :class="{activeTab:activeParkingLotType===index}"
          :key="index"
          class="tabs"
          @click="changeParkingLot(index)"
        >{{item}}</div>
      </div>
      <div class="home-left-content">
        <div class="content-left">
          <wisdom-title title="泊位监控" />
          <div class="left-contet-contet">
            <div class="left-top wisdom-left-content-h">
              <div class="left-top-left wisdom-border-1px">
                <div class="pieCharts-item">
                  <!-- <charts-title name="利用率" /> -->
                  <pie-charts title="利用率" />
                </div>
                <div class="pieCharts-item">
                  <!-- <charts-title name="空置率" /> -->
                  <pie-charts title="空置率" />
                </div>
              </div>
              <div class="left-top-right wisdom-4px wisdom-border-1px">
                <div class="home-float left-top-right-item">
                  <!-- <charts-title name="最近30天变化曲线" /> -->
                  <line-charts
                    unit="/天"
                    :chartsObj="thChangeObj"
                    title="最近30天变化曲线"
                    title-top
                    :symbol-color="['#a61c3d','#548cc2']"
                  />
                </div>
                <div class="home-float left-top-right-item">
                  <!-- <charts-title name="最近12个月变化曲线" /> -->
                  <line-charts
                    :chartsObj="mtChangeObj"
                    title="最近12个月变化曲线"
                    title-top
                    :symbol-color="['#a61c3d','#548cc2']"
                  />
                </div>
              </div>
            </div>
            <div class="wisdom-line"></div>
            <div class="left-bottom wisdom-left-content-h wisdom-border-1px">
              <div class="home-float left-bottom-bg">
                <div class="title">周转率</div>
                <div class="amount">{{velocity | formatToPrice }}</div>
              </div>
              <div class="home-float left-bottom-item">
                <!-- <charts-title name="最近三十天周转率" /> -->
                <bar-charts unit="/天" :chartsObj="thVelocityObj" title="最近三十天周转率" />
              </div>
              <div class="home-float left-bottom-item">
                <!-- <charts-title name="最近十二个月周转率" /> -->
                <bar-charts :chartsObj="mtVelocityObj" title="最近十二个月周转率" />
              </div>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="content-right-top wisdom-map">
            <div class="content-right-top-scale wisdom-content-right-top-scale">
               <div class="mask wisdom-mask"></div>
              <map-charts></map-charts>
            </div>
            <!-- <map-charts></map-charts> -->
            <b-map />
          </div>
          <div class="content-right-bottom">
            <line-charts
              :chartsObj="vehicleDataObj"
              lineDotted
              unit="/时"
              yname="车辆/万辆"
              title="24小时停车流量监控"
              :symbol-color="['#fff','#548cc2']"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="home-right">
      <wisdom-title title="平台数据" />
      <div class="right-top">
        <div class="right-top-item wisdom-right-height right-top-item-bg">
          <div class="left wisdom-left-width">
            <div class="type-name">会员总数</div>
            <div class="amount wisdom-amount">
              <span class="amount-num">{{membersNum | formatToPrice}}</span>
              <span class="amount-unit">万</span>
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
              <span class="amount-unit">万</span>
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
            <div class="title">今日订单总数</div>
            <div class="amount">{{todayOrderNum | formatToPrice}}</div>
          </div>
        </div>
      </div>

      <div class="right-bottom">
        <div class="bottom-item wisdom-right-bottom-hg">
          <wisdom-title title="今日订单信息" />
          <TransBarCharts />
        </div>

        <div class="bottom-item wisdom-right-bottom-hg">
          <wisdom-title title="最近30天订单信息" />
          <order-bar-charts :chartsObj="orderDataObj" />
        </div>
        <div class="bottom-item wisdom-right-bottom-hg">
          <order-trans-bar-charts />
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
//最近三十天订单信息象形图
import OrderTransBarCharts from "@/components/OrderTransBarCharts";
//地图
import MapCharts from "@/components/MapCharts";
//百度地图
import BMap from "@/components/BMap";
//数字特效
import AnimatedNumber from "animated-number-vue";
//标题
import WisdomTitle from "@/components/WisdomTitle";

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
    BMap,
    OrderBarCharts,
    OrderTransBarCharts
  },
  data() {
    return {
      sysTime: "", //系统时间
      vehicles: 1548, //车辆数量
      berth: 5848, //泊位数量
      membersNum: 12548, //会员总数
      activeMembersNum: 1258, //30天会员活跃数
      vehiclesNum: 14582, //车辆总数
      activeVehiclesNum: 584, //30天车辆活跃数
      todayOrderNum: 12547, //今日订单数
      velocity: 12, //周转率
      parkingLotData: [
        "全部停车场",
        "门前三包区域停车场",
        "公共停车场",
        "社会停车场",
        "景区停车场",
        "收费停车场",
        "停车场诱导",
        "免费停车场"
      ],
      activeParkingLotType: 0 //当前停车场类型
    };
  },
  mixins: [chartsDataFn],
  computed: {},
  watch: {},
  filters: {
    formatToPrice: value => {
      return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    }
  },
  methods: {
    /**
     * 停车场类型切换
     * @param {Number} index  停车场类型缩影
     */
    changeParkingLot(index) {
      if (this.activeParkingLotType == index) return;
      this.activeParkingLotType = index;
    },
    /**
     * 获取系统时间
     */
    getSystemTime() {
      let now = new Date(),
        year = now.getFullYear(), //得到年份
        month = now.getMonth(), //得到月份
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
  created() {},
  mounted() {
    this.getSystemTime();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
$clearance: 4px;
@mixin homeFlex($ai: center, $jc: center) {
  display: flex;
  align-items: $ai;
  justify-content: $jc;
}
@mixin homeBorder() {
  background: url(../assets/img/border.png) no-repeat center center/ 100% 100%;
}

.home {
  width: 100%;
  height: 100%;
  padding: 4px 4px 1px;
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
  .wisdom-border-1px {
    border: solid 0.01rem #19476a;
  }
  .wisdom-line {
    height: 0.02rem;
    width: 100%;
    background-color: #19476a;
  }
  .home-left {
    height: 100%;
    width: calc(75% - #{$clearance});
    .home-left-top {
      height: 18px;
      width: 100%;
      @include homeFlex(center, space-between);
      .logo {
        height: 100%;
        @include homeFlex(flex-start, space-between);
        flex-direction: column;
        .logoName {
          letter-spacing: 1px;
          text-indent: 1px;
          font-weight: 600;
          font-size: 9.6px;
          color: #fff;
        }
        .time {
          letter-spacing: 1px;
          text-indent: 1px;
          font-weight: 600;
          font-family: "DS-Digital";
          font-size: 6px;
          color: #6d7373;
        }
      }
      .top-count {
        height: 100%;
        box-sizing: border-box;
        @include homeFlex(center, flex-end);
        flex-direction: row;
        .type-margin {
          margin-right: 40px;
        }
        .statistical-type {
          @include homeFlex(center, flex-end);
          flex-direction: row;
          height: 100%;
          img {
            width: 11px;
            height: 11px;
            margin-right: 3px;
          }
          .type {
            height: 16px;

            @include homeFlex(center, space-between);
            align-self: flex-start;
            flex-direction: column;
            .name {
              font-size: 5px;
              color: #6ba2ef;
              opacity: 0.74;
            }
            .count {
              font-size: 8px;
              color: #fe2959;
              font-weight: 600;
              font-family: "DS-Digital";
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
      background-color: #0c1a25;
      .tabs {
        height: 8px;
        border-radius: 1px;
        padding: 0 8px;
        text-align: center;
        font-size: 6px;
        color: #6a6e6f;
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
      height: calc(100% - 32px);
      @include homeFlex(center, space-between);
      padding-top: 2px;
      box-sizing: border-box;
      .content-left {
        width: 35%;
        height: 100%;
        @include homeBorder;
        padding: 2px;
        box-sizing: border-box;
        .left-contet-contet {
          height: calc(100% - 14px);
          width: 100%;
          @include homeFlex(center, space-between);
          flex-direction: column;
          .wisdom-left-content-h {
            height: calc(50% - 4px);
          }
          .left-top {
            width: 100%;
            @include homeFlex(center, space-between);
            .left-top-left {
              width: 30%;
              height: 100%;
              .pieCharts-item {
                @include homeFlex();
                height: 50%;
                width: 100%;
                // background: url(../assets/img/pieCharts.png) no-repeat center
                //   center / 85% auto;
                // position: relative;
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
              }
            }
          }
          .left-bottom {
            width: 100%;
            @include homeFlex(center, space-between);
            flex-direction: column;
            .left-bottom-bg {
              width: 100%;
              height: 30px;
              background: url(../assets/img/left-bottom-bg.png) no-repeat center
                center / 90% 90%;
              .title {
                height: 12px;
                width: 100;
                line-height: 12px;
                padding-top: 3px;
                text-align: center;
                font-size: 4px;
                font-weight: 600;
                color: #548cc2;
              }
              .amount {
                height: 13px;
                width: 100;
                line-height: 13px;
                text-align: center;
                font-size: 10px;
                color: #fe2959;
                font-family: "DS-Digital";
              }
            }
            .left-bottom-item {
              width: 100%;
              height: calc((100% - 35px) / 2);
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
          padding:1px;
          box-sizing:border-box;
        }
        .content-right-top {
          width: 100%;
          @include homeBorder;
          position: relative;
          .wisdom-content-right-top-scale {
            border: 1px solid #020973;
            border-radius: 2px;
          }
          .content-right-top-scale {
            position: absolute;
            top: 2px;
            left: 2px;
            width:60px;
            height: 60px;
            z-index: 10;
            background-color:rgba(0,1,3,.5);
           
            .wisdom-mask{
              border:1px solid rgb(179, 5, 6);
              border-radius:2px;
            }
.mask{
  position:absolute;
  top:13px;
  right:1px;
  width:48px;
height:40px;
background-color:rgba(60,34,45,0.5);

z-index:10
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
    padding: 4px;
    box-sizing: border-box;
    // @include homeFlex(center, space-between);
    @include homeBorder;
    flex-direction: column;
    .right-top {
      width: 100%;
      height: 40%;
      @include homeFlex(center, space-between);
      flex-direction: column;
      .wisdom-right-height {
        height: calc(100% / 3 - 6px);
      }
      .right-top-item-bg {
        background: url(../assets/img/right-top.png) no-repeat center center /
          100% 100%;
      }
      .right-top-item-bottom-bg {
        background: url(../assets/img/right-top-bottom.png) no-repeat center
          center / 100% 100%;
        .content {
          width: 100%;
          height: 34px; //44px
          .title {
            width: 100%;
            height: 3px;
            padding-right: 4px;
            text-align: center;
            font-size: 4px;
            color: #548cc2;
          }
          .amount {
            height: 34px;
            width: 100%;
            @include homeFlex(center, center);
            font-size: 14px;
            text-align: center;
            color: #f43b66;
            font-family: "DS-Digital";
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
          height: 0.02rem;
          border-radius: 3px;
          background-color: #466898;
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
          background: url(../assets/img/home-right-c.png) no-repeat center
            center / 90% 70%;
          padding: 0 3px;
          box-sizing: border-box;
          .type-name {
            padding-left: 3px;
            box-sizing: border-box;
            font-size: 5.5px;
            font-weight: 600;
            color: #386096;
          }
          .wisdom-amount {
            letter-spacing: 3px;
            text-indent: 3px;
          }
          .amount {
            padding-left: 2px;
            box-sizing: border-box;
            font-size: 12px;
            color: #6ba2ef;
            overflow: hidden;
            text-overflow: ellipsis;
            font-family: "DS-Digital";
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
            font-size: 5px;
            font-weight: 600;
            color: #6b7893;
          }

          .wisdom-right-line {
            width: 100%;
            height: 13px;
            background: url(../assets/img/home-right.png) no-repeat left center;
          }
          .amount {
            font-size: 9px;
            color: #6ba2ef;
            font-family: "DS-Digital";
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
        height: calc(100% / 3 - 20px);
      }
      .bottom-item {
        width: 100%;
      }
    }
  }
}
</style>