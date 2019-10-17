<template>
    <div class="charts" id="map" ref="myEchart"></div>
</template>

<script>
import { queryMapPointData, queryMapPolygonData } from "@/request/common";
import echarts from "echarts";
import "echarts/extension/bmap/bmap";

//
//地图数据
//import 'echarts/map/js/china' // 引入中国地图数据
//import rizhaoJson from "@/assets/data/rizhaoMap.json";
//东港区数据
//import rizhaoJson from "@/assets/data/donggang.json";

//echarts.registerMap("rizhao", rizhaoJson);

//东港区乡镇边界
import { villagesTowns, coordinates } from "@/assets/data/donggang";

import resize from "@/mixin/chartsResize";
export default {
    name: "pieCharts",
    props: {
        mapData: {
            type: Array,
            default: () => {
                return [
                    {
                        type: "inducedParking",
                        name: "诱导停车场",
                        data: []
                    },
                    {
                        type: "parkingLot",
                        name: "停车场",
                        data: []
                    },
                    {
                        type: "heatMap",
                        name: "热力图数据",
                        data: []
                    }
                ];
            }
        }
    },
    mixins: [resize],
    watch: {
        mapData: {
            handler() {
                // if (this.mapModel) this.mapModel.clearOverlays();
                this.markersAndHeatMap();
            },
            deep: true
        }
    },
    data() {
        return {
            curPolygon: [], //当前地图绘制的分区 polygon
            chart: null,
            mapModel: null,
            mapImg1: require("../assets/img/bmapImg.png"), //诱导停车场图片
            mapImg: require("../assets/img/symbol.png"),

            parkingLotImg: require("../assets/img/parkingLotA.gif"), //停车场图片
            parkingLotImg1: require("../assets/img/parkinglotD.gif"),
            mapInfoImg: require("../assets/img/mapInfo.png"),
            mapInfoImgArror: require("../assets/img/home-right.png"),
            markerClusterer: null, //聚合
            markersArr: [], //聚合数据
            fontScale: 1
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
            this.mapModel = new BMap.Map("map");
            var point = new BMap.Point(119.463449, 35.427048);
            this.mapModel.centerAndZoom(point, 11);
            this.mapModel.enableScrollWheelZoom();
            this.mapModel.setMapStyle({
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
            });

            this.$nextTick(() => {
                //设置地图相关属性
                this.setMapPro();

                this.markersAndHeatMap();
                //this.resizeCharts();
                //地图点击事件
                this.mapModel.addEventListener("click", e => {
                    if (e.overlay == null) {
                        let ele = document.getElementById("mapInfo");
                        if (ele) ele.remove();
                    }
                });
            });
        },
        markersAndHeatMap() {
            // 清除图层(每次重新调用需要清除上一个覆盖物图层
            //热力图
            this.initHeatMap();
            //标注停车场
            this.drawParkingLot(this.mapImg1);
        },
        //热力图
        initHeatMap() {
            var heatmapOverlay = new BMapLib.HeatmapOverlay({
                radius: 10
            });
            this.mapModel.addOverlay(heatmapOverlay);
            heatmapOverlay.setDataSet({
                data: this.mapData[2].data,
                max: Math.max.apply(
                    Math,
                    this.mapData[2].data.map(v => {
                        return v.count;
                    })
                )
            });
            heatmapOverlay.show();
        },
        //设置地图属性
        setMapPro() {
            // this.mapModel.addControl(
            //   new BMap.NavigationControl({
            //     anchor: BMAP_ANCHOR_TOP_RIGHT
            //   })
            // );
            //绘制东港区边界
            //this.drawBoundary(rizhaoBoundary['dg']);
            //乡镇边界
            this.drawVillagesTowns();
            //设置最下缩放等级
            this.mapModel.setMinZoom(10);
            //绘制区域名称
            //  this.drawBoundaryName()

            //   //限制拖动范围
            //   let b = new BMap.Bounds(new BMap.Point(118.955169,35.868739),new BMap.Point(119.750852,35.006747));
            // try {
            //     BMapLib.AreaRestriction.setBounds(this.mapModel, b);
            // } catch (e) {
            //     alert(e);
            // }

            this.mapModel.addEventListener("zoomend", () => {
                let _zoom = this.mapModel.getZoom();
                for (let i = 0; i < this.curPolygon.length; i++) {
                    if (_zoom < 14) this.curPolygon[i].setFillOpacity(0.6);
                    else this.curPolygon[i].setFillOpacity(0.2);
                }
            });
        },
        //绘制边界
        drawBoundary(boundryData, color = "#0e97ff", name) {
            let count = boundryData.length;
            for (let i = 0; i < count; i++) {
                let ply = new BMap.Polygon(boundryData[i], {
                    strokeWeight: 3 * this.fontScale,
                    strokeColor: "#4876FF", //"#406eb4",
                    fillColor: color,
                    fillOpacity: 0.6
                });
                ply.name = name
                this.polygonEvent(ply, color, name)
                //建立多边形覆盖物
                this.curPolygon.push(ply);
                this.mapModel.addOverlay(ply); //添加覆盖物
                ply.disableMassClear();
            }
        },
        polygonEvent(polygon, color, name) {
            // let that = this;
            // polygon.addEventListener('click', function (e) {
            //     //停车场弹窗 取消
            //     let ele = document.getElementById("mapInfo");
            //     if (ele) ele.remove();
            //     //其余polygon 填充色还原
            //     for (let i = 0; i < that.curPolygon.length; i++) {
            //         if (that.curPolygon[i] !== this)
            //             that.curPolygon[i].setFillColor(color)
            //     }
            //     let _color = this.getFillColor()
            //     _color = _color == '#2656b9' ? color : "#2656b9";
            //     this.setFillColor(_color)
            // })
            polygon.addEventListener('mouseover', function (e) {
                this.setFillColor('#2656b9')
            })
            //区域点击 获取区域数据
            polygon.addEventListener('click', e => {
                //这里应该获取数据
                // queryMapPolygonData(pointId)
                //     .then(data => {
                //         let _data = data.data.data;
                //         parkingLotInfo = {
                //             parkignName: "",
                //             berthNum: _data.spaceTotal,
                //             freeBerth: _data.residueSpaceTotal
                //         };
                //         this.showParingLotInfo(point, parkingLotInfo);
                //     })
                //     .catch();
                //点击坐标
                let point = e.point
                //显示弹窗信息
                this.showParingLotInfo(point, {
                    parkignName: name,
                    berthNum: 0,
                    freeBerth: 0
                });
            })
            polygon.addEventListener('mouseout', function (e) {
                this.setFillColor(color)
            })
        },
        drawBoundaryName() {
            for (let i = 0; i < coordinates.length; i++) {
                let point = new BMap.Point(
                    coordinates[i].lnglat[0],
                    coordinates[i].lnglat[1]
                );
                var label = new BMap.Label(coordinates[i].name, {
                    offset: new BMap.Size(1, -1),
                    position: point,
                    zIndex: 1
                });

                label.setStyle({
                    color: "#fff",
                    fontSize: "9px",
                    backgroundColor: "0.05",
                    border: "0",
                    fontWeight: "bold"
                });
                this.mapModel.addOverlay(label);
            }
        },
        //绘制乡镇边界
        drawVillagesTowns() {
            for (let i = 0; i < villagesTowns.length; i++) {
                this.drawBoundary(villagesTowns[i].coordinates, villagesTowns[i].color, villagesTowns[i].name);
            }

            this.mapModel.setMinZoom(10);
        },
        /**
         *  绘制停车场--生成聚合数据
         */
        drawParkingLot() {
            //切换时移除面板
            let ele = document.getElementById("mapInfo");
            if (ele) ele.remove();

            //清楚聚合
            this.clearMarkerClusterer();
            //停车场坐标 this.mapData.length
            for (let i = 0; i < 2; i++) {
                let _type = this.mapData[i].type;
                let myIcon = new BMap.Icon(
                    _type == "parkingLot" ? this.parkingLotImg : this.mapImg,
                    new BMap.Size(50, 50),
                    {}
                );
                let points = this.mapData[i].data;
                for (let i = 0; i < points.length; i++) {
                    let _point = new BMap.Point(points[i].lonlat[0], points[i].lonlat[1]);
                    let marker = new BMap.Marker(_point, {
                        icon: myIcon,
                        zIndex: 999
                    });
                    //添加标注点击事件
                    this.parkingLotClick(
                        marker,
                        _point,
                        points[i],
                        _type,
                        this.mapData[i].pointId
                    );
                    this.markersArr.push(marker);
                }
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
         * @param {*} type 停车场类型
         * @param {*} pointId 停车场坐标点
         */
        parkingLotClick(marker, point, parkingLotInfo, type, pointId) {
            let _this = this;
            marker.addEventListener("click", e => {
                queryMapPointData(pointId)
                    .then(data => {
                        let _data = data.data.data;
                        parkingLotInfo = {
                            parkignName: "",
                            berthNum: _data.spaceTotal,
                            freeBerth: _data.residueSpaceTotal
                        };
                        this.showParingLotInfo(point, parkingLotInfo);
                    })
                    .catch();
            });

            //鼠标移动上事件
            marker.addEventListener("mouseover", function () {
                let img = type == "parkingLot" ? this.parkingLotImg : this.mapImg;
                this.setIcon(
                    new BMap.Icon(
                        type == "parkingLot" ? _this.parkingLotImg1 : _this.mapImg1,
                        new BMap.Size(60, 60),
                        {
                            imageOffset: new BMap.Size(0, 0) // 图片相对视窗的偏移
                            // imageSize: new BMap.Size(35, 35) // 引用图片实际大小
                        }
                    )
                );
            });

            marker.addEventListener("mouseout", function () {
                this.setIcon(
                    new BMap.Icon(
                        type == "parkingLot" ? _this.parkingLotImg : _this.mapImg,
                        new BMap.Size(50, 50)
                    )
                );
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
            parkingLotInfo = { parkignName: "停车场", berthNum: 100, freeBerth: 88 }
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
            ComplexCustomOverlay.prototype.initialize = function (map) {
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
         <div  style='height:20px;text-align:right;line-height:20px;padding-right:13px;color:#2f7cf0'>${parkingLotInfo.parkignName}</div>
         
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
                    <span>空余泊位</span>
              </div>
                <span style="font-size: 16px;color:#2f7cf0">${parkingLotInfo.freeBerth}</span>
            </div>


          </div>
        `;
                div.innerHTML = span;

                let arrow = document.createElement("div");
                arrow.id = "mapInfoArrow";
                arrow.style.cssText = `position:absolute;top:51px;left:-41px;width:41px;height:20px;background:transparent;
          border:1px dashed #4a5a74 ;border-top:none;border-right:none;;
         `;
                div.appendChild(arrow);

                map.getPanes().labelPane.appendChild(div);
                return div;
            };
            ComplexCustomOverlay.prototype.draw = function () {
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
    background-color: transparent !important;
}
</style>