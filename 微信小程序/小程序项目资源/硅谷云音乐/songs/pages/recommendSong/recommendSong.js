// pages/recommendSong/recommendSong.js
import req from '../../../utils/req.js';
import PubSub from 'pubsub-js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: "--",
    month: "--",
    recommendList:[],
    currentIndex:null
  },

  toSong(event){
    /*
      路由传参:
        可以通过url拼接query字符串传递参数
        但是由于url有长度限制,所以传递的数据不能太多
     */
    // console.log(event.currentTarget.dataset.song)
    let { songid , index } = event.currentTarget.dataset;
    this.setData({
      currentIndex:index
    })
    wx.navigateTo({
      url: '/songs/pages/song/song?songId=' + songid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    if (!wx.getStorageSync('cookie')) {
      wx.showModal({
        title: "请先登录",
        content: "该功能需要登录帐号",
        cancelText: "回到首页",
        confirmText: "去登陆",
        success({ cancel }) {
          // console.log('success', info)
          if (cancel) {
            wx.switchTab({
              url: '/pages/index/index'
            })
          } else {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }
        },
        fail() {
          console.log('fail')
        }
      })
      return;
    }

    //获取当前日期
    let date = new Date(); 
    let month = date.getMonth() + 1 ;
    let day = date.getDate();
    // console.log(month, day)
    this.setData({
      day,
      month
    });

    let result = await req('/recommend/songs');
    // console.log(result)
    this.setData({
      recommendList: result.recommend
    });

    PubSub.subscribe('switchType',(msg,data)=>{
      // console.log('switchType', msg, data)
      // 找到对应的歌曲id
      // 当前是哪一首->跳转到song页面之前,可以先记录一下,用户点击的选项的下标
      let { currentIndex , recommendList } =this.data;
      let id;
      if (data === "next") {
        if(currentIndex === recommendList.length-1){
          currentIndex=0;
        } else {
          currentIndex += 1
        }
      } else {
        if (currentIndex === 0) {
          currentIndex = recommendList.length - 1;
        } else {
          currentIndex -=1
        }
      }
      id = recommendList[currentIndex].id
      // console.log('id',id)
      this.setData({
        currentIndex
      })

      PubSub.publish('sendId',id);
    })
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