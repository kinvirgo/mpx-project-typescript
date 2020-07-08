import Toast from "@vant/weapp/dist/toast/toast";
import API from "@/shared/api";
import store from "@/store/index";
import mpx, { createPage } from "@mpxjs/core";
import { mixinTabbar } from "@/mixin/index";

createPage({
  mixins: [mixinTabbar],
  data: {
    active: 0,
    // bannerlist
    banners: [],
    navs: [
      {
        status: true,
        iconSrc: require("@/static/images/icon/icon-nav-location.png"),
        title: "附近彩柜",
        des: "丰巢柜打印彩票",
        class: ["border-right", "border-bottom"],
        tap: function () { },
      },
      {
        status: true,
        iconSrc: require("@/static/images/icon/icon-nav-scan.png"),
        title: "便捷兑奖",
        des: "扫一扫自助兑奖",
        class: ["border-bottom"],
        tap: function () { },
      },
      {
        status: true,
        iconSrc: require("@/static/images/icon/icon-nav-anno.png"),
        title: "开奖公告开奖公告",
        des: "2元赢千万大奖",
        class: ["border-right", "border-bottom"],
        tap: function () { },
      },
      {
        status: true,
        iconSrc: require("@/static/images/icon/icon-nav-buy.png"),
        title: "更多惊喜",
        des: "惊喜不断，等你来撩！",
        class: ["border-bottom"],
        tap: function () { },
      },
      {
        status: true,
        iconSrc: require("@/static/images/icon/icon-nav-explain.png"),
        title: "玩法说明",
        des: "中奖规则",
        class: ["border-right"],
        tap: function () { },
      },
      {
        status: true,
        iconSrc: require("@/static/images/icon/icon-nav-trend.png"),
        title: "走势图",
        des: "数据走势一网打尽",
        class: [],
        tap: function () { },
      },
    ],
  },
  computed: {
    ...store.mapState(["domain", "lotteryCenterCode", "platformCode"]),
  },
  onLoad(){
    this.getBanners(); 
  },
  getBanners() {
    const { lotteryCenterCode, platformCode } = this;
    this.$post(API.BANNER_LISTBANNERNEW, { lotteryCenterCode, platformCode })
      .then(({ data } : any) => {
        // this.$post(API.BANNER_LISTBANNERNEW, {lotteryCenterCode,pictureType:1}).then(({ data })=>{
        // console.log( data );
        this.banners = data;
      })
      .catch((err:any) => {
        console.log(err);
      });
  },
});
