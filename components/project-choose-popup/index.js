Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },
  observers: {
    'show': function (show) {
      if (show) {}
    }
  },

  lifetimes: {
    attached: function () {

    }
  },

  pageLifetimes: {
    show: function () {
      this.onPullDownRefresh();
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchText: '',
    isRefreshing: false,
    loadMoring: false,
    showNoMore: false,
    isTriggered: false,
    dataStatus: "loading",
    page: {
      currentPage: 1,
      pageSize: 30
    },
    dataList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({
        show: false
      })

      this.triggerEvent("onClose", this.data.show)
    },

    handleClick(e) {
      this.onClose()
      this.triggerEvent("change", e.currentTarget.dataset.item)
    },

    onPullDownRefresh: function () {
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
      this.getData()

    },
    onReachBottom: function () {
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

    onSearch() {
      this.onPullDownRefresh()
    },

    onChange(e) {
      this.setData({
        searchText: e.detail,
      });
    },
    getData: function () {
      let param = Object.assign(this.data.page, {
        projectCode: this.data.searchText
      })

      wx.API.projects(param)
        .then(res => {
          this.setData({
            isTriggered: false,
            isRefreshing: false,
            loadMoring: false,
            showNoMore: true,
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
    }
  }
})