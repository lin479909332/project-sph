//引入Mock模块
import Mock from "mockjs";
//引入json
import banner from './banner.json';
import floor from './floor.json';
import superSaleAttrList from './superSaleAttrList.json';

//mock数据:第一个参数请求地址 第二个参数:请求数据

Mock.mock("/mock/banner", { code: "200", data: banner });
Mock.mock("/mock/floor", { code: "200", data: floor });
Mock.mock("/mock/superSaleAttrList", { code: "200", data: superSaleAttrList });
