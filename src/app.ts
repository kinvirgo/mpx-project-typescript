import mpx, { createApp } from "@mpxjs/core";
import apiProxy from "@mpxjs/api-proxy";

mpx.use(apiProxy, { usePromise: true });
import { AuthSettingOption } from '@/enum'
import { authorize, AuthResult } from '@/shared/utils'

import XFetch from "@/plugins/fetch";
mpx.use(XFetch);

// 引入扩展
import "@/shared/expand"

// app.js
createApp({
    onLaunch() {
        authorize(AuthSettingOption.USER_LOCATION)
            .then((res: AuthResult)=>{
                if(res.status){
                    mpx.getLocation({type: 'wgs84',success(result:WechatMiniprogram.GetLocationSuccessCallbackResult){
                        console.log(result);
                    }})
                }else{
                    console.log('拒绝授权处理逻辑...');
                }
            })
            .catch(err=>{
                console.log( 'authorize=',err );
            })
    },
});
