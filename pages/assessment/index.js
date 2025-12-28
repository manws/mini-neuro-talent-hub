Page({
  data: {
    loadMoring: false,
    isTriggered: false,
    scoreTypeId: "",
    scoreTypeName: "",
    state: null,
    ts01: null,
    ts02: null,
    ts03: null,
    ts04: null,
    ts05: null,
    ts06: 0,
    tsAll: "",
    showPop: false,
    popTips: "是否进行考核评估？",
  },
  onShow() {
    this.getUserScoreWxLast();
  },
  handleClick(e) {
    const { id } = e.currentTarget.dataset;
    const map = {
      1: '医疗工作评估',
      2: '教学工作评估',
      3: '科研工作评估',
      4: '人才培养评估',
      5: '公益工作评估',
      6: '自我评估',
    }
    if (id == 6) {
      wx.navigateTo({
        url: `/pages/rate/index?id=${id}&scoreTypeId=${this.data.scoreTypeId}`,
      });
      return
    }
    wx.navigateTo({
      url: `/pages/evaluation-medical-work/index?id=${id}&scoreTypeId=${this.data.scoreTypeId}&scoreTypeName=${map[id]}`,
    });
  },

  onSearch() {
    this.onPullDownRefresh();
  },

  onChange(e) {},

  bindScroll(e, e1) {
    console.log(e, e1);
  },

  watchReport() {
    wx.navigateTo({
      url:
        "/pages/report/index?scoreTypeId=" +
        this.data.scoreTypeId +
        "&scoreTypeName=" +
        this.data.scoreTypeName,
    });
  },

  /**
   * 获取用户最新评分
   */
  async getUserScoreWxLast() {
    const param = {
      // 根据需要添加参数
    };
    try {
      const res = await wx.API.userScoreWxLast(param);
      console.log("用户最新评分数据:", res);
      // 处理返回的数据
      if (res) {
        // 使用解构赋值承接返回值
        const {
          scoreTypeId,
          scoreTypeName,
          state,
          ts01,
          ts02,
          ts03,
          ts04,
          ts05,
          ts06,
          tsAll,
        } = res;
        // 可以将数据存储到页面数据中
        this.setData({
          scoreTypeId,
          scoreTypeName,
          state,
          ts01,
          ts02,
          ts03,
          ts04,
          ts05,
          ts06,
          tsAll: tsAll ? parseFloat(tsAll).toFixed(1) : "",
        });
        // 当state=0且scoreTypeId>0时弹出确认框
        if (state === 0 && scoreTypeId > 0) {
          this.setData({
            popTips: `是否进行"${scoreTypeName}"考核评估？`,
            showPop: true,
          });
        }
      }
    } catch (err) {
      console.error("获取用户最新评分失败:", err);
      wx.showToast({
        title: "获取数据失败",
        icon: "none",
      });
    }
  },

  async clickPosition() {
    await this.callUserScoreInsert(this.data.scoreTypeId);
    this.setData({
      showPop: false,
    });
  },

  clickOverlay() {
    this.setData({
      showPop: false,
    });
  },

  /**
   * 调用userScoreInsert接口
   */
  async callUserScoreInsert(scoreTypeId) {
    try {
      await wx.API.userScoreInit(scoreTypeId, {});
      await this.getUserScoreWxLast();
    } catch (err) {
      await this.getUserScoreWxLast();
      console.error("userScoreInsert接口调用失败:", err);
      // wx.showToast({
      //   title: "操作失败",
      //   icon: "none",
      // });
    }
  },
});
