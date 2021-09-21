// pages/login/login.js
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"15211221404",
    password:""
  },

  handlePhone(event){
    let { value } = event.detail;
    console.log('handlePhone', value)
    this.setData({
      phone:value
    })
  },

  handlePassWord(event) {
    let { value } = event.detail;
    console.log('handlePassWord', value)
    this.setData({
      password: value
    })
  },

  handleInput(event) {
    // 获取到当前input框内部数据
    let { value } = event.detail;

    // 小程序可以通过自定义属性,向事件回调函数内部传参
    // event.target是触发者,也就是最内层子元素
    // event.currentTarget是事件源,也就是绑定了事件的组件
    // 原生DOM中是通过this查找事件源的,但是在框架中,事件回调函数的this都是组件或者页面实例
    let { type } = event.target.dataset;
    // console.log('handleInput', event.target.dataset.type)

    this.setData({
      [type]: value
    })

    // return function () {
    // }

  },

  async handleLogin(){
    /*
      1.收集数据
      2.前端校验(检测当前数据是否符合要求)
      3.发送请求
      4.后端校验
     */
    // console.log('handleLogin')
    let { phone , password} = this.data;
    if(!phone.trim()){
      // 如果没有内容,就弹窗提示用户,帐号错误
      wx.showToast({
        title:"登录失败,帐号错误",
        icon:"none"
      });
      return;
    }

    if (!password.trim()) {
      // 如果没有内容,就弹窗提示用户,帐号错误
      wx.showToast({
        title: "登录失败,密码错误",
        icon: "none"
      });
      return;
    }

    /*
      3.发送请求,进行登录
        状态码
          501 帐号不存在
          400 帐号错误
          502 密码错误
          200 登陆成功
     */
    let result = await req('/login/cellphone',{phone,password,isLogin:true});
    // console.log('result', result);
    wx.setStorageSync("userInfo", JSON.stringify(result.profile))
    let code = result.code;

    //根据请求的状态码,提示用户信息
    if(code == 200){
      wx.showToast({
        title: '登陆成功,即将跳转',
        icon:"none"
      })
      wx.switchTab({
        url:"/pages/personal/personal"
      })
      return ; 
    }
    if (code == 501||code == 400) {
      wx.showToast({
        title: '登陆失败,请确认帐号是否正确',
        icon: "none",
        duration:2500
      })
      return;
    }
    if (code == 502) {
      wx.showToast({
        title: '登陆失败,密码错误',
        icon: "none",
        duration: 2500
      })
      return;
    }
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