import API from './api/service.js';
App({
  onLaunch() {
    wx.API = API
  },
  globalData: {
    statusBarHeight: 44,
    toolBarHeight: 40,
    userInfo: null,
    token: null,
    cookie: null,
    project: null
  }
})