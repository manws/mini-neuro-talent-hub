Page({
  data: {
    userInfo: {},
  },
  onLoad(options) {
    this.setData({
      userInfo: getApp().globalData.userInfo,
    });
  },
  onShow() {},
});
