<template>
 
    <div class="charts" ref="myEchart"></div>

</template>

<script>
import echarts from "echarts";
import "echarts/extension/bmap/bmap";

//
//地图数据
import mapData from "@/assets/data/mapData";
//import 'echarts/map/js/china' // 引入中国地图数据
//import rizhaoJson from "@/assets/data/rizhaoMap.json";
//东港区数据
//import rizhaoJson from "@/assets/data/donggang.json";

//echarts.registerMap("rizhao", rizhaoJson);
//东港区边界数据
import rizhaoBoundary from "@/assets/data/mapData";

import resize from "@/mixin/chartsResize";
export default {
  name: "pieCharts",
  props: {
    chartsObj: {
      type: Object,
      default: () => {
        return {
          data: [],
          xAxisData: [],
          colors: ["#f33b65", "#bb6ea4"]
        };
      }
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
      mapModel: null,
      mapImg: require("../assets/img/bmapImg.png"),
      mapImg1: require("../assets/img/symbol.png"),
      mapInfoImg: require("../assets/img/mapInfo.png"),
      mapInfoImgArror: require("../assets/img/home-right.png"),
      markerClusterer: null, //聚合
      markersArr: [] //聚合数据
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
  computed: {},
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      this.chart.setOption({
        bmap: {
          center: [119.3, 35.439282],
          zoom: 11,
          roam: true, //地图是否可缩放
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#031628"
                }
              },
              {
                featureType: "land",
                elementType: "geometry",
                stylers: {
                  color: "#000102"
                }
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#0b3d51"
                }
              },
              {
                featureType: "local",
                elementType: "geometry",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "railway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "railway",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#08304b"
                }
              },
              {
                featureType: "subway",
                elementType: "geometry",
                stylers: {
                  lightness: -70
                }
              },
              {
                featureType: "building",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#857f7f"
                }
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "building",
                elementType: "geometry",
                stylers: {
                  color: "#022338"
                }
              },
              {
                featureType: "green",
                elementType: "geometry",
                stylers: {
                  color: "#062032"
                }
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#465b6c"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#022338"
                }
              },
              {
                featureType: "label",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              }
            ]
          }
        },
        series: []
      });
      this.mapModel = this.chart
        .getModel()
        .getComponent("bmap")
        .getBMap();
        //设置地图相关属性
        this.setMapPro();
      //标注停车场
      this.drawParkingLot(this.mapImg1); 

      this.resizeCharts();
      //地图点击事件
      this.mapModel.addEventListener("click", e => {
      if(e.overlay==null){
          let ele = document.getElementById("mapInfo");
         if (ele) ele.remove();
      }
       
      });
    },
    //设置地图属性
    setMapPro(){
      //设置最下缩放等级
         this.mapModel.setMinZoom(10);
            this.mapModel.addControl(new BMap.NavigationControl({
        anchor : BMAP_ANCHOR_TOP_RIGHT
    }));    
             //绘制东港区边界
      this.drawBoundary("dg");
    
    //   //限制拖动范围
    //   let b = new BMap.Bounds(new BMap.Point(118.955169,35.868739),new BMap.Point(119.750852,35.006747));
    // try {   
    //     BMapLib.AreaRestriction.setBounds(this.mapModel, b);
    // } catch (e) {
    //     alert(e);
    // }
    },
    //绘制边界
    drawBoundary(name) {
      let boundryData = rizhaoBoundary[name];
      let count = boundryData.length;
      for (let i = 0; i < count; i++) {
        let ply = new BMap.Polygon(boundryData[i], {
          strokeWeight: 4,
          strokeColor: "#0e97ff",
          fillColor: "transparent",
          fillOpacity: 0.3
        }); //建立多边形覆盖物
        this.mapModel.addOverlay(ply); //添加覆盖物
      }
    },

    /**
     *  绘制停车场--生成聚合数据
     *
     *  @param {*}  img 停车场标注图片
     *
     *  @param {String} 边框指示箭头颜色  根据当前停车场的图片显示 红 黄：默认黄
     */
    drawParkingLot(img, color) {
      //切换时移除面板
      let ele = document.getElementById("mapInfo");
      if (ele) ele.remove();
      //停车场坐标
      let points = [
        [119.438048, 35.439282],
        [119.548048, 35.449282],
        [119.23, 35.459282],
        [119.32, 35.5],
        [119.478048, 35.479282],
        [119.488048, 35.489282]
      ];
      let myIcon = new BMap.Icon(img, new BMap.Size(43, 43), {});
      //情况聚合
      this.clearMarkerClusterer();
      for (let i = 0; i < points.length; i++) {
        let _point = new BMap.Point(points[i][0], points[i][1]);
        let marker = new BMap.Marker(_point, {
          icon: myIcon
        });
        //添加标注点击事件
        this.parkingLotClick(marker, _point, color, {
          name: "黑龙江停车场",
          berthNum: 100,
          freeBerth: 88
        });
        this.markersArr.push(marker);
      }
      this.markerClusterer = new BMapLib.MarkerClusterer(this.mapModel, {
        markers: this.markersArr
      });
      //  this.mapModel.addOverlay(marker);
    },
    /**
     * 停车场添加点击事件
     * @param {*} marker 停车场marker
     * @param {*} point 百度坐标
     * @param {*} parkingLotInfo 停车场信息
     */
    parkingLotClick(marker, point, parkingLotInfo) {
       let _this=this;
      marker.addEventListener("click", e => {
        this.showParingLotInfo(point,  parkingLotInfo);
      });

      //鼠标移动上事件
      marker.addEventListener("mouseover", function () {
this.setIcon(new BMap.Icon(_this.mapImg,new BMap.Size(43,43)));
});

    marker.addEventListener("mouseout", function () {
this.setIcon(new BMap.Icon(_this.mapImg1,new BMap.Size(43,43)));
});

    },

    /**
     * 点击停车场显示弹窗
     * @param {*} point 百度坐标
     * @param {String} color 边框指示箭头颜色  根据当前停车场的图片显示 红 黄：默认黄
     * @param {*} parkingLotInfo 停车场信息
     */
    showParingLotInfo(
      point,
      parkingLotInfo = { name: "停车场", berthNum: 100, freeBerth: 88 }
    ) {
      let ele = document.getElementById("mapInfo");
      if (ele) ele.remove();
      let _this = this;
      /// 复杂的自定义覆盖物
      function ComplexCustomOverlay(point, text, mouseoverText) {
        this._point = point;
        this._text = text;
        this._overText = mouseoverText;
      }
      ComplexCustomOverlay.prototype = new BMap.Overlay();
      ComplexCustomOverlay.prototype.initialize = function(map) {
        this._map = map;
        let div = (this._div = document.createElement("div"));
        div.id = "mapInfo";
        div.style.position = "absolute";
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        div.style.background = `url( ${_this.mapInfoImg} ) no-repeat center center / 100% 100%`;
        div.style.color = "white";
        div.style.width = "258px";
        div.style.height = "147px";
        div.style.whiteSpace = "nowrap";
        div.style.MozUserSelect = "none";
        div.style.fontSize = "12px";

        //绘制内容
        let span = `
         <div  style='height:20px;text-align:right;line-height:20px;padding-right:13px;color:#2f7cf0'>${parkingLotInfo.name}</div>
         
         <div style='display:flex;justify-content: space-between;align-items: center;flex-direction: column;padding:12px 25px;'>
            
            <div style='width:100%;height:40px;text-align:right;display:flex;justify-content: space-between;align-items: center;flex-direction: row;border-bottom: 1px solid #193052;'>
              <div style='display:flex;justify-content: space-between;align-items: center;flex-direction: row;'>
                    <div style='width:6px;height:6px;margin-right: 8px;background-color: #2f7cf0;'></div>
                    <span>泊位数量</span>
              </div>
                <span style="font-size: 16px;color:#2f7cf0">${parkingLotInfo.berthNum}</span>
            </div>

            <div style='width:100%;height:40px;text-align:right;display:flex;justify-content: space-between;align-items: center;flex-direction: row;border-bottom: 1px solid #193052;'>
              <div style='display:flex;justify-content: space-between;align-items: center;flex-direction: row;'>
                    <div style='width:6px;height:6px;margin-right: 8px;background-color: #2f7cf0;'></div>
                    <span>泊位数量</span>
              </div>
                <span style="font-size: 16px;color:#2f7cf0">${parkingLotInfo.freeBerth}</span>
            </div>


          </div>
        `;
        div.innerHTML = span;

        let arrow =  document.createElement("div");
        arrow.id='mapInfoArrow'
        arrow.style.cssText = `position:absolute;top:51px;left:-41px;width:41px;height:20px;background:transparent;
          border:1px dashed #4a5a74 ;border-top:none;border-right:none;;
         `;
        div.appendChild(arrow);

        map.getPanes().labelPane.appendChild(div);
        return div;
      };
      ComplexCustomOverlay.prototype.draw = function() {
        let map = this._map;
        let pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x + 40 + "px"; //parseInt(this._arrow.style.left) + "px";
        this._div.style.top = pixel.y - 40 + "px";
      };
      let txt = "日照停车",
        mouseoverTxt = txt + " " + parseInt(Math.random() * 1000, 10) + "套";

      let myCompOverlay = new ComplexCustomOverlay(point, "日照", mouseoverTxt);
      this.mapModel.addOverlay(myCompOverlay);
    },
    //清空聚合标注
    clearMarkerClusterer() {
      if (!this.markerClusterer) return;
      this.markerClusterer.clearMarkers();
      this.markersArr = [];
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