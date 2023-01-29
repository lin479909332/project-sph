import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo,reqLogout } from "@/api";
import { setToken,getToken,removeToken } from "@/utils/token";
const state = {
  code: "",
  token: getToken(),
  userInfo:{}
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state,userInfo){
    state.userInfo = userInfo;
  },
  //退出登录的操作，token置空并移除token | 用户信息置空
  CLEAR(state){
    state.token = '';
    state.userInfo = {};
    removeToken();
  }
};
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    //获取验证码的这个接口:把验证码返回，但是正常情况，后台把验证码发到用户手机上
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //用户登录，主要是拿token 根据token获取用户信息
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    if (result.code == 200) {
      commit("USERLOGIN", result.data.token)
      //由于vuex保存的数据只是临时的 所以这里要持久化存储token
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //获取用户登录信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }

  },
  //退出登录
  async userLogout({commit}){
    let result = await reqLogout();
    if(result.code == 200){
      commit("CLEAR");
      return "ok"
    }else{
      return Promise.reject(new Error("fail"));
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