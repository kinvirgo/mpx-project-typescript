import store from "../store";

interface Cache {
  [key: string]: string;
}

interface Api {
  [key: string]: string;
}

const domain = store.state.domain || "";

export const api: Api = {
  // 获取最新banner
  BANNER_LISTBANNERNEW: "/lcop/banner/listBannerNew",
  // 获取设置信息
  BUYER_MESSAGE_CONFIG_QUERY: "/lcop/buyer/message/config/query",
  // 更新设置
  BUYER_MESSAGE_CONFIG_UPDATE: "/lcop/buyer/message/config/update",
  // 查询推广员信息
  BUYER_INFO_PROMOTION: "/lcop/buyer/info/promotion",
  // 查询绑定的用户
  BUYER_LIST_BIND_USER: "/lcop/buyer/list/bind/user",
};

const joinApi = function () {
  let cache: Cache = {};
  Reflect.ownKeys(api).forEach((key: string) => {
    cache[key] = `${domain}${api[key]}`;
  });
  return cache;
};

export default joinApi();
