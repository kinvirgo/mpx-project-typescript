import { defReadOnly } from "../shared/utils";
import XFetch from "../shared/fetch";
import { Mpx } from '@mpxjs/core'

export interface FetchResult {
    code?: string,
    data?: any,
    msg?: string
}

export default function install(proxyMPX:any, options: fetchOption, MPX : Mpx) {
    if (proxyMPX.__ob__) return;
    let XFetchs = XFetch(options, MPX);
    // 挂载在实例上
    Object.keys(XFetchs).forEach((key) => {
        // 映射至XFetchs
        Object.defineProperty(proxyMPX.prototype, key, {
            get() {
                return (XFetchs as any)[key];
            },
        });
    });
    defReadOnly(proxyMPX.prototype, "__ob__", true);
}
