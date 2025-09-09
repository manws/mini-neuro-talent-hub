// pages/subject-detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isNew: false,
    subject: {},
    subjectFieldList: [],
    codegroup: {},
    projectInfo: {},
    randomInfo: {},
    subjectCodeInfo: {},
    permission: {},
    isEdit: false,
    showFooter: false,
    showOperationPop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id) {
      this.data.isNew = false
      wx.setNavigationBarTitle({
        title: `受试者  ${options.subjectCode}`
      });
      this.initSubject(options.id)
    } else {
      this.data.isNew = true
      this.initSubject()
    }
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
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  async initSubject(id) {
    wx.showNavigationBarLoading()
    const {
      subjectFieldList,
      codegroup,
      projectInfo,
      randomInfo,
      subjectCodeInfo,
      permission
    } = id ? await wx.API.getSubject(id) : await wx.API.newSubject()
    wx.hideNavigationBarLoading()
    subjectFieldList.forEach((subinfo, index) => {
      if (subinfo.fieldCode === 'subjectCode') {
        subinfo.noEdit = true;
        subinfo.hint = '选择中心ID自动生成'
      }
    })

    this.setData({
      subjectFieldList: subjectFieldList,
      codegroup: codegroup,
      projectInfo: projectInfo,
      randomInfo: randomInfo,
      permission: permission ? permission : {},
      subjectCodeInfo: subjectCodeInfo,
      isEdit: id ? false : true,
      showFooter: id ? false : true,
      subject: {id: id}
    })

  },

  onSubjectFieldListChange({
    detail
  }) {
    this.setData({
      subjectFieldList: detail
    })
  },

  handlePosition() {
    console.log(this.data.subjectFieldList, 'this.data.subjectFieldList')
    wx.showModal({
      title: '温馨提示',
      content: '您确定要保存数据吗？',
      cancelText: '我再想想',
      confirmText: '继续提交',
      complete: (res) => {
        if (res.confirm) {
          this.submitData()
        }
      }
    })

  },

  submitData() {
    let param = {};
    let isFit = null;
    this.data.subjectFieldList.forEach((item, index) => {
      param[item.fieldCode] = item.value;
      if (item.fieldCode === 'isFit') {
        isFit = item.value + '';
      }
    });
    if (isFit === '0' || isFit === 0) {
      wx.showModal({
        title: '温馨提示',
        content: '您的入选标准选择为否，您确定继续执行吗？',
        cancelText: '取消',
        confirmText: '继续',
        complete: (res) => {
          if (res.confirm) {
            this.requestSubject(param);
          }
        }
      })
    } else {
      this.requestSubject(param);
    }
  },

  async requestSubject(param) {
    if (this.data.isNew) {
      wx.showLoading({
        title: '请求中......',
      })
      const subject = await wx.API.addSubject(param)
      wx.setNavigationBarTitle({
        title: `受试者  ${subject.subjectCode}`
      });
      await this.initSubject(subject.subjectId)

    } else {
      const resut = await wx.API.updateSubject(this.data.subject.id, param)
      await this.initSubject(subject.subjectId)
    }
  },

  handleCancel() {
    if (this.data.isNew) {
      wx.navigateBack()
    } else {
      this.setData({
        showFooter: false
      })
    }
  },

  showOpPopup() {
    console.log('subject-detail,showOpPopup', this.data.permission);
    this.setData({
      showOperationPop: true
    })
  }
})