// components/navbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: 0,
    toolBarHeight: 0

  },

  lifetimes: {
    attached: function() {
      this.setData({
        statusBarHeight: getApp().globalData.statusBarHeight,
        toolBarHeight: getApp().globalData.toolBarHeight
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})