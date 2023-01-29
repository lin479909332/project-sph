//配置路由
import Vue from "vue";
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);

import routes from "@/router/routes"
//引入store
import store from "@/store"

//重写push | replace
//第一个参数:告诉原来push方法，你往哪里跳转（传递哪些参数)//第二个参数:成功回调
//第三个参数:失败的回调
// call | apply区别
//相同点，都可以调用函数一次，都可以篡改函数的上下文一次
//不痛点: call与apply传递参数: call传递参数用逗号隔开，apply方法执行，传递数组

//保存一份原版的
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

//对外暴露vueRouter实例
let router = new VueRouter({
  //配置路由
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
});
export default router;

router.beforeEach(async (to, from, next) => {
  // to:可以获取到你要跳转到那个路由信息
  // from:可以获取到你从哪个路由而来的信息
  // next:放行函数next()放行next(path)放行到指令路由    
  //next(false)取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，
  //那么 URL 地址会重置到 from 路由对应的地址;
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;

  //存在token证明用户已经登录
  if (token) {
    //用户如果已经登录，还想去login或register【让用户停留在首页】
    if (to.path == '/login' || to.path == '/register') {
      next('/home')
    } else {
      //用户已经登录，去的是除了login以外的组件
      //存在用户名时放行
      if (name) {
        next();
      } else {
        //没有用户信息，派发action让仓库存储用户信息再跳转
        try {
          //获取用户信息成功
          await store.dispatch("getUserInfo");
          //放行
          next();
        } catch (error) {
          //token失效了 获取不到用户信息，需要清除token并重新登录
          await store.dispatch("userLogout");
          next('/login')
        }
      }
    }
    //用户未登录
  } else {
    //未登录时不能去 交易 支付 个人中心页，全跳转到登录页
    let toPath = to.path;
    //判断toPath里是否包含tarde pay center
    if (toPath.indexOf("/tarde") != -1 || toPath.indexOf("/pay") != -1 || toPath.indexOf("/center") != -1) {
      //把未登录的时候向去而没有去成的信息，存储于地址栏中【路邮】
      next("/login?redirect="+toPath)
    } else {
      next();
    }
  }
})