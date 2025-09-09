Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userPwd: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.clearStorageSync()
  },

  async handleLogin() {
    if (!this.data.userName) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }

    if (!this.data.userPwd) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '正在登录...',
      icon: 'loading'
    })
    const result = await wx.API.login({
      userCode: this.data.userName,
      userPwd: this.data.userPwd
    })
    console.log(result, 'result2')

    wx.hideLoading()
    // 保存用户信息
    wx.setStorageSync("userInfo", result)
    let cookie = 'userId = ' + result.userId + '; userName = ' + encodeURI(result.userName)
    wx.setStorageSync('cookie', cookie)
    getApp().globalData.cookie = cookie
    wx.redirectTo({
      url: '/pages/project/index',
    })
  },

  handleRegister() {
    wx.redirectTo({
      url: '/pages/register/index',
    })
  },

  handleUserName(e) {
    this.setData({
      userName: e.detail.value
    })

  },

  handleUserPwd(e) {
    this.setData({
      userPwd: e.detail.value
    })
  }
})