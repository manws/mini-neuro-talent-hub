Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    isRefreshing: false,
    loadMoring: false,
    showNoMore: false,
    isTriggered: false,
    dataStatus: "loading",
    page: {
      currentPage: 1,
      pageSize: 10
    },
    dataList: [],
    searchText: '',
    projectCode: '',
    showProjectPopup: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      projectCode: getApp().globalData.project.projectCode
    })
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
    this.data.page.currentPage = 1
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
    if (this.data.isRefreshing || this.data.showNoMore || this.data.dataList.length < this.data.page.pageSize) {
      return
    }
    this.data.isRefreshing = true
    this.data.page.currentPage = 1 + this.data.page.currentPage
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

  /**
   * 展示项目列表
   */
  toggleProjectList() {
    this.setData({
      showProjectPopup: !this.data.showProjectPopup
    })
  },

  getData() {
    let param = Object.assign(this.data.page, {
      'orderTypeId': 0,
      'orderFieldCode': this.data.searchText
    })
    wx.API.listSubject(param)
      .then(res => {
        this.setData({
          isTriggered: false,
          isRefreshing: false,
          loadMoring: false
        })

        if (!res.body || !res.page) {
          this.setData({
            dataList: []
          })
          return
        }
        var total = res.page.totalNum
        // 下拉刷新的场景
        if (this.data.page.currentPage == 1) {
          if (total >= 5 && total <= this.data.page.pageSize) {
            this.setData({
              showNoMore: true
            })
          }
          this.setData({
            dataList: res.body
          })

        } else { // 上拉加载
          this.data.dataList = this.data.dataList.concat(res.body)
          if (this.data.dataList.length == total) {
            this.setData({
              showNoMore: true
            })
          } else {
            this.setData({
              showNoMore: false
            })
          }
          this.setData({
            isTriggered: false,
            dataList: this.data.dataList
          })
        }
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
    const subject = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/subject-detail/index?id=${subject.id}&subjectCode=${subject.subjectCode}`
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
  },

  handleProjectChoosePopupClose(e) {
    this.setData({
      showProjectPopup: false
    })
  },

  handleProjectChange(e) {
    const project = e.detail;
    wx.setStorageSync('project', project)
    getApp().globalData.project = project

    this.setData({
      projectCode: project.projectCode
    })

    this.onPullDownRefresh()

  },

  bindScroll(e, e1) {
    console.log(e, e1)
  },

  plusSubject() {
    wx.navigateTo({
      url: '/pages/subject-detail/index',
    })
  }

})