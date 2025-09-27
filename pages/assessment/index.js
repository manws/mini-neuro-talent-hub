Page({
  data: {
    loadMoring: false,
    isTriggered: false,
    scoreTypeId: "",
    scoreTypeName: "",
    state: 0,
    ts01: null,
    ts02: null,
    ts03: null,
    ts04: null,
    ts05: null,
    tsAll: null,
  },
  onShow() {
    this.getUserScoreWxLast();
  },
  handleClick(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/evaluation/index?id=${id}&scoreTypeId=${this.data.scoreTypeId}`,
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
      url: "/pages/report/index?scoreTypeId=" + this.data.scoreTypeId,
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
          tsAll: tsAll ? parseFloat(tsAll).toFixed(1) : '',
        });
        // 当state=0且scoreTypeId>0时弹出确认框
        if (state === 0 && scoreTypeId > 0) {
          wx.showModal({
            title: "提示",
            content: `是否进行"${scoreTypeName}"考核评估？`,
            showCancel: true,
            cancelText: "取消",
            confirmText: "确定",
            success: async (modalRes) => {
              if (modalRes.confirm) {
                // 用户点击确定，调用userScoreInsert接口
                console.log("用户确认完成评估");
                await this.callUserScoreInsert(scoreTypeId);
              } else if (modalRes.cancel) {
                // 用户点击取消
                console.log("用户取消完成评估");
              }
            },
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

  /**
   * 调用userScoreInsert接口
   */
  async callUserScoreInsert(scoreTypeId) {
    const param = {
      // 根据需要添加参数
    };

    try {
      const res = await wx.API.userScoreInsert(scoreTypeId, param);
      console.log("userScoreInsert接口调用成功:", res);
      wx.showToast({
        title: "评估完成",
        icon: "success",
      });
      // 重新获取数据并刷新界面
      await this.getUserScoreWxLast();
    } catch (err) {
      console.error("userScoreInsert接口调用失败:", err);
      wx.showToast({
        title: "操作失败",
        icon: "none",
      });
    }
  },
});
