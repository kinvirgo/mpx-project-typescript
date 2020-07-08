import mpx, { createComponent, Mpx } from "@mpxjs/core";

createComponent({
    properties : {
        // 是否全屏
        fullScreen: {
            type: Boolean,
            value: false
        },
        // 定位层级
        zIndex: {
            type: Number,
            value: 1000
        },
        // 描述
        description: {
            type: String || null,
            value: '加载中'
        },
        // isDescription : {
        //     type: Boolean,
        //     value: true
        // },
        // 偏移
        offset: {
            type: String,
            value: 0
        }
    },
    data : {
        isDescription : true
    },
    lifetimes : {
        created(){
            this.isDescription = !!this.description
        }
    }
})