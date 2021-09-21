/*
  封装代码的核心思想
    1.保留公共部分(重复出现的部分)
    2.提取每次都不一样的数据(将不同的内容动态传入)

    封装函数
      1.保留重复出现的js代码
      2.提取不同的数据,通过形参动态传入
      3.谁调用谁传入

    封装组件
      1.保留重复出现的html,css以及部分js
      2.提取不同的数据,通过标签属性动态传入
      3.谁使用谁传入

 */
import config from './config.js';
//优点:只有在项目初始化的时候,读取一次
// 缺点:时效性太差了,没办法保证是当前最新
// let cookie = wx.getStorageSync('cookie');

export default function(url, data={},method="GET"){
  return new Promise((resolve,reject) => {
    wx.request({
      // url: config.testHost + url,
      url: config.host + url,
      data,
      method,
      header: {
      //优点:时效性较好,每次发送请求都会尝试读取一次
      // 缺点:读取次数太频繁
        cookie: wx.getStorageSync('cookie')
        // cookie
      },
      success: (res) => {
        // console.log('res', res)
        //将cookie保存到Storage中
        /*判断依据:
            1.通过cookie长度判断(当前可行,但是不稳妥)
            2.通过请求路径url进行判断(较为可行,但是需要放置后端修改接口地址)
            3.通过data中新增一个isLogin属性来进行判断
        */
        if(data.isLogin){
          let { cookies } = res;

          //找到MUSIC_U开头的cookie
          let cookie = cookies.find((item,index)=>{
            return item.startsWith('MUSIC_U');
          })

          //将找到的cookie保存到Storage
          wx.setStorage({
            key:"cookie",
            data: cookie
          })
        }

        resolve(res.data);
        // const banners = res.data.banners;
        // this.setData({
        //   banners
        // })
      }
    });
  })
}