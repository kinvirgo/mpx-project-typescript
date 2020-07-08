import mpx from '@mpxjs/core'
import { defReadOnly } from "./utils";
import Toast from "@vant/weapp/dist/toast/toast";
import { fetchEnum } from "./mark";
import XFetch from "@mpxjs/fetch/src/xfetch";
export default (install:InstanceType<typeof XFetch>) => {
    // 添加表示
    defReadOnly(install, "__is_intercept__", true);
    // 请求拦截
    install.interceptors.request.use(
        function (config:any) {
            // 加载处理
            config[fetchEnum.__IS_LOADING__] &&
                Toast.loading({
                    mask: true,
                    message: "加载中...",
                    duration: 0,
                    selector : "#van-toast__fetch"
                });
            return config;
        },
        function (err:any) {
            // vant-#2855
            mpx.nextTick(()=>{
                Toast.clear()
            })
            // 或者使用setTimeout
            // Toast("访问无法到达 ^_^ ！");
            return Promise.reject(err);
        }
    );
    // 响应拦截
    install.interceptors.response.use(
        function (res:any) {
            const { requestConfig: config } = res;
            // 取消加载处理
            config[fetchEnum.__IS_LOADING__] && mpx.nextTick(()=>{Toast.clear()})
            // 也可以返回promise
            return res[fetchEnum.__IS_LOADING__] ? res : res.data;
        },
        function (err:any) {
            // vant-#2855
            mpx.nextTick(()=>{
                Toast.clear()
            })
            // 或者使用setTimeout
            return Promise.reject(err);
        }
    );
};
