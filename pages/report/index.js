// pages/report/index.js
Page({
  data: {
    level2Data: {},
    level2DataKeys: [],
    title: ""
  },
  onLoad(options) {
    const { scoreTypeId, scoreTypeName } = options;
    if (scoreTypeId) {
      this.callSingleAllL2(scoreTypeId);
    }
    if (scoreTypeName) {
      this.setData({title: scoreTypeName})
    }
  },
  back() {
    wx.navigateBack()
  },
  async callSingleAllL2(scoreTypeId) {
    try {
      const { userScore } = await wx.API.userScoreDetail(scoreTypeId, {});
      console.log('userScore 数据:', userScore);
      
      // 转换数据结构以匹配界面期望的格式
      const level2Data = {};
      
      if (userScore && Array.isArray(userScore)) {
        userScore.forEach(level0Item => {
          const level0Id = level0Item.level0Id.toString();
          level2Data[level0Id] = level0Item.level1ScoreList.map(level1Item => ({
            level1Name: level1Item.level1Name,
            level2List: level1Item.level2ScoreList.map(level2Item => ({
              name: level2Item.level2Name,
              score: level2Item.score
            }))
          }));
        });
      }
      
      console.log('处理后的 level2Data:', level2Data);
      console.log('level2DataKeys:', Object.keys(level2Data));
      
      this.setData({
        level2Data,
        level2DataKeys: Object.keys(level2Data)
      });
    } catch (err) {
      console.error('API 调用错误:', err);
      wx.showToast({
        title: '获取数据失败！！！',
        icon: 'none'
      });
    }
  }
})