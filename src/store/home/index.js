import { reqCategoryList, reqBannerList, reqFloorList } from "@/api/index"
//home的仓库
const state = {
  //默认初始值的类型与服务器返回的类型一致
  categoryList: [],
  bannerList: [],
  floorlist: []
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList.slice(0, 16);
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  FLOORLIST(state, floorlist) {
    state.floorlist = floorlist;
  }
};
const actions = {
  //通过api里的接口调用函数，向服务器发送请求
  async getCategoryList({ commit }) {
    let result = await reqCategoryList();
    //console.log(result);
    if (result.code == 200) {
      commit("CATEGORYLIST", result.data)
    }
  },

  async getBannerList({ commit }) {
    let result = await reqBannerList();
    if (result.code == 200) {
      commit("BANNERLIST", result.data)
    }
  },

  async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code == 200) {
      commit("FLOORLIST", result.data)
    }
  }


};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}