import { getData, queryTodayChangeDataInfo, queryStatData, queryMapPoint } from '@/request/common'
/**
 * 
 * getData().then(data=>{
 *   do someThing
 * })
 * 
 */
export default {
    data() {
        return {
            utilizationPie: 0, //饼状图 利用率 amx 100
            vacancyRatePie: 0, //饼状图  空置率 100
            thVelocityObj: { //30天周转率数据
                data: [], //数据
                xAxisData: [
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30"
                ], //x轴数据
                colors: ["#f33b65", "#bb6ea4"] //柱状图渐变色
            },
            mtVelocityObj: { //12个月周转率
                data: [],
                xAxisData: ["01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                ], //x轴数据
                colors: ["#f33b65", "#9592d1"] //柱状图渐变色
            },
            thChangeObj: { //最近30天变化曲线
                legend: ['利用率', '空置率'],
                blueData: [], //利用率数据
                redData: [], //空置率数据
                xAxisData: ["01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30"
                ]
            },
            mtChangeObj: { //最近12个月变化曲线
                legend: ['利用率', '空置率'],
                blueData: [], //利用率数据
                redData: [], //空置率数据
                xAxisData: ["01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                ]
            },
            vehicleDataObj: { //车辆驶入驶离数据
                legend: ['车辆驶入', '车辆驶离'],
                blueData: [], //驶入
                redData: [], //驶离
                xAxisData: [
                    "00",
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                ]
            },
            orderDataObjBar: [0, 0, 0], //最近三十天订单信息--横向柱状图
            orderDataObj: { //最近三十天订单数据
                barData: [],
                lineData: [],
                xAxisData: [ //x轴数据
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30"
                ]
            },
            todayOrderData: [1, 5, 6, 8], //今日订单数据 :"进行中", "欠费", "已缴费", "0元订单"
            //地图数据
            mapData: [{
                type: 'inducedParking',
                name: "诱导停车场",
                data: []
            }, {
                type: 'parkingLot',
                name: "停车场",
                data: []
            }, {
                type: "heatMap",
                name: "热力图数据",
                data: []
            }]
        }
    },
    mounted() {
        this.getAllChartsData()


    },
    methods: {
        getAllChartsData() {
            this.queryPlatformData()
            this.queryTodayChangeDataInfo()
            this.queryStatData()
            this.queryMapPoint()
        },
        //会员总数；30天活跃会员数；车辆总数；30天活跃车辆数
        queryPlatformData() {
            getData().then(data => {
                let _data = data.data.data;
                this.membersNum = _data.leaguerTotal
                this.activeMembersNum = _data.leaguerActiveTotal
                this.vehiclesNum = _data.plateTotal
                this.activeVehiclesNum = _data.plateActiveTotal
            }).catch()
        },
        queryTodayChangeDataInfo() {
            queryTodayChangeDataInfo(this.activeParkingLotType).then(data => {
                let _data = data.data.data;
                //今日订单总数
                this.todayOrderNum = _data.orderTotal;
                // 今日订单信息  "进行中", "欠费", "已缴费", "0元订单"
                this.todayOrderData = [_data.underway, _data.arrearage, _data.payFee, _data.zeroOrder]

                // 泊位监控下   利用率 空置率
                this.utilizationPie = _data.useRatio
                this.vacancyRatePie = _data.vacancyRatio
                    // 右侧 周转率
                this.velocity = _data.turnoverRatio
                    // 顶部  停车数
                this.vehicles = _data.parkTotal
                    //  顶部 泊位总数
                this.berth = _data.spaceTotal

                //每小时 驶入  驶离 
                this.vehicleDataObj.blueData = _data.driveInOrderStatOneDayList
                this.vehicleDataObj.redData = _data.driveOutOrderStatOneDayList
                    //x轴 数据不变 24小时
                    //this.vehicleDataObj.xAxisData = []



            }).catch()
        },
        queryStatData() {
            queryStatData(this.activeParkingLotType).then(data => {
                let _data = data.data.data;
                //30天 周转率
                this.thVelocityObj.data = _data.turnoverRatio_30Days
                    //12个月周转率
                this.mtVelocityObj.data = _data.turnoverRatio_12Months

                //最近三十天变化曲线 
                this.thChangeObj.blueData = _data.useRatio_30Days
                this.thChangeObj.redData = _data.vacancyRatio_30Days
                    //最近12个月变化曲线
                this.thChangeObj.blueData = _data.useRatio_12Months
                this.thChangeObj.redData = _data.vacancyRatio_12Months

                //近30天订单信息
                this.orderDataObjBar = [_data.zeroOrder, _data.payFee, _data.arrearage]

            }).catch()
        },
        queryMapPoint(youdao = true) {
            queryMapPoint().then(data => {
                let _data = data.data.data;
                //停车场基本数据格式
                // {
                //     parkignName: "B停车场",
                //     berthNum: 111, 
                //     freeBerth: 110,
                //     lonlat: [119.55, 35.43]
                // },

                //热力图数据 
                // { "lng": "119.3", "lat": "35.439282", "count": "当前停车场 停车数" }
                let inducedParking = _data.filter(v => {
                    return v.pointType === 'induce'
                }).map(v => {
                    return {
                        parkignName: "停车场",
                        berthNum: '0',
                        freeBerth: '0',
                        lonlat: [v.posLong, v.posLat],
                        pointId: v.pointId
                    }
                })

                let parkingLot = _data.filter(v => {
                    return v.pointType === 'park'
                }).map(v => {
                    return {
                        parkignName: "停车场",
                        berthNum: '0',
                        freeBerth: '0',
                        lonlat: [v.posLong, v.posLat],
                        pointId: v.pointId
                    }
                })
                this.mapData = [{
                    type: 'inducedParking',
                    name: "诱导停车场",
                    data: inducedParking
                }, {
                    type: 'parkingLot',
                    name: "停车场",
                    data: parkingLot
                }, {
                    type: "heatMap",
                    name: "热力图数据",
                    data: []
                }]


            }).catch()
        }
    }
}