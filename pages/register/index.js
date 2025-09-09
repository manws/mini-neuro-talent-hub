import {
    postRequest
} from '../../utils/request.js';
import {
  isMobile
 } from '../../utils/util.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioStatus: false,
    userName: '',
    userPwd: '',
    reuserPwd: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  },

  handleRadioClick() {
    this.setData({
      radioStatus: !this.data.radioStatus
    })
  },

  handleLogin() {
    wx.redirectTo({
      url: '/pages/a-doctor/login/index',
    })
  },

  handleRegister() {

    if (!this.data.userName) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }

    if (!this.data.userPwd) {
      wx.showToast({
        title: '请设置密码',
        icon: 'none'
      })
      return
    }

    if (!this.data.reuserPwd) {
      wx.showToast({
        title: '请再次确认密码',
        icon: 'none'
      })
      return
    }

    if (!this.data.radioStatus) {
      wx.showToast({
        title: '请勾选协议',
        icon: 'none'
      })
      return
    }

    if (!isMobile(this.data.userName)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return
    }

    if (this.data.userPwd != this.data.reuserPwd) {
      wx.showToast({
        title: '两次输入密码不一致',
        icon: 'none'
      })
      return
    }

    if (this.data.userPwd.length < 6) {
      wx.showToast({
        title: '密码长度至少位6位',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '正在注册...',
      icon: 'loading'
    })
    postRequest('/rqri-stroke/system/user/save', {
      mobile: this.data.userName,
      password: this.data.userPwd
    }, res => {
      wx.hideLoading()
      wx.showToast({
        title: '注册成功',
        icon: 'none'
      })
      wx.redirectTo({
      url: '/pages/a-doctor/login/index',
    })

    }, err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: 'none'
      })
    })
  },

  handleUsernameChange(e) {
    this.setData({
      userName: e.detail.value
    })
  },

  handleUserPwdChange(e) {
    this.setData({
      userPwd: e.detail.value
    })
  },

  handleReuserPwdChange(e) {
    this.setData({
      reuserPwd: e.detail.value
    })
  },

  toOpen1() {

    wx.showLoading({
      title: '正在打开...',
    })
    wx.downloadFile({
      url: 'https://wx.bjxuanyi.com/rqri-stroke/system/file/preview/pdf/1004',
      success: function (res) {
        wx.hideLoading()
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (err) {
            wx.hideLoading()
          }
        })
      },
      fail: function (err) {
        wx.hideLoading()
      }
    })
  },

  toOpen2() {

    wx.showLoading({
      title: '正在打开...',
    })
    wx.downloadFile({
      url: 'https://wx.bjxuanyi.com/rqri-stroke/system/file/preview/pdf/1001',
      success: function (res) {
        wx.hideLoading()
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (err) {
            wx.hideLoading()
          }
        })
      },
      fail: function (err) {
        wx.hideLoading()
      }
    })
  },

  toOpen3() {

    wx.showLoading({
      title: '正在打开...',
    })
    wx.downloadFile({
      url: 'https://wx.bjxuanyi.com/rqri-stroke/system/file/preview/pdf/1002',
      success: function (res) {
        wx.hideLoading()
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (err) {
            wx.hideLoading()
          }
        })
      },
      fail: function (err) {
        wx.hideLoading()
      }
    })
  },

  toOpen4() {

    wx.showLoading({
      title: '正在打开...',
    })
    wx.downloadFile({
      url: 'https://wx.bjxuanyi.com/rqri-stroke/system/file/preview/pdf/1003',
      success: function (res) {
        wx.hideLoading()
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (err) {
            wx.hideLoading()
          }
        })
      },
      fail: function (err) {
        wx.hideLoading()
      }
    })
  }
})