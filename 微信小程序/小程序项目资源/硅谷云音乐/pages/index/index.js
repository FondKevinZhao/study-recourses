// pages/index/index.js
// 引入js文件不能使用绝对路径
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    recommendList:[],
    topList:[]
  },

  toRecommendSong(){
    wx.navigateTo({
      url: '/songs/pages/recommendSong/recommendSong'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // console.log('window', window)
    // console.log('wx', wx)
    /*
      发送请求三要素
      1.在哪发
        onLoad
      2.怎么发
        wx.request(),该API可以发送请求
      3.往哪发
        去接口文档查看接口
     */
    // console.log(1)

    //用于请求轮播图数据
    // wx.request({
    //   url:"http://localhost:3000/banner",
    //   data:{
    //     type:2
    //   },
    //   success:(res)=>{
    //     // console.log('res', res)
    //     const banners = res.data.banners;
    //     this.setData({
    //       banners
    //     })
    //   }
    // })

    let result = req('/banner',{type:2});
    result.then((res) => {
      // console.log('result', res);
      const banners = res.banners;
      this.setData({
        banners
      })
    })
    // console.log(2)

    //用于请求推荐歌曲区域数据
    // wx.request({
    //   url: "http://localhost:3000/personalized",
    //   success: (res) => {
    //     // console.log('res', res)
    //     const recommendList = res.data.result;
    //     this.setData({
    //       recommendList
    //     })
    //   }
    // })

    let result1 = req('/personalized');
    result1.then((res) => {
      const recommendList = res.result;
      this.setData({
        recommendList
      })
    })

    // 请求排行榜数据
    // 用于存放多个榜单的数据
    const topList = [];

    // 用于存放当前需要展示的榜单key值
    const arr = [2,6,8,12];

    let index = 0;

    while (arr.length>index) {
      let topData = req('/top/list', { idx: arr[index++] });
      topData.then((res) => {
        /*
          id 当前榜单的唯一标识
          name 当前榜单名称
          tracks 当前榜单的歌曲排名列表
         */
        let { id, name, tracks } = res.playlist;

        //由于tracks数组内部存放着100首歌,实际只需要3首,所以需要进行数据处理
        tracks = tracks.slice(0,3);

        topList.push({
          id,
          name,
          tracks
        })

        this.setData({
          topList
        })
        // console.log(topList);
      })
    }
    
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})