interface TabbarMenu {
    pagePath: string;
    iconPath: string;
    selectedIconPath: string;
    text: string;
    navigator: string;
}

const tabbarMenu: Array<TabbarMenu> = [
    {
        pagePath: "/pages/home/index",
        iconPath: require("@/static/images/tabbar/icon-home.png"),
        selectedIconPath: require("@/static/images/tabbar/icon-active-home.png"),
        text: "首页",
        navigator: "switchTab",
    },
    {
        pagePath: "/pages/order/index",
        iconPath: require("@/static/images/tabbar/icon-order.png"),
        selectedIconPath: require("@/static/images/tabbar/icon-active-order.png"),
        text: "方案",
        navigator: "switchTab",
    },
    {
        pagePath: "/pages/feedback/index",
        iconPath: require("@/static/images/tabbar/icon-feedback.png"),
        selectedIconPath: require("@/static/images/tabbar/icon-active-feedback.png"),
        text: "反馈",
        navigator: "navigateTo",
    },
    {
        pagePath: "/pages/my/index",
        iconPath: require("@/static/images/tabbar/icon-my.png"),
        selectedIconPath: require("@/static/images/tabbar/icon-active-my.png"),
        text: "我的",
        navigator: "switchTab",
    },
];

export default tabbarMenu;
