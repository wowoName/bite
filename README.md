# wisdom-parking

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


src
├─ App.vue
├─ assets
│  ├─ data
│  │  ├─ donggang.json    东港区边界数据
│  │  └─ rizhaoMap.json   鹰眼处日照地图数据
│  ├─ img-------------------------------图片
│  │  ├─ bg-bluish.png
│  │  └─ 黄色.gif
│  ├─ js
│  │  └─ pxToRem.js   px转rem
│  └─ logo.png
├─ components-----------------------------所有组件
│  ├─ BMap.vue         中心地图    
│  ├─ BarCharts.vue    近三十天周转率、近十二个月周转率
│  ├─ LineCharts.vue   24小时停车流量监控、近30天变化曲线、近12个月变化曲线
│  ├─ MapCharts.vue    地图鹰眼
│  ├─ OrderBarCharts.vue  近30天停车信息
│  ├─ OrderTransBarCharts.vue   今日停车信息 最后一个象形图（横向柱状图）
│  ├─ PieCharts-01.vue
│  ├─ PieCharts.vue            泊位监控饼状图
│  ├─ TransBarCharts.vue   今日停车信息
│  └─ WisdomTitle.vue      ecahrts 标题组件
├─ main.js--------------------------------项目入口
├─ mixin
│  ├─ chartsDatas.js           //这里是对应得ecahrts 数据
│  └─ chartsResize.js
├─ request---------------------------------ajax 
│  └─ common.js                //这是存放接口得地方
├─ router.js-------------------------------路由配置
├─ store.js--------------------------------状态管理
├─ utils-----------------------------------axios 配置
│  └─ request.js                //axios  （代理配置在项目根目录  vue.config.js）
└─ views----------------------------------首页（home）
   └─ Home.vue                 //这里是主页以及其他数据存放地方



数据说明：
Home.vue：

   sysTime: "", //系统时间
   vehicles: 0, //车辆数量
   berth: 0, //泊位数量
   membersNum: 0, //会员总数
   activeMembersNum: 0, //30天会员活跃数
   vehiclesNum: 0, //车辆总数
   activeVehiclesNum: 0, //30天车辆活跃数
   todayOrderNum: 0, //今日停车数
   velocity: 0, //周转率

mixin-cahrtsDatas：

  utilizationPie  泊位监控--利用率
  vacancyRatePie  泊位监控--空置率
  thVelocityObj   近三十天周转率
  mtVelocityObj   近十二个月周转率
  thChangeObj     近30天变化曲线
  mtChangeObj     近12个月变化曲线
  vehicleDataObj  24小时停车流量监控
  orderDataObjBar 今日停车信息 象形图（横向柱状图）
  orderDataObj    近30天停车信息
  todayOrderData  今日停车信息 柱状图（第一个横向柱状图）
  mapData         地图数据





