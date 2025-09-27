Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: '../../assets/logo.png',
    version: 'v1.0.1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const url = decodeURIComponent(options.q)
    if (url) {
      let arr = url.split('?sourcecode=')
      if (arr.length == 2) {
        let sourcecode = arr[1]
        wx.setStorageSync('sourcecode', sourcecode)
        wx.setStorageSync('isSourcecodeBind', false)
      }
    }
    console.log('小程序开始启动')
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    if (systemInfo && menuButtonInfo) {
      // 获取状态栏的高度
      var statusBarH = systemInfo.statusBarHeight
      getApp().globalData.statusBarHeight = statusBarH
      // 获取胶囊的位置，从而得到toolbar的高度
      var toolbarH = menuButtonInfo.height + (menuButtonInfo.top - statusBarH) * 2
      getApp().globalData.toolBarHeight = toolbarH
    }

    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      getApp().globalData.userInfo = userInfo
      getApp().globalData.token = wx.getStorageSync('token')
      // 检查是否有缓存project
      const project = wx.getStorageSync('project')
      if (project) {
        getApp().globalData.project = project
        wx.switchTab({
          url: '/pages/random/index',
        })
      } else {
        wx.switchTab({
          url: '/pages/assessment/index',
        })
      }

    } else {
      wx.redirectTo({
        url: '/pages/login/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})