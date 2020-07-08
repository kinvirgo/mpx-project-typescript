export const mixinTabbar = {
    onShow() {
        // 设置tabbar选中
        if (this.getTabBar && typeof this.getTabBar === "function") {
            this.getTabBar().active = this.active;
        }
    },
};
