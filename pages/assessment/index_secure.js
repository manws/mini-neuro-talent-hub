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
    const app = getApp()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 检查项目是否存在
    if (this.data.projectCode) {
      this.onPullDownRefresh()
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    if (this.data.isRefreshing) {
      return
    }
    
    // 使用 setData 确保状态同步
    this.setData({
      isRefreshing: true,
      'page.currentPage': 1,
      showNoMore: false,
      isTriggered: true
    })
    
    try {
      await this.getData()
      this.setData({
        scrollTop: 0
      })
    } catch (error) {
      console.error('下拉刷新失败:', error)
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 正在刷新和没有更多都不让上拉加载
    if (this.data.isRefreshing || this.data.showNoMore || 
        this.data.dataList.length < this.data.page.pageSize) {
      return
    }
    
    // 修复页码计算错误
    const nextPage = this.data.page.currentPage + 1
    
    this.setData({
      isRefreshing: true,
      'page.currentPage': nextPage,
      loadMoring: true,
      showNoMore: false
    })

    this.getData()
  },

  /**
   * 展示项目列表
   */
  toggleProjectList() {
    this.setData({
      showProjectPopup: !this.data.showProjectPopup
    })
  },

  /**
   * 获取数据 - 增强错误处理和安全性
   */
  getData() {
    return new Promise((resolve, reject) => {
      // 参数验证
      if (!this.data.projectCode) {
        this.showError('项目信息缺失')
        reject(new Error('项目信息缺失'))
        return
      }

      const param = {
        ...this.data.page,
        orderTypeId: 0,
        orderFieldCode: this.sanitizeInput(this.data.searchText)
      }

      wx.API.listSubject(param)
        .then(res => {
          this.handleDataSuccess(res)
          resolve(res)
        })
        .catch(err => {
          this.handleDataError(err)
          reject(err)
        })
        .finally(() => {
          this.setData({
            isTriggered: false,
            isRefreshing: false,
            loadMoring: false
          })
        })
    })
  },

  /**
   * 处理数据获取成功
   */
  handleDataSuccess(res) {
    if (!res || !res.body || !Array.isArray(res.body)) {
      this.setData({
        dataList: [],
        showNoMore: true
      })
      return
    }

    const total = res.page?.totalNum || 0
    const currentPage = this.data.page.currentPage

    if (currentPage === 1) {
      // 下拉刷新场景
      this.setData({
        dataList: res.body,
        showNoMore: res.body.length < this.data.page.pageSize || res.body.length >= total
      })
    } else {
      // 上拉加载场景
      const newDataList = [...this.data.dataList, ...res.body]
      this.setData({
        dataList: newDataList,
        showNoMore: newDataList.length >= total
      })
    }
  },

  /**
   * 处理数据获取错误
   */
  handleDataError(err) {
    console.error('获取数据失败:', err)
    
    // 安全的错误提示，不暴露系统信息
    let errorMessage = '获取数据失败，请重试'
    
    if (typeof err === 'string' && err.length < 50) {
      errorMessage = err
    }
    
    this.showError(errorMessage)
  },

  /**
   * 安全的错误提示
   */
  showError(message) {
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    })
  },

  /**
   * 输入内容清理，防止注入
   */
  sanitizeInput(input) {
    if (typeof input !== 'string') {
      return ''
    }
    // 移除潜在的危险字符
    return input.replace(/[<>'"&]/g, '').trim()
  },

  /**
   * 安全的URL编码
   */
  safeEncodeURIComponent(str) {
    try {
      return encodeURIComponent(str || '')
    } catch (error) {
      console.error('URL编码失败:', error)
      return ''
    }
  },

  /**
   * 处理点击事件 - 修复URL注入漏洞
   */
  handleClick(e) {
    const subject = e.currentTarget.dataset.item
    
    if (!subject || !subject.id) {
      this.showError('数据异常，请重试')
      return
    }

    // 安全的URL构建
    const id = this.safeEncodeURIComponent(subject.id)
    const subjectCode = this.safeEncodeURIComponent(subject.subjectCode)
    
    wx.navigateTo({
      url: `/pages/subject-detail/index?id=${id}&subjectCode=${subjectCode}`
    })
  },

  /**
   * 搜索处理
   */
  onSearch() {
    this.onPullDownRefresh()
  },

  /**
   * 搜索内容变化
   */
  onChange(e) {
    const searchText = e.detail || ''
    this.setData({
      searchText: this.sanitizeInput(searchText)
    })
  },

  /**
   * 关闭项目选择弹窗
   */
  handleProjectChoosePopupClose() {
    this.setData({
      showProjectPopup: false
    })
  },

  /**
   * 项目变更处理
   */
  handleProjectChange(e) {
    const project = e.detail
    
    if (!project || !project.projectCode) {
      this.showError('项目信息异常')
      return
    }

    try {
      wx.setStorageSync('project', project)
      
      const app = getApp()
      if (app && app.globalData) {
        app.globalData.project = project
      }

      this.setData({
        projectCode: project.projectCode
      })

      this.onPullDownRefresh()
    } catch (error) {
      console.error('保存项目信息失败:', error)
      this.showError('保存项目信息失败')
    }
  },

  /**
   * 滚动事件处理
   */
  bindScroll(e) {
    // 移除无用的参数和日志
    if (e && e.detail) {
      this.setData({
        scrollTop: e.detail.scrollTop
      })
    }
  },

  /**
   * 添加受试者
   */
  plusSubject() {
    if (!this.data.projectCode) {
      this.showError('请先选择项目')
      return
    }
    
    wx.navigateTo({
      url: '/pages/subject-detail/index'
    })
  },

  /**
   * 页面卸载时清理
   */
  onUnload() {
    // 清理可能的定时器或监听器
    this.setData({
      isRefreshing: false,
      loadMoring: false
    })
  }
})