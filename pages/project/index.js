Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRefreshing: false,
    loadMoring: false,
    showNoMore: false,
    isTriggered: false,
    dataStatus: "loading",
    page: {
      pageNum: 1,
      pageSize: 10
    },
    dataList: [],
    searchText: '',
    canUpPull: false
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
    this.onPullDownRefresh();
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
  async onPullDownRefresh() {
    if (this.data.isRefreshing) {
      return
    }
    this.data.isRefreshing = true
    this.data.page.pageNum = 1
    this.setData({
      showNoMore: false,
      isTriggered: true,
      page: this.data.page
    })

    await this.getData()
    this.setData({
      scrollTop: 0
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 正在刷新和没有更多都不让上拉加载
    if (!this.data.canUpPull || this.data.isRefreshing || this.data.showNoMore || this.data.dataList.length < this.data.page.pageSize) {
      return
    }
    this.data.isRefreshing = true
    this.data.page.pageNum = 1 + this.data.page.pageNum
    this.setData({
      loadMoring: true,
      showNoMore: false,
      page: this.data.page
    })

    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  getData() {
    let param = {
      projectCode: this.data.searchText
    }
    wx.API.projects(param)
      .then(res => {
        this.setData({
          isTriggered: false,
          isRefreshing: false,
          loadMoring: false,
          dataList: res.projectList ? res.projectList : []
        })
      }, err => {
        wx.showToast({
          title: err,
          icon: 'none'
        })
        this.setData({
          isTriggered: false,
          isRefreshing: false,
          loadMoring: false
        });
      })
  },

  handleClick(e) {
    const project = e.currentTarget.dataset.item;
    wx.setStorageSync('project', project)
    getApp().globalData.project = project
    wx.switchTab({
      url: '/pages/random/index',
    })
  },

  onSearch() {
    this.onPullDownRefresh()
  },

  onChange(e) {
    console.log(e)
    this.setData({
      searchText: e.detail,
    });
  }

})