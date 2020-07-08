import mpx, { createPage, Mpx } from "@mpxjs/core";
import store from '@/store/index'
import API from "@/shared/api";
import { FetchResult } from "@/plugins/fetch";

interface BindUser {
    nickname : string,
    bindTime : number,
    time ? : string
}


createPage({
    data : {
        isInit : true,
        userList : null
    },
    computed:{
        ...store.mapState(['buyerId']),
    },
    onLoad(){
        this.init()
    },
    init(){
        this.getBindUser()
    },
    getBindUser(){
        const { buyerId } = this;
        this.$post(API.BUYER_LIST_BIND_USER,{ buyerId })
            .then((res:FetchResult)=>{
                this.isInit = false;
                const { code, data, msg } = res;
                if(code === "000"){
                    this.userList = <Array<BindUser>>data.map((item:BindUser)=>{
                        item.time = item.bindTime ? new Date(item.bindTime).format("yyyy-MM-dd") : '— —'
                        return item
                    }) || []
                }
            })
            .catch((err:any)=>{
                this.isInit = false;
            })
    }
})