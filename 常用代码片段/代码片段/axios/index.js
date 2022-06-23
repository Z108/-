import { showLoading , hideLoading } from './loading'
import axios from "axios";
import {Message} from "element-ui";
import qs from 'qs'; //引入qs
/** **** 创建axios实例 ******/
// const service = axios.create({
//     baseURL: 'http://192.168.50.109:9011/', //将请求路径相同的前缀统一提取到baseURL属性内
//     timeout: 10000, //请求超时时间
//     responseType: 'json',
//     headers: {
//         "Content-Type": "application/json;"
//     }
// })
axios.defaults.baseURL="/Api"
axios.defaults.headers.post['Content-Type'] = 'application/json';
/** **** request拦截器==>对请求参数做处理 ******/
axios.interceptors.request.use(config => {
    showLoading()
    for (const key in config.data) {
        if (config.data[key] === 'all') {
            delete config.data[key]
        }
    }
    // 判断当前请求参数类型 如果是formdata类型 直接返回 如果不是需要qs转换数据格式
    config.data = (config.data instanceof FormData) ? config.data : config.data
    return config;
}, error => { //请求错误处理
    return Promise.reject(error)
})

/****** respone拦截器==>对响应做处理 ******/

axios.interceptors.response.use(res => {
    hideLoading()
        //当请求成功时 只需要返回请求成功的data数据  response.data 如果报错 返回整个响应结果对象
        if(res.data.code === '1'){
            router.push({path:'/login'})
            window.location.reload();
            Message.error('登录超时，请重新登录')
        }
        return res.status === 200 ? res.data : res;
    },
    err => { //响应错误处理
        if(err.response){
            const status_code = err.response.status;
            if(status_code === 401){
                // window.location.href = gourl
                router.push({path:'/login'});
                return false;
            }else if(status_code === 302){
                router.push({path:'/login'});
                Message.error('登录超时，请重新登录')
                localStorage.setItem('isLogin' , false)
                return false;
            }else{
                Message.error('服务器异常，请稍后重试!');
            }
        }else {
            Message.error('服务器异常，请稍后重试!');
        }
        return Promise.reject(error)
    }
);
axios.defaults.withCredentials = false;
export default axios;