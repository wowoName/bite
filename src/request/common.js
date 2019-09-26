import request from '@/utils/request'
/** 获取数据 */
export function getData(params) {
    return request.post('api/', {})
}
export function getData1() {
    return request.get('api/', {})
}