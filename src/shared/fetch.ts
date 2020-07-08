import XFetch from "@mpxjs/fetch/src/xfetch";
import intercept from './intercept'
import {fetchEnum} from './mark'
import { Mpx } from '@mpxjs/core'

// 合并options
const megreOption = (url = '', data = {}, options = {}, method = 'get') => {
    return {
        [fetchEnum.__IS_LOADING__] : false,
        [fetchEnum.__IS_ORIGINAL__] : false,
        ...options,
        // 会覆盖options中的设置
        url,
        method,
        data: {
            reqId: `WX-SSC-${Date.now()}`,
            sign: "",
            token: "",
            data: data,
        },
    };
};
// 导出
export let install :InstanceType<typeof XFetch>;

const XFetchs = (options?:fetchOption, MPX?:Mpx) => {
    // 实例
    install = install || new XFetch(options, MPX);
    // 拦截处理
    if(!install.__is_intercept__){
        intercept(install);
    }

    return {
        $get(url:string, data = {}, option = {}) {
            let options = megreOption(url, data, option);
            return install.fetch(options);
        },
        $post(url:string, data = {}, option = {}) {
            let options = megreOption(url, data, option, 'post');
            return install.fetch(options);
        }
    };
};
// 挂在静态属性
let _ = XFetchs()
Object.keys(_).forEach(key => {
    (XFetchs as any)[key] = (_ as any)[key];
})

export const $GET = _.$get;
export const $POST = _.$post;

export default XFetchs;