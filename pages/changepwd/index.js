Page({
  /**
   * 页面的初始数据
   */
  data: {
    oldPwd: '',
    newPwd: '',
    renewPwd: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  async handleLogin() {
    if (!this.data.oldPwd) {
      wx.showToast({
        title: '请输入旧密码',
        icon: 'none'
      })
      return
    }

    if (!this.data.newPwd) {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none'
      })
      return
    }

    if (!this.data.renewPwd) {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none'
      })
      return
    }

    if (this.data.newPwd != this.data.renewPwd) {
      wx.showToast({
        title: '两次输入的新密码不一致',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '请求中...',
      icon: 'loading'
    })
    const result = await wx.API.changePwd({
      oldPwd: this.data.oldPwd,
      newPwd: this.data.newPwd
    })
    wx.hideLoading()
    wx.showToast({
      title: '密码修改成功',
      icon: 'none'
    })
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/login/index',
      })
    }, 2000)
  },

  handleRegister() {
    wx.redirectTo({
      url: '/pages/register/index',
    })
  },

  handlePwd({
    detail
  }) {
    this.setData({
      oldPwd: detail.value
    })

  },

  handleNewPwd({
    detail
  }) {
    this.setData({
      newPwd: detail.value
    })
  },

  handleRenewPwd({
    detail
  }) {
    this.setData({
      renewPwd: detail.value
    })
  }
})