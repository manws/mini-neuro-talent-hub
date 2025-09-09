import {
  postRequest,
  getRequest
} from '../../utils/request.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecked: false,
    userInfo: {},
    phoneCode: '',
    radioStatus: false

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

  },

  handleRadio: function () {
    this.setData({
      isChecked: !this.data.isChecked
    })
  },

  getPhoneNumber(e) {
    let code = e.detail.code
    // code不存在，说明被拒绝了
    if (code) {
      this.setData({
        phoneCode: code
      })
      this.getMobile()
    } else {
      wx.hideLoading()
      wx.showToast({
        title: '用户拒绝授权',
        icon: 'none'
      })
    }
  },

  getMobile() {
    wx.showLoading({
      title: '登录中...'
    })
    getRequest('/rqri-stroke/weChat/mini/auth/exchange/mobile', {
      code: this.data.phoneCode
    }, res => {
      const {
        mobile,
        sign
      } = res
      this.getInfo({
        mobile,
        sign
      })
    }, err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: 'none'
      })
    })
  },

  getInfo({
    mobile,
    sign
  }) {
    getRequest('/rqri-stroke/weChat/mini/auth/login/touch', {
      mobile,
      sign
    }, res => {
      const {
        userId
      } = res.user
      this.getUser({
        patientId: userId
      })
    }, err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: 'none'
      })
    })
  },

  getUser({
    patientId
  }) {
    getRequest('/rqri-stroke/rq/patient/info', {
      patientId
    }, res => {
      this.setData({
        userInfo: res
      })
      this.getOpenId()
    }, err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: 'none'
      })
    })
  },

  getOpenId() {
    wx.login({
      success: res => {
        getRequest('/rqri-stroke/weChat/mini/auth/exchange/openid', {
            code: res.code
          },
          res => {
            this.skip()
          },
          err => {
            wx.hideLoading()
            wx.showToast({
              title: err,
              icon: 'none'
            })
          })

      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
  },

  skip() {

    wx.hideLoading()
    wx.showToast({
      title: '登录成功',
      icon: 'success'
    })
    console.log(this.data.userInfo, 'this.data.userInfo')
    wx.setStorageSync('userInfo', this.data.userInfo)
    getApp().globalData.userInfo = this.data.userInfo
    if (!wx.getStorageSync('hasShowAbstract')) {
      wx.setStorageSync('hasShowAbstract', true)
      wx.redirectTo({
        url: '/pages/abstract/index',
      })
    } else {
      if (app.globalData.userInfo.type == 68) { // 免费用户
        if (wx.getStorageSync('hasEnterMain')) {
          wx.redirectTo({
            url: '/pages/main-patient/index',
          })
        } else {
          wx.redirectTo({
            url: '/pages/programme/index',
          })
        }

      } else {
        wx.redirectTo({
          url: '/pages/main-patient/index',
        })
      }
    }
  },

  handleRadioClick() {
    this.setData({
      radioStatus: !this.data.radioStatus
    })
  },

  toOpen1() {

    wx.showLoading({
      title: '正在打开...',
    })
    wx.downloadFile({
      url: 'https://wx.bjxuanyi.com/rqri-stroke/system/file/preview/pdf/1005',
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