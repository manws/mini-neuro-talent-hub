// pages/evaluation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    position: 0,
    fieldLength: 10,
    list: [{}, {}, {}, {},{}, {}, {}, {}, {}, {}]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  swipterChange(e) {
    const {detail : { current } } = e
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
    this.setData({
      position: this.data.position + 1
    })
  }, 
  /**
   * 提交表单数据
   */
  submit() {
    wx.redirectTo({
      url: '/pages/evaluation-result/index',
    })

  }
})