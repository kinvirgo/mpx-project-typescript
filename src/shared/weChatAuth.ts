import mpx from "@mpxjs/core";
import { AuthSettingOption } from "@/enum";

export interface AuthResult {
    readonly status: boolean,
    readonly msg: string
}

// 查询是否授权
export const isAuth = (auth: AuthSettingOption) => {
    return new Promise((resolve, reject) => {
        mpx.getSetting({})
            .then((res: WechatMiniprogram.OpenSettingSuccessCallbackResult) => {
                if (res.errMsg === "getSetting:ok") {
                    if(res.authSetting[auth]){
                        resolve({ status : true, msg : '已授权' });
                    }else{
                        resolve({ status : false, msg : '未授权' });
                    }
                } else {
                    resolve({status: false, msg : '未授权'});
                }
            })
            .catch((err: any) => {
                // 查询异常
                reject({status: false, msg : 'API调用失败'});
            });
    });
};
// 授权
export const authorize = (auth: AuthSettingOption) => {
    return new Promise((resolve, reject) => {
        mpx.getSetting({
            success: function ({ errMsg, authSetting }) {
                if (errMsg === "getSetting:ok" && authSetting[auth]) {
                    // 已经授权过
                    resolve({ status: true, msg: "已经授权过" })
                } else {
                    if(auth === AuthSettingOption.USERINFO){
                        // authorize 不再支持userinfo的授权
                        return resolve({ status: false, msg: "authorize:fail 系统错误，错误码：-12007,scope unauthorized" })
                    }
                    // 未曾授权过
                    mpx.authorize({
                        scope: auth,
                        success() {
                            // 授权成功
                            resolve({ status: true, msg: "授权成功" });
                        },
                        fail() {
                            // 拒绝授权
                            resolve({ status: false, msg: "拒绝授权" })
                        }
                    })
                }
            },
            fail() {
                // 授权异常
                reject({ status: false, msg: "授权异常" })
            }
        });
    })
};