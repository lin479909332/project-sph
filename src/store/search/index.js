import { reqSearchList } from "@/api/index";
//search的仓库
const state = {
  searchList: {},
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  }
};
const actions = {
  //穿个默认参数 保证是一个空对象
  async getSearchList({ commit }, params = {}) {
    let result = await reqSearchList(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  }
};
const getters = {
  //提前在这里简化属性 方便pages页面获取
  //为了避免网络慢或者无网络导致数组无法遍历 所以这里要穿个空数组
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}