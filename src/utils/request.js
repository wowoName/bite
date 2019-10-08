import axios from 'axios'
import qs from 'qs'
import { Message, Loading } from 'element-ui'
let axiosToken = null
axios.defaults.timeout = 3000;
axios.defaults.headers = {
    'Content-Type': 'application/json'
};
axios.interceptors.response.use(
    response => {
        //请求完成token置空
        axiosToken = null;
        return response;
    },
    error => {
        //请求完成token置空
        axiosToken = null;
        //提示信息
        return Promise.reject(error.response.data); // 返回接口返回的错误信息
    });

class HttpRequest {
    get(url, paramsData) {
        return new Promise((resolve, reject) => {
            axios.get(url, paramsData)
                .then(function(res) {
                    if (res.data.code == '1') {
                        Message({
                            showClose: true,
                            type: 'success',
                            message: '失败了'
                        })
                        reject('失败')
                    } else
                        resolve(res)
                })
                .catch(function(err) {
                    //console.log("请求失败！ " + err)
                    reject('error');
                })
        })
    };
    // post请求
    post(url, paramsData) {
        return new Promise((resolve, reject) => {

            // const loading = Loading.service({
            //     lock: true,
            //     text: '数据加载中...',
            //     spinner: 'el-icon-loading',
            //     background: 'rgba(0, 0, 0, 0.7)'
            // });

            axios.post(url, qs.stringify(paramsData), {
                    //终止请求
                    cancelToken: new axios.CancelToken(function executor(c) {
                        axiosToken = c;
                    })
                })
                .then((res) => {
                    // loading.close();
                    if (res.data.code == '1') {
                        // Message({
                        //     showClose: true,
                        //     type: 'success',
                        //     message: '失败了'
                        // })
                        reject('失败')
                    } else
                        resolve(res)
                })
                .catch((err) => {
                    reject('失败');
                })
        })
    };
    //终止请求
    doCancelToken(msg = "异常") {
        if (axiosToken) axiosToken(msg);
    }
}
export default new HttpRequest()