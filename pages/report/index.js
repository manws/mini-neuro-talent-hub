// pages/report/index.js
Page({
  data: {
    level2Data: {},
    level2DataKeys: []
  },
  onLoad(options) {
    const { scoreTypeId } = options;
    if (scoreTypeId) {
      this.callSingleAllL2(scoreTypeId);
    }
  },
  back() {
    wx.navigateBack()
  },
  async callSingleAllL2(scoreTypeId) {
    try {
      const { level2Data } = await wx.API.userScoreSingleAllL2(scoreTypeId, {});
      // 处理返回的数据
      this.setData({
        level2Data,
        level2DataKeys: Object.keys(level2Data)
      });
    } catch (err) {
      wx.showToast({
        title: '获取数据失败！！！',
        icon: 'none'
      });
    }
  }
})