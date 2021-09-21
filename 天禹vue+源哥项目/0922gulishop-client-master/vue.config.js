module.exports = {
  lintOnSave: false, //禁用eslint
  devServer:{
    proxy:{
      "/api": {
        // 转发的目标服务器地址
        target: "http://182.92.128.115",
        // 是否把路径当中的/api去掉
        // pathRewrite: {"^/api" : ""} //要不要去掉/api,要看接口路径里面有没有，如果有，那就不去
      }
    }
  }
}