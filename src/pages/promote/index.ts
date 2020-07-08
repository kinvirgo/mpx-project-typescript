import defAvatar from "@/static/images/icon/icon-avatar.png";
import mpx, { createPage, Mpx } from "@mpxjs/core";
import store from '@/store/index'
import API from "@/shared/api";
import { FetchResult } from "@/plugins/fetch";

import { isAuth, authorize, AuthResult } from "@/shared/utils";
import { AuthSettingOption } from "@/enum";

createPage({
    data:{
        defAvatar,
        userInfo : {},
        promoterInfo : {}, // 推广员信息
        navs : [{
            icon : require('@/static/images/icon/icon-promote-img.png'),
            title : "生成推广图",
            class : ['border-right','border-bottom'],
            click : ()=>{}
        },{
            icon : require('@/static/images/icon/icon-promote-bindUser.png'),
            title : "绑定列表",
            class : ['border-bottom'],
            url : "/pages/promote/bind-user/index",
            click : ()=>{
                mpx.navigateTo({url:"/pages/promote/bind-user/index"})
            }
        },{
            icon : require('@/static/images/icon/icon-promote-bonus.png'),
            title : "我的奖金",
            class : ['border-right'],
            click : ()=>{}
        },{
            icon : require('@/static/images/icon/icon-promote-stayTuned.png'),
            title : "敬请期待",
            class : [],
            click : ()=>{}
        }]
    },
    computed:{
        ...store.mapState(['buyerId']),
        channelEndTime(){
            const { promoterInfo } = this
            return promoterInfo.channelEndTime ? new Date(promoterInfo.channelEndTime).format("yyyy-MM-dd") : ''
        },
        countBindUser(){
            const { promoterInfo } = this;
            return promoterInfo.countBindUser || 0
        },
        // 是否有效
        isValid(){
            const { promoterInfo } = this
            return !!promoterInfo.valid
        },
    },
    onLoad(){
        this.init()
    },
    init(){
        this.getUserInfo()
        this.getPromoterInfo()
    },
    getUserInfo(){
        const _this = this;
        isAuth(AuthSettingOption.USERINFO).then((res: AuthResult) => {
            res.status &&
                mpx.getUserInfo({
                    success({ errMsg, userInfo }) {
                        _this.userInfo = userInfo;
                    },
                });
        });
    },
    getPromoterInfo(){
        const { buyerId } = this;
        this.$post(API.BUYER_INFO_PROMOTION,{buyerId})
            .then((res:FetchResult)=>{
                const { code, data, msg } = res;
                if(code === "000"){
                    this.promoterInfo = data || {};
                }
            })
            .catch((err:any)=>{

            })
    },
    handleTo(e:any){
        const { url  } = e.currentTarget.dataset;
        url && mpx.navigateTo({url});
    }
})