import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
const state = {
  cartList: []
};
const mutations = {
  CARTLIST(state, cartList) {
    state.cartList = cartList;
  }
};
const actions = {
  //获取购物车列表
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("CARTLIST", result.data);
    }
  },
  //删除购物车列表的数据 没有返回数据，随便返回个ok就好
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //更新购物车列表的选中状态 没有返回数据，随便返回个ok就好
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  // 删除全部勾选产品
  deleteAllCheckedCart({ dispatch, getters }) {
    //context:小仓库，commit【提交mutations修改state】 getters【计算属性】dispatch【派发action】
    //获取购物车中全部的产品（是一个数组)
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch("deleteCartListBySkuId", item.skuId) : '';
      //把每次返回的promise添加到PromiseAll的数组中
      PromiseAll.push(promise);
    });
    //只要全部的p1|p2....都成功，返回结果即为成功
    //如果有一个失败,返回即为失败结果
    return Promise.all(PromiseAll);
  },
  // 修改全选状态
  updateAllCartIsChecked({ dispatch, getters }, isChecked) {
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
      let promise = dispatch("updateCheckedById", { skuId: item.skuId, isChecked });
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || [];
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};