import request from '@/utils/request'
/** 获取数据 */
export function getData() {
    return request.post('/api/api/v2/bigScreen/queryPlatformData', {})
}
//查询今日相关数据
export function queryTodayChangeDataInfo(param) {
    return request.post('/api/api/v2/bigScreen/queryTodayChangeDataInfo?parkLabel=' + param, {})
}

//查询页面统计类相关数据
export function queryStatData(param) {
    return request.post('/api/api/v2/bigScreen/queryStatData?parkLabel=' + param, {})
}

//查询页面统计类相关数据
export function queryMapPoint(param) {
    return request.post('/api/api/v2/bigScreen/queryMapPoint?parkLabel=' + param, {})
}

/** 
 * 获取地图坐标点的具体数据
 * 调用位置  components/BMap
 */
export function queryMapPointData(param) {
    return request.post('/api/api/v2/bigScreen/queryMapPointData?pointId=' + param, {})
}
/**
 *  获取区域数据
 * @param {*} param 
 */
export function queryMapPolygonData(param) {
    return request.post('/api/api/v2/bigScreen/queryMapPointData?pointId=' + param, {})
}


/** 
 * 获取统计图横坐标
 */
export function getStatDateList() {
    return request.post('/api/api/v2/bigScreen/getStatDateList', {})
}