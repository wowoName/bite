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
│  │  ├─ donggang.json
│  │  ├─ mapData.js
│  │  └─ rizhaoMap.json
│  ├─ img
│  │  ├─ bg-bluish.png
│  │  └─ 黄色.gif
│  ├─ js
│  │  └─ pxToRem.js
│  └─ logo.png
├─ components
│  ├─ BMap.vue            
│  ├─ BarCharts.vue
│  ├─ LineCharts.vue
│  ├─ MapCharts.vue
│  ├─ OrderBarCharts.vue
│  ├─ OrderTransBarCharts.vue
│  ├─ PieCharts-01.vue
│  ├─ PieCharts.vue
│  ├─ TransBarCharts.vue
│  └─ WisdomTitle.vue
├─ main.js
├─ mixin
│  ├─ chartsDatas.js           //这里是对应得ecahrts 数据
│  └─ chartsResize.js
├─ request
│  └─ common.js                //这是存放接口得地方
├─ router.js
├─ store.js
├─ utils
│  └─ request.js                //axios  （代理配置在项目根目录  vue.config.js）
└─ views
   ├─ Home - 副本.vue
   ├─ Home.vue                 //这里是主页以及其他数据存放地方
   └─ Slider.vue




