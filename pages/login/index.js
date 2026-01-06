import md5 from '../../utils/md5.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userPwd: '',
    passwordVisible: true,
    isSelectedBox: false
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
        title: '请输入账号',
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

    const loginOn = parseInt(Date.now() / 1000);
    const sign = `userCode=${this.data.userName}&&userPwd=${this.data.userPwd}&&loginOn=${loginOn}&&key=xhedc_jiangbo_wangshuang_123!@#`
    const result = await wx.API.login({
      userCode: this.data.userName,
      userPwd: this.data.userPwd,
      loginOn: loginOn,
      sign: md5(sign)
    })
    console.log(result, 'result2')

    wx.hideLoading()
    // 保存用户信息
    wx.setStorageSync("userInfo", result)
    let cookie = 'userId = ' + result.userId + '; userName = ' + encodeURI(result.userName)
    wx.setStorageSync('cookie', cookie)
    getApp().globalData.cookie = cookie

    wx.switchTab({
      url: '/pages/assessment/index',
    })
  },

  handleRegister() {
    wx.redirectTo({
      url: '/pages/register/index',
    })
  },

  handleForgetPwd() {
    wx.navigateTo({
      url: '/pages/changepwd/index',
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
  },
  togglePasswordVisibility() {
    this.setData({
      passwordVisible: !this.data.passwordVisible
    })
  },
  handleCheckboxChange() {
    this.setData({
      isSelectedBox: !this.data.isSelectedBox
    })
  },

  getPhoneNumber(e) {
    let code = e.detail.code
    console.log("login", "[getPhoneNumber], code", JSON.stringify(e))
    // code不存在，说明被拒绝了
    if (code) {
      this.setData({
        phoneCode: code
      })
    } else {
      wx.hideLoading()
      wx.showToast({
        title: '用户拒绝授权',
        icon: 'none'
      })
    }
  }
})