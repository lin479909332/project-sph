import requests from "./request";
import mockRequests from "./mockRequest"

//发送axios请求 返回Promise对象
//三级列表数据
export const reqCategoryList = () => requests({ url: "/product/getBaseCategoryList", method: "get" });

//发送mockRequests请求 返回d对应好的模拟数据
//首页轮播图数据【mock数据】
export const reqBannerList = () => mockRequests({ url: "/banner", method: "get" });

//楼层数据【mock数据】
export const reqFloorList = () => mockRequests({ url: "/floor", method: "get" });

//详情页商品属性数据【mock】
export const reqSuperSaleAttrList = () => mockRequests({ url: "/superSaleAttrList", method: "get" });

//搜索页数据 这里需要传递参数
export const reqSearchList = (data) => requests({ url: "/list", method: "post", data });

//详情页页数据 这里需要传递参数 skuId /api/item/{ skuId }
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: "get" });

//添加|修改 购物车的商品 /api/cart/addToCart/{ skuId }/{ skuNum } POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

//获取购物车列表
export const reqCartList = () => requests({ url: "/cart/cartList", method: "get" });

//删除购物车商品   /api/cart/deleteCart/{skuId}   DELETE
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });

//切换商品选中状态 /api/cart/checkCart/{skuId}/{isChecked} GET
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "GET" });

//获取验证码 /api/user/passport/sendCode/{phone} get
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });

//用户注册 /api/user/passport/register post
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, data, method: "post" });

//用户登录 /api/user/passport/login post  参数 phone password
export const reqUserLogin = (data) => requests({ url: "/user/passport/login", data, method: "post" });

//获取用户信息【需要带着token向服务器要用户信息】 api/user/passport/auth/getUserInfo method get
export const reqUserInfo = () => requests({ url: "/user/passport/auth/getUserInfo", method: "get" });

// 退出登录 /api/user/passport/logout   请求方式 GET
export const reqLogout = () => requests({ url: "/user/passport/logout", method: "get" });

// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList      get
export const reqAddressInfo = () => requests({ url: "/user/userAddress/auth/findUserAddressList", method: "get" });

//  获取订单交易页信息  /api/order/auth/trade  请求方式GET
export const reqOrderInfo = () => requests({ url: "/order/auth/trade", method: "get" });

// 提交订单【这个接口没有用vuex写后续】 /api/order/auth/submitOrder?tradeNo={tradeNo}  请求方式POST
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: "POST" });

//获取订单支付信息【这个接口没有用vuex写后续】   /api/payment/weixin/createNative/{orderId}   请求方式  GET
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" });

//查询支付订单状态【这个接口没有用vuex写后续】   /api/payment/weixin/queryPayStatus/{orderId} 请求方式 GET
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" });

//获取我的订单列表 请求地址/api/order/auth/{page}/{limit}  请求方式 GET
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: "get" });







