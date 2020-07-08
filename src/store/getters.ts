import mpx from '@mpxjs/core'
export default {
    getLotteryCenterCode(){
        
    },
    // 获取登录信息
    getToken(){
        return mpx.getStorageSync('token')
    }
}