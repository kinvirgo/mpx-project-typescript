import defAvatar from "@/static/images/icon/icon-avatar.png";
import mpx, { createPage, Mpx } from "@mpxjs/core";
import { mixinTabbar } from "@/mixin/index";
import MyMenu, { MenuType} from "@/config/myMenu.config";

import { isAuth, authorize, AuthResult } from "@/shared/utils";
import { AuthSettingOption } from "@/enum";

type MPX_KEYS = keyof Mpx;
type MPX_FN = {
    (params: any): void;
};

createPage({
    mixins: [mixinTabbar],
    data: {
        active: 3,
        userInfo: {},
        defAvatar,
        menus: MyMenu,
    },
    onLoad() {
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
    getUserInfo: function (e: any) {
        if (e.detail.userInfo) {
            //成功获取到用户头像、昵称...
            this.userInfo = e.detail.userInfo;
        }
    },
    // 转发
    onShareAppMessage(data) {
        return {
            title: "测试转发",
            path: "/package-independent/pages/main",
        };
    },
    onPullDownRefresh() {
        // 下拉更新时间
        mpx.vibrateShort();
        mpx.showNavigationBarLoading();

        setTimeout(() => {
            mpx.stopPullDownRefresh();
            mpx.hideNavigationBarLoading();
        }, 5000);
    },
    // 菜单跳转
    menuJump(e: any) {
        const { url, navigator, type } = e.currentTarget.dataset;
        url &&
            mpx[navigator as MPX_KEYS] &&
            (mpx[navigator as MPX_KEYS] as MPX_FN)({ url });
        if(type === MenuType.SystemSet){
            mpx.openSetting({})
        }
    }
});
