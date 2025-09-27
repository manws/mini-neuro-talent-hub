// pages/evaluation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    position: 0,
    fieldLength: 0,
    scoreResult: '',
    scoreList: [],
    id: '',
    scoreTypeId: '',
    param: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id, scoreTypeId } = options;
    console.log('接收到的参数:', { id, scoreTypeId });

    // 保存页面参数到data中
    this.setData({
      id,
      scoreTypeId
    });

    if (scoreTypeId && id) {
      this.callSingleL0(scoreTypeId, id);
    }
  },
  swipterChange(e) {
    const { detail: { current } } = e
    this.setData({
      position: current
    })
  },
  back() {
    wx.navigateBack()
  },
  previous() {
    this.setData({
      position: this.data.position - 1
    })

  },
  next() {
    if (this.data.position < this.data.scoreList.length) {
      this.setData({
        position: this.data.position + 1
      })
    }
  },

  /**
   * 处理输入框输入事件
   */
  handleInpput(e) {
    const { value } = e.detail;
    const { data } = e.currentTarget.dataset
    // 更新当前位置的评分数据
    if (value) {
      this.data.param[data.level2Code] = value
    } else {
      this.data.param[data.level2Code] = '0'
    }
  },
  /**
   * 提交表单数据
   */
  async submit() {
    // 获取页面参数
    const { scoreTypeId, id } = this.data;
    await this.callUserScoreUpdate(scoreTypeId, id);
  },

  /**
   * 调用singleL0接口
   */
  async callSingleL0(scoreTypeId, levelId) {
    try {
      const res = await wx.API.userScoreSingle0(scoreTypeId, levelId, {});
      console.log('singleL0接口调用成功:', res);

      // 处理返回的数据
      if (res) {
        const { scoreResult, scoreList } = res;
        // 将数据存储到页面数据中
        this.setData({
          scoreResult,
          scoreList,
          fieldLength: scoreList.length
        });
      }

    } catch (err) {
      console.error('singleL0接口调用失败:', err);
      wx.showToast({
        title: '获取数据失败',
        icon: 'none'
      });
    }
  },

  /**
   * 调用userScoreUpdate接口
   */
  async callUserScoreUpdate(scoreTypeId, levelId) {
    try {
      const param = {};
      this.data.scoreList.forEach(item => {
        if (this.data.param[item.level2Code]) {
          if (this.data.param.hasOwnProperty(item.level2Code) && this.data.param) {
            param[item.level2Code] = this.data.param[item.level2Code];
          }
        } else {
          param[item.level2Code] = '0'
        }
      });
      const { scoreResult } = await wx.API.userScoreUpdate(scoreTypeId, levelId, param);
      wx.redirectTo({
        url: '/pages/evaluation-result/index?scoreResult=' + scoreResult,
      });

    } catch (err) {
      console.error('userScoreUpdate接口调用失败:', err);
      wx.showToast({
        title: '提交失败',
        icon: 'none'
      });
    }
  }
})