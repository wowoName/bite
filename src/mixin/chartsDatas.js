export default {
    data() {
        return {
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
                    "30",
                    "31"
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
                    "30",
                    "31"
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
            orderDataObj: {
                barData: [],
                lineData: [],
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
                    "30",
                    "31"
                ]
            }

        }
    },
    mounted() {
        //获取30天周转率数据
        this.getThVelocityObj()
            //12个月周转率数据
        this.getMtVelocityObj()
            //最近30天变化曲线
        this.getMtChangeObj()
            //最近12个月变化曲线
        this.getThChangeObj()
            //驶入驶离数据
        this.getVehicleData()
            //最近30天订单信息
        this.getOrderDataObj()
    },
    methods: {
        getRandomNum(count) {
            let _data = [];
            for (let i = 0; i < count; i++) {
                _data.push(Math.floor(Math.random() * (600 - 0) + 0))
            }
            return _data;
        },
        //获取30天周转率数据
        getThVelocityObj() {
            this.thVelocityObj.data = this.getRandomNum(30);
        },
        //获取12个月周转率数据
        getMtVelocityObj() {
            this.mtVelocityObj.data = this.getRandomNum(12);
        },
        //获取30天周转率数据
        getThChangeObj() {
            this.thChangeObj.blueData = this.getRandomNum(30);
            this.thChangeObj.redData = this.getRandomNum(30);

        },
        //获取12个月周转率数据
        getMtChangeObj() {
            this.mtChangeObj.blueData = this.getRandomNum(30);
            this.mtChangeObj.redData = this.getRandomNum(30);
        },
        //驶入驶离数据
        getVehicleData() {
            this.vehicleDataObj.blueData = this.getRandomNum(26);
            this.vehicleDataObj.redData = this.getRandomNum(26);
        },
        getOrderDataObj() {
            this.orderDataObj.lineData = this.getRandomNum(31);
            this.orderDataObj.barData = this.getRandomNum(31);
        },
    }
}