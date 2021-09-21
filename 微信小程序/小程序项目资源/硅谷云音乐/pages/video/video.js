// pages/video/video.js
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    videoList:[],
    currentId:null,
    videoId:null,
    triggered:false
  },

  // 当前函数仅用于测试视频暂停API
  testApi() {
//     1)创建对应的视频上下文对象
    let videoContext = wx.createVideoContext('9B5C7DF79B7DBC309FA47F7631FE72A3');
//     2) 调用视频上文对象身上的pause方法, 可以暂停视频
    videoContext.pause();
  },

  // 用于处理用户上拉触底加载更多操作
  handleScrollToLower(){
    console.log('handleScrollToLower')
    setTimeout(()=>{
      let newList = this.data.videoList.slice(0,8);
      let arr = [...this.data.videoList,...newList];
      this.setData({
        videoList:arr
      })
    },2000)
  },

  // 用于处理用户下拉刷新操作
  async handlePullDown(){
    // console.log('handlePullDown')
    await this.getVideoList();
    this.setData({
      triggered:false
    })
  },

  // 用来监视用户的点击图片操作,进行image和video之间的切换
  handleTap(event){
    // console.log('handleTap');
    // 获取当前图片的id
    let { id } = event.currentTarget;
    // 将获取到的id更新到data中
    this.setData({
      videoId:id
    })

    // 1.通过videoid创建出对应的视频上下文
    let videoContext = wx.createVideoContext(id);
    // 2.调用API播放视频
    setTimeout(() => {
      videoContext.play();
    },1000);
  },

  // 用于监视视频的播放状态
  handlePlay(event){
    // console.log('handlePlay', this.videoId)
    // 获取到当前正在播放的videoId
    let { id } = event.currentTarget;

    if (this.videoId&&this.videoId!==id) {
      //     1)创建对应的视频上下文对象
      let videoContext = wx.createVideoContext(this.videoId);
      //     2) 调用视频上文对象身上的pause方法, 可以暂停视频
      videoContext.pause();
    }

    this.videoId = id;
  },

  // 点击导航栏中的选项,切换显示的内容
  async changeId(event){
    // console.log('changeId',event.currentTarget)
    let { id } = event.currentTarget.dataset;
    /*
      自定义属性:你给他什么,他就返回什么,数据类型不变
      标签属性:你给他什么,他会转为字符串返回
     */


    // let { id } = event.currentTarget;
    // console.log(id)
    this.setData({
      currentId:id
    })

    // 显示loading框
    wx.showLoading({
      title:"加载中,请稍后"
    });

    // 清空videoList的显示,让用户体验到白屏效果
    this.setData({
      videoList:[]
    })

    //请求列表数据
    await this.getVideoList();

    //隐藏loading框
    // console.log(2)
    wx.hideLoading({});

  },

  // 用于请求视频列表数据
  async getVideoList(){
    let videoData = await req('/video/group', { id: this.data.currentId });

    // console.log(1)
    let videoList = videoData.datas.map((item, index) => {
      return item.data
    })

    this.setData({
      videoList
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:async function () {
    if(!wx.getStorageSync('cookie')){
      wx.showModal({
        title:"请先登录",
        content:"该功能需要登录帐号",
        cancelText:"回到首页",
        confirmText:"去登陆",
        success({cancel}){
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
    //用于获取导航栏信息
    let navData = await req('/video/group/list');
    // console.log('navData',navData)
    this.setData({
      navList:navData.data.slice(0,14),
      currentId: navData.data[0].id
    })

    //用于获取视频列表信息
    // let videoData = await req('/video/group', { id: this.data.currentId});
    // // console.log('videoData', videoData)
    // let videoList = videoData.datas.map((item,index)=>{
    //   return item.data
    // })
    // // console.log(videoList)
    // this.setData({
    //   videoList
    // })
    this.getVideoList()
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
    console.log('onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ({from,target}) {
    // console.log('onShareAppMessage', from)
    // 如果是点击右上角转发按钮,就分享当前小程序logo,名称
    if(from==="menu"){
      return{
        title:"硅谷云音乐",
        imageUrl:"/static/images/dazuo.jpeg",
        path:"/pages/index/index"
      }
    }else{
    // 如果是点击button组件转发,就分享当前歌曲图片和logo
    // 自定义属性名称,大写无效,会自动转为小写
      // console.log(target)
      let { title , imageurl } = target.dataset;
      return {
        title,
        imageUrl: imageurl,
        path: "/pages/video/video"
      }
    }
  }
})