module.exports = {
  //取消打包map文件
  productionSourceMap:false,
  //关闭eslint
  lintOnSave:false,
  //代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        //pathRewrite: { '^/api': '' },
      },
    },
  },
}