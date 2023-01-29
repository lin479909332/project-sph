import { reqGoodsInfo, reqSuperSaleAttrList, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from "@/utils/uuid_token"
const state = {
  goodsInfo: {},
  superSaleAttrList: [],
  //游客的临时身份
  uuid_token: getUUID(),
};
const mutations = {
  //获取商品详情信息
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo;
  },
  //数据缺失 自己mock的数据
  SUPERSALEATTRLIST(state, superSaleAttrList) {
    state.superSaleAttrList = superSaleAttrList;
  }
};
const actions = {
  //获取商品详情信息
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit("GETGOODSINFO", result.data);
    }
  },
  //数据缺失 自己mock的数据
  async getSuperSaleAttrList({ commit }) {
    let result = await reqSuperSaleAttrList();
    if (result.code == 200) {
      commit("SUPERSALEATTRLIST", result.data);
    }
  },
  //添加或更新购物车，只需要返回成功和失败的提示
  //加入购物车返回的解构
  //加入购物车以后（发请求），前台将参数带给服务器
  //服务器写入数据成功，.并没有返回其他的数据，只是返回code=200，代表这次操作成功//因为服务器没有返回其余数据,因此咱们不需要三连环存储数据
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code == 200) {
      //成功
      return "ok";
    } else {
      //失败
      return Promise.reject(new Error("fail"));
    }
  }
};
const getters = {
  categoryView(state) {
    return state.goodsInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {};
  },
  skuSaleAttrValueList(state) {
    return state.goodsInfo.skuSaleAttrValueList || [];
  },
  superSaleAttrList(state) {
    return state.superSaleAttrList || [];
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}