// pages/evaluation-result/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scoreResult: 0,
    innerAudioContext: null, // 音频上下文
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { scoreResult, isGood } = options;
    
    // 初始化音频上下文
    this.initAudioContext();
    
    if (isGood === '1') {
      // 播放好成绩的声音
      this.playGoodSound();
    }
    this.setData({
      scoreResult,
    });
  },

  /**
   * 初始化音频上下文
   */
  initAudioContext() {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = '/assets/good.mp3';
    
    innerAudioContext.onPlay(() => {
      console.log('开始播放好成绩声音');
    });
    
    innerAudioContext.onError((res) => {
      console.error('播放声音失败:', res);
    });
    
    innerAudioContext.onEnded(() => {
      console.log('声音播放完成');
    });
    
    this.setData({
      innerAudioContext
    });
  },

  /**
   * 播放好成绩的声音
   */
  playGoodSound() {
    if (this.data.innerAudioContext) {
      this.data.innerAudioContext.play();
    }
  },

  /**
   * 手动播放声音（可供页面调用）
   */
  onPlaySound() {
    this.playGoodSound();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 页面卸载时销毁音频上下文
    if (this.data.innerAudioContext) {
      this.data.innerAudioContext.destroy();
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  back() {
    wx.navigateBack();
  },
});
