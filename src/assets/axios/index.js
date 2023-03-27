import axios from 'axios';
import $router from '@/router'
import { objectEqual } from '@/assets/js/util';
import { ElLoading, ElMessage } from 'element-plus';

window.cache_map = new Map();

/**
 *
 * @param {*} method 方法
 * @param {*} url 地址
 * @param {*} params 参数
 * @param {*} options 配置
 * @param {*} options.no_loading 不需要loading
 * @param {*} options.is_cache 是否缓存
 * @returns 请求实例
 */
const baseAPI = (method, url, params, options) => {
    const instance = axios.create({
        // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
        // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
        baseURL: import.meta.env.VITE_BASE_API,

        // `method` 是创建请求时使用的方法
        method: method || 'get', // default

        // `data` 是作为请求主体被发送的数据
        // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
        data: params,

        // `headers` 是即将被发送的自定义请求头
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            token: localStorage.getItem('token'),
            ...options?.headers
        },

        // `params` 是即将与请求一起发送的 URL 参数
        // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
        params: method === 'get' ? params : {},

        // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
        // 如果请求话费了超过 `timeout` 的时间，请求将被中断
        timeout: options?.timeout || 3000000,

        // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
        responseType: options?.responseType || 'json', // default

        // `responseEncoding` indicates encoding to use for decoding responses
        // Note: Ignored for `responseType` of 'stream' or client-side requests
        responseEncoding: 'utf8' // default
    });

    // 请求拦截器
    instance.interceptors.request.use(config => {
        // 如果不需要loading
        if (options?.no_loading) {
            return config;
        }

        window.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.4)'
        })

        return config;
    }, error => Promise.reject(error));

    // 响应拦截器
    instance.interceptors.response.use(response => {
        window?.loading?.close()

        // 请求错误
        if (response?.data?.code === 0) {
            ElMessage({
                message: response?.data?.msg,
                type: 'error'
            })

            return Promise.reject();
        }

        // 未登录
        if (response?.data?.code === 401) {
            console.error('code401')

            $router.push('/login')
            return Promise.reject();
        }

        // 如果需要缓存
        if (options?.is_cache) {
            window.cache_map.set(url, { params, data: response.data });
        }

        return Promise.resolve(response.data);

    }, error => {
        window?.loading?.close()

        // 未登录
        if (error?.response?.status === 401) {
            console.error('网络401')

            $router.push('/login')
            return Promise.reject();
        }

        Promise.reject(error)
    })

    // 调用
    return instance({ url, data: params })
};

export const GET = (url, params, options) => {
    // 接口要缓存数据 && 有缓存数据
    if (options?.is_cache && window.cache_map.has(url)) {
        let cache_data = window.cache_map.get(url);
        return objectEqual(cache_data.params, params) ? Promise.resolve(cache_data.data) : baseAPI('get', url, params, options);
    }

    return baseAPI('get', url, params, options);
};

export const POST = (url, params, options) => {
    return baseAPI('post', url, params, options);
};

export const PUT = (url, params, options) => {
    return baseAPI('put', url, params, options);
};

export const DELETE = (url, params, options) => {
    return baseAPI('delete', url, params, options);
};