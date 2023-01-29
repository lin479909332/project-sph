//引入路由组件【非路由懒加载写法】
/*
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder";
*/

/*
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
*/

export default [
  //meta show属性用于是否显示footer组件
  {
    path: "/home",
    //路由懒加载
    component: ()=>import('@/pages/Home'),
    meta: { show: true },
  },
  {
    path: "/search/:keyword?",
    component: ()=>import('@/pages/Search'),
    meta: { show: true },
    name: "search",
    //路由组件传递props参数
    //1、布尔值【仅能传递params参数】
    //props:true,
    //2、对象【自己额外规定的参数】
    //props:{a:"aaaaa",b:"bbbbb"}
    //3、函数
    // props: ($route) => {
    //   return {
    //     keyword: $route.params.keyword,
    //     k: $route.query.k
    //   }
    // },
    //4、3的简写法
    //props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k }),
  },
  {
    path: "/login",
    component: ()=>import('@/pages/Login'),
    meta: { show: false },
  },
  {
    path: "/register",
    component: ()=>import('@/pages/Register'),
    meta: { show: false },
  },
  {
    path: "/detail/:skuid",
    component: ()=>import('@/pages/Detail'),
    meta: { show: true },
  },
  {
    path: "/addcartsuccess",
    component: ()=>import('@/pages/AddCartSuccess'),
    name: "addcartsuccess",
    meta: { show: true },
  },
  {
    path: "/shopcart",
    component: ()=>import('@/pages/ShopCart'),
    meta: { show: true },
  },
  {
    path: "/trade",
    component: ()=>import('@/pages/Trade'),
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      //要去交易页必须是从购物车页过来的
      if (from.path == "/shopcart") {
        next();
      } else {
        //next(false）:中断当前的导航。如果浏览器的URL改变了(可能是用户手动或者浏览器后退按钮),
        //那么URL地址会重置到 from路由对应的地址。
        next(false);
      }
    },
  },
  {
    path: "/pay",
    component: ()=>import('@/pages/Pay'),
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      //要去支付页必须是从交易页过来的
      if (from.path == "/trade") {
        next();
      } else {
        //next(false）:中断当前的导航。如果浏览器的URL改变了(可能是用户手动或者浏览器后退按钮),
        //那么URL地址会重置到 from路由对应的地址。
        next(false);
      }
    },
  },
  {
    path: "/paysuccess",
    component: ()=>import('@/pages/PaySuccess'),
    meta: { show: true },
  },
  {
    path: "/center",
    component: ()=>import('@/pages/Center'),
    meta: { show: true },
    children: [
      {
        path: "myorder",
        component: ()=>import('@/pages/Center/MyOrder'),
      },
      {
        path: "groupOrder",
        component: ()=>import('@/pages/Center/GroupOrder'),
      },
      {
        path: "/center",
        redirect: "/center/myorder"
      }
    ]
  },
  {
    path: "*",
    redirect: "/home"
  }
]