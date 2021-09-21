// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveDistance:0,
    moveTransition:null,
    userInfo:{}
  },

  handleTouchStart(event) {
    // console.log('handleTouchStart', event.changedTouches[0].clientY)
    // event.touches用于收集当前屏幕上所有的手指
    // event.changedTouches用于收集当前屏幕上正在移动的手指
    this.startY = event.changedTouches[0].clientY;
    console.log(event)
    this.setData({
      moveTransition:null
    })
  },

  handleTouchMove(event){
    // console.log('handleTouchMove', event.changedTouches[0].clientY)
    let moveY = event.changedTouches[0].clientY;
    let moveDistance = moveY - this.startY;
    if (moveDistance > 0&&moveDistance<80) {
      this.setData({
        moveDistance
      })
    }
    // console.log(moveDistance)
  },

  handleTouchEnd() {
    this.setData({
      moveDistance:0,
      moveTransition: "transform 400ms"
    })
  },

  toLogin(){
    wx.navigateTo({
      url:"/pages/login/login"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('onLoad')
    // let userInfoStr = wx.getStorageSync('userInfo') ;
    // let userInfo = JSON.parse(userInfoStr||"{}");
    // // console.log('userInfo', userInfo)
    // this.setData({
    //   userInfo
    // })
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
    let userInfoStr = wx.getStorageSync('userInfo');
    let userInfo = JSON.parse(userInfoStr || "{}");
    this.setData({
      userInfo
    })
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