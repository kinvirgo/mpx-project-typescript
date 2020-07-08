export interface MyMenu {
    type : MenuType
    url : string,
    title : string,
    imgSrc : string,
    navigator : string
}

export enum MenuType {
    Order,
    Record,
    Coupon,
    Promote,
    Help,
    Set,
    SystemSet
}

const myMenu : Array<MyMenu> = [
    {   
        type : MenuType.Order,
        url: "/pages/order/index",
        title: "我的方案",
        imgSrc: require("@/static/images/menu/icon-plan.svg"),
        navigator: 'switchTab'
    },
    {
        type : MenuType.Record,
        url: "",
        title: "兑奖记录",
        imgSrc: require("@/static/images/menu/icon-record.svg"),
        navigator: 'navigateTo'
    },
    {
        type : MenuType.Coupon,
        url: "",
        title: "我的兑换券",
        imgSrc: require("@/static/images/menu/icon-coupon.svg"),
        navigator: 'navigateTo'
    },
    {
        type : MenuType.Promote,
        url: "/pages/promote/index",
        title: "推广员专区",
        imgSrc: require("@/static/images/menu/icon-promote.svg"),
        navigator: 'navigateTo'
    },
    {
        type : MenuType.Help,
        url: "",
        title: "帮助中心",
        imgSrc: require("@/static/images/menu/icon-help.svg"),
        navigator: 'navigateTo'
    },
    {
        type : MenuType.Set,
        url: "/pages/set/index",
        title: "消息设置",
        imgSrc: require("@/static/images/menu/icon-set.svg"),
        navigator: 'navigateTo'
    },
    {
        type : MenuType.SystemSet,
        url: "",
        title: "授权设置",
        imgSrc: require("@/static/images/menu/icon-system-set.svg"),
        navigator: 'navigateTo'
    }
];

export default myMenu;
